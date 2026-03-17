import type { WorkshopState, UserStory } from "@/types/workshop";
import { getFrameworkDefinition } from "@/lib/frameworks";

function listFrameworksUsed(state: WorkshopState): string {
  const phases: ("imersao" | "ideacao" | "plano")[] = [
    "imersao",
    "ideacao",
    "plano",
  ];
  const lines: string[] = [];
  phases.forEach((phase) => {
    const steps = state.workflowByPhase?.[phase] ?? [];
    if (!steps.length) return;
    const phaseLabel =
      phase === "imersao" ? "Imersão" : phase === "ideacao" ? "Ideação" : "Plano de Ação";
    lines.push(`### ${phaseLabel}`);
    steps.forEach((s) => {
      const def = getFrameworkDefinition(s.frameworkId);
      if (!def) return;
      lines.push(`- ${def.name}`);
    });
    lines.push("");
  });
  if (!lines.length) return "_Nenhum framework configurado explicitamente._";
  return lines.join("\n");
}

export function generateUserStories(state: WorkshopState): UserStory[] {
  const { imersao, ideacao, plano } = state;
  const stories: UserStory[] = [];
  const topFeatures = [...ideacao.funcionalidades]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  topFeatures.forEach((f, i) => {
    stories.push({
      id: `us-${i + 1}`,
      titulo: f.title,
      descricao: `Como usuário, quero ${f.title.toLowerCase()} para ${imersao.impacto || "atingir o objetivo do produto"}.`,
      criterios: [
        `Funcionalidade "${f.title}" implementada e testada`,
        "Aceito pelo product owner",
      ],
    });
  });

  if (stories.length === 0 && imersao.problema) {
    stories.push({
      id: "us-1",
      titulo: "Solução para o problema identificado",
      descricao: `Como ${imersao.publico || "usuário"}, quero uma solução para: ${imersao.problema}.`,
      criterios: ["Problema endereçado", "Validação com usuários"],
    });
  }

  return stories;
}

export function generatePRD(state: WorkshopState): string {
  const { imersao, ideacao, plano } = state;
  const canvas = ideacao.leanCanvas
    .filter((c) => c.content.trim())
    .map((c) => `### ${c.title}\n${c.content}`)
    .join("\n\n");

  return `# Product Requirements Document

## 1. Problema e contexto
- **Problema:** ${imersao.problema || "(a definir)"}
- **Público:** ${imersao.publico || "(a definir)"}
- **Dor:** ${imersao.dor || "(a definir)"}
- **Impacto esperado:** ${imersao.impacto || "(a definir)"}

## 2. Lean Canvas
${canvas || "_Não preenchido._"}

## 3. Funcionalidades priorizadas
${ideacao.funcionalidades
  .sort((a, b) => b.votes - a.votes)
  .map((f) => `- ${f.title} (${f.votes} votos)`)
  .join("\n") || "- (nenhuma)"}

## 4. Frameworks de discovery utilizados
${listFrameworksUsed(state)}

## 5. Plano
### MVP
${plano.mvp || "(a definir)"}

### Roadmap
${plano.roadmap || "(a definir)"}

### Métricas
${plano.metricas || "(a definir)"}

### Riscos
${plano.riscos || "(a definir)"}
`;
}

export function generateTechnicalPlan(state: WorkshopState): string {
  const { imersao, plano } = state;
  return `# Plano Técnico

## Visão geral
Solução para: ${imersao.problema || "product discovery"}.
Público: ${imersao.publico || "a definir"}.

## Stack sugerida
- **Frontend:** React/Next.js, TypeScript, TailwindCSS
- **Backend:** Node.js (API Routes ou servidor dedicado)
- **Banco:** PostgreSQL ou MongoDB conforme necessidade
- **Realtime:** Socket.io ou Supabase Realtime (se colaboração em tempo real)
- **Auth:** NextAuth.js ou Clerk
- **Deploy:** Vercel (front) + serviço de backend (Railway, Render, etc.)

## Arquitetura básica
- App Router (Next.js) com páginas por feature
- Estado global: Zustand
- API routes para persistência e integrações
- Componentes UI: shadcn/ui
- Testes: Vitest + React Testing Library

## Escopo MVP (referência)
${plano.mvp || "Definir no workshop."}

## Riscos técnicos
${plano.riscos || "Avaliar durante o desenvolvimento."}
`;
}

export function generateCursorPrompt(state: WorkshopState): string {
  const prd = generatePRD(state);
  const tech = generateTechnicalPlan(state);
  const stories = generateUserStories(state);
  const storiesText = stories
    .map(
      (s) =>
        `### ${s.titulo}\n${s.descricao}\n**Critérios:**\n${s.criterios.map((c) => `- ${c}`).join("\n")}`
    )
    .join("\n\n");

  return `Contexto do projeto (Discovery Workshop AI):

## Frameworks utilizados no discovery
${listFrameworksUsed(state)}

## PRD resumido
${prd.slice(0, 1500)}${prd.length > 1500 ? "..." : ""}

## User Stories priorizadas
${storiesText}

## Plano técnico
${tech.slice(0, 1000)}${tech.length > 1000 ? "..." : ""}

---
Use este contexto para implementar as features seguindo o discovery. Priorize as user stories na ordem listada.`;
}
