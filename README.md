# Discovery Workshop AI

Plataforma colaborativa para software houses conduzirem sessões de **discovery** em grupo com tempo controlado (timebox), colaboração simulada e geração automática de artefatos (user stories, PRD, plano técnico, prompt para Cursor).

## Stack

- **Next.js 16** (App Router)
- **React 19**, **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** (Radix UI + Tailwind)
- **Zustand** (estado global + persist no localStorage)
- **Sonner** (toasts)

## Como rodar

```bash
cd discovery-workshop-ai
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Funcionalidades

1. **Home** – Criar sala (nome + link) ou entrar via link.
2. **Workshop** – Layout com:
   - **Header**: nome da sala, participantes (avatars), timer (iniciar/pausar/estender), compartilhar link.
   - **Sidebar**: etapas (Imersão, Ideação, Plano de Ação).
   - **Conteúdo**: formulários por etapa.
3. **Timebox** – Timer regressivo com barra de progresso; menu para definir 5/15/30 min ou estender +5/+10 min; ao zerar, toast de aviso.
4. **Etapas**  
   - **Imersão**: Problema, Público, Dor, Impacto.  
   - **Ideação**: Lean Canvas (9 blocos) + lista de funcionalidades com votação (➕/👍/🗑).  
   - **Plano**: MVP, Roadmap, Métricas, Riscos.
5. **Gerar artefatos** – Botão no rodapé abre dialog com abas:
   - **User Stories** (título, descrição, critérios).
   - **PRD** (texto estruturado, botão copiar).
   - **Plano técnico** (stack sugerida, arquitetura).
   - **Prompt para Cursor** (bloco copiável).
   - Em cada aba: **Refinar com IA** (mock).
6. **Exportar Markdown** – Download do workshop em `.md`.
7. **Persistência** – Estado no `localStorage` (Zustand persist).

## Estrutura

```
src/
├── app/
│   ├── layout.tsx      # Root + Toaster + dark
│   ├── page.tsx        # Home (criar/entrar sala)
│   ├── workshop/
│   │   └── page.tsx    # Página do workshop (Suspense + useSearchParams)
│   └── globals.css     # Tema dark + variáveis shadcn
├── components/
│   ├── ui/             # shadcn: Button, Card, Dialog, Input, Textarea, Tabs, Progress, Badge, Avatar, Dropdown, Label
│   └── workshop/       # Sidebar, Header, Content, StepImersao, StepIdeacao, StepPlano, ArtifactsDialog, WorkshopLayout
├── hooks/
│   ├── use-timer.ts    # Timer regressivo com callback ao fim
│   └── use-local-participant.ts  # Participante local (localStorage)
├── lib/
│   ├── utils.ts        # cn()
│   ├── artifacts.ts    # Geração de user stories, PRD, plano técnico, prompt Cursor
│   └── export-markdown.ts
├── store/
│   └── workshop-store.ts  # Zustand + persist
└── types/
    └── workshop.ts     # Tipos e constantes iniciais
```

## Observações

- **Colaboração em tempo real**: simulada (um participante por navegador; múltiplas abas = múltiplos “participantes”). Para realtime de verdade, integrar Socket.io ou similar.
- **Refinar com IA**: mock (toast após 1,5s). Para produção, conectar a uma API de LLM.
- **Dark mode**: ativado por padrão via `className="dark"` no `<html>`.

## Scripts

| Comando   | Descrição        |
|----------|------------------|
| `npm run dev`   | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
