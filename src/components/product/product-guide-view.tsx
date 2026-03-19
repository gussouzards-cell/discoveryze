"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  ListOrdered,
  FileText,
  CalendarRange,
  LayoutGrid,
  Layers,
  CalendarClock,
  SquareKanban,
  GitBranch,
  ArrowLeft,
  GraduationCap,
  ExternalLink,
  Rocket,
  User,
  Palette,
  Code2,
} from "lucide-react";
import { GuideCallout, GuideSection, GuideTable } from "@/components/product/guide-section";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "refs", label: "Referências", icon: BookOpen, accent: "violet" as const },
  { id: "pm-po", label: "PM vs PO", icon: Users, accent: "blue" as const },
  { id: "prior", label: "Priorização", icon: ListOrdered, accent: "emerald" as const },
  { id: "stories", label: "Histórias", icon: FileText, accent: "amber" as const },
  { id: "quarter", label: "Quarters", icon: CalendarRange, accent: "rose" as const },
  { id: "tools", label: "Linear & Jira", icon: LayoutGrid, accent: "cyan" as const },
  { id: "gloss", label: "Épico × Task", icon: Layers, accent: "orange" as const },
  { id: "rotina", label: "Rotina", icon: CalendarClock, accent: "slate" as const },
  { id: "scrum-kanban", label: "Scrum & Kanban", icon: SquareKanban, accent: "violet" as const },
  { id: "cascata", label: "Cascata", icon: GitBranch, accent: "blue" as const },
  { id: "exemplo", label: "Exemplo discovery", icon: Rocket, accent: "emerald" as const },
];

export function ProductGuideView() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room");
  const [active, setActive] = useState(NAV[0].id);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.2) {
            const id = e.target.id;
            if (NAV.some((n) => n.id === id)) setActive(id);
          }
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const workshopHref = room ? `/workshop?room=${encodeURIComponent(room)}` : "/workshop";

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-muted/40 via-background to-background">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Discovery Workshop AI
              </p>
              <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
                Guia de Produto — PM &amp; PO
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {room && (
              <Button asChild variant="default" size="sm" className="gap-1.5">
                <Link href={workshopHref}>
                  <ArrowLeft className="h-4 w-4" />
                  Voltar à sala
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href="/">Página inicial</Link>
            </Button>
            {!room && (
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link href="/workshop">
                  Workshop
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <div className="mb-8 -mx-4 overflow-x-auto px-4 pb-2 lg:hidden">
          <div className="flex w-max gap-2">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    isActive
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <aside className="hidden w-52 shrink-0 lg:block xl:w-56">
            <nav className="sticky top-24 space-y-1 pr-2">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Índice
              </p>
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                      isActive
                        ? "bg-primary/12 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-80" />
                    <span className="leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 space-y-10 lg:space-y-14">
          <GuideCallout variant="tip">
            <strong>Dica:</strong> use o índice ao lado (ou as abas no celular) para pular entre capítulos. Tudo
            fica nesta página — sem sair da plataforma.
          </GuideCallout>

          <GuideSection
            id="refs"
            icon={BookOpen}
            title="Referências e autores"
            description="Mapa de quem ler para aprofundar em produto, discovery e crescimento."
            accent="violet"
          >
            <p>
              Mapa de autores — aprofunde nos livros e artigos originais.
            </p>
            <h3>Marty Cagan</h3>
            <p>
              <em>Inspired</em> e <em>Empowered</em>: PM descobre produto <strong>valioso, viável e utilizável</strong>;
              times empoderados; <strong>discovery</strong> (risco, aprendizado) vs <strong>delivery</strong> (execução).
            </p>
            <h3>Teresa Torres</h3>
            <p>
              <em>Continuous Discovery Habits</em>: entrevistas semanais, <strong>Opportunity Solution Tree</strong>,
              experimentos pequenos.
            </p>
            <h3>Melissa Perri</h3>
            <p>
              <em>Escaping the Build Trap</em>: estratégia de produto, evitar medir só por output.
            </p>
            <h3>Jeff Patton</h3>
            <p>
              <em>User Story Mapping</em>: narrativa no tempo; MVP como menor fatia que resolve um problema inteiro.
            </p>
            <h3>Gibson Biddle</h3>
            <p>
              <strong>DHM</strong> (Delight, Hard to copy, Margin) e <strong>GLEe</strong> (Get big, Lead, Expand).
            </p>
            <h3>Josh Seiden</h3>
            <p>
              <em>Outcomes Over Outputs</em>: mudança de comportamento; OKRs ligados a resultado.
            </p>
            <h3>Andrew Chen</h3>
            <p>
              Crescimento, retenção, <strong>loops</strong> (viral, conteúdo, UGC, pagamento), North Star.
            </p>
            <h3>Outros</h3>
            <ul>
              <li><strong>Roman Pichler</strong> — estratégia e backlog orientado a valor.</li>
              <li><strong>John Cutler</strong> — sistemas de trabalho e WIP.</li>
              <li><strong>Shreyas Doshi</strong> — LNO, pre-mortem.</li>
              <li><strong>Lenny Rachitsky / Reforge</strong> — growth e cases.</li>
            </ul>
          </GuideSection>

          <GuideSection
            id="pm-po"
            icon={Users}
            title="PM vs Product Owner"
            description="Papéis, sobreposição e como atuam juntos."
            accent="blue"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h3 className="!mt-0 text-foreground">Product Manager</h3>
                <ul className="!mt-2">
                  <li>Problema, mercado, visão, discovery e estratégia.</li>
                  <li>Roadmap por outcomes; stakeholders executivos.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h3 className="!mt-0 text-foreground">Product Owner</h3>
                <ul className="!mt-2">
                  <li>Backlog ordenado, refinamento, critérios de aceite.</li>
                  <li>Clareza para o time no sprint.</li>
                </ul>
              </div>
            </div>
            <p>
              Em squads pequenos, PM e PO podem ser a mesma pessoa. PO não deve ser só “tradutor de pedido”.
            </p>
          </GuideSection>

          <GuideSection
            id="prior"
            icon={ListOrdered}
            title="Priorização"
            description="Frameworks e princípios para ordenar o que fazer."
            accent="emerald"
          >
            <ul>
              <li>Fila visível; urgente ≠ importante; revisar com novos aprendizados.</li>
            </ul>
            <GuideTable
              headers={["Método", "Ideia"]}
              rows={[
                ["RICE", "Reach × Impact × Confidence ÷ Effort"],
                ["WSJF", "Cost of Delay ÷ tamanho"],
                ["Kano", "Básico / Performance / Encantamento"],
                ["MoSCoW", "Must, Should, Could, Won't"],
                ["Now / Next / Later", "Roadmap sem datas falsas"],
              ]}
            />
            <GuideCallout variant="tip">
              Comece pelo <strong>outcome do quarter</strong>, limite WIP e considere o custo de <em>não</em> fazer.
            </GuideCallout>
          </GuideSection>

          <GuideSection
            id="stories"
            icon={FileText}
            title="Histórias de usuário"
            description="Formato, INVEST, aceite e BDD."
            accent="amber"
          >
            <p>
              <code>Como [persona], quero [ação], para [benefício].</code>
            </p>
            <h3>INVEST</h3>
            <p>Independente, Negociável, Valiosa, Estimável, Small, Testável.</p>
            <h3>Critérios de aceite</h3>
            <p>Dado / Quando / Então. Evite prescrever solução técnica na história.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <GuideCallout variant="warn">
                <strong>Ruim:</strong> “Botão azul no canto.”
              </GuideCallout>
              <GuideCallout variant="tip">
                <strong>Melhor:</strong> “Como visitante logado, quero salvar rascunho automaticamente…”
              </GuideCallout>
            </div>
          </GuideSection>

          <GuideSection
            id="quarter"
            icon={CalendarRange}
            title="Quarters e cadência"
            description="Trimestre, OKRs e sprints alinhados."
            accent="rose"
          >
            <ol>
              <li>Pré-Q: retrospectiva, dados, temas / OKRs.</li>
              <li>Início: kickoff com outcomes e poucas iniciativas.</li>
              <li>Meio: health check — cortar ou dobrar aposta.</li>
              <li>Fim: demo de resultado, planejar próximo Q.</li>
            </ol>
            <p>
              OKRs = poucos objetivos e KRs mensuráveis (não lista de feature). Cada sprint deve puxar 1–2 KRs ou
              temas.
            </p>
          </GuideSection>

          <GuideSection
            id="tools"
            icon={LayoutGrid}
            title="Linear e Jira"
            description="Como organizar issues no dia a dia."
            accent="cyan"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border p-4">
                <h3 className="!mt-0">Linear</h3>
                <ul>
                  <li>Team por squad; Project = iniciativa (ex. Checkout Q1).</li>
                  <li>Cycles = sprint; labels bug / tech-debt / discovery.</li>
                  <li>Triage → priorizado → cycle → Done.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border p-4">
                <h3 className="!mt-0">Jira</h3>
                <ul>
                  <li>Epic → Stories → Sub-tasks.</li>
                  <li>Board + sprint; JQL por epic / label.</li>
                </ul>
              </div>
            </div>
            <p>
              <strong>Jira:</strong> Epic “Assinatura recorrente” → stories (salvar cartão, cancelar renovação) →
              subtasks (POST /billing, E2E, copy legal). Workflow: backlog refinado → sprint com WIP nas colunas →
              review → retro; bugs críticos com hotfix explícito.
            </p>
            <p>
              <strong>Linear:</strong> Project “Onboarding Q1”, issues ORD-120…, cycle 2 semanas ~30 pts, label{" "}
              <code>discovery</code>, estado Triage para ideias não priorizadas.
            </p>
            <p>Azure DevOps, Shortcut, Height — mesma hierarquia; alinhe vocabulário no time.</p>
          </GuideSection>

          <GuideSection
            id="gloss"
            icon={Layers}
            title="Épico, história, módulo, task"
            description="Hierarquia e diferenças."
            accent="orange"
          >
            <GuideTable
              headers={["Nível", "O que é"]}
              rows={[
                ["Épico", "Grande iniciativa de valor (ex.: Pix). Semanas a um Q."],
                ["História", "Valor para usuário em ~1 sprint. Persona + need + outcome."],
                ["Módulo / Feature", "Área do produto; pode cruzar vários épicos."],
                ["Task", "Trabalho técnico que implementa uma história."],
                ["Spike", "Time-box para aprender; saída = decisão ou conhecimento."],
              ]}
            />
            <GuideCallout variant="flow">
              <strong>Fluxo:</strong> Épico → várias histórias → cada história → várias tasks.
            </GuideCallout>
          </GuideSection>

          <GuideSection
            id="rotina"
            icon={CalendarClock}
            title="Rotina PM/PO"
            description="Semana tipo, PI, stakeholders, DoR e DoD."
            accent="slate"
          >
            <ul>
              <li>Seg: prioridades e desbloqueios.</li>
              <li>Meio: entrevistas / usabilidade.</li>
              <li>Refinamento: histórias prontas para o próximo sprint.</li>
              <li>Sex: métricas e aprendizados.</li>
            </ul>
            <h3>PI Planning (SAFe)</h3>
            <p>
              Início de quarter: times alinham épicos, dependências e capacidade realista — evitar comprometer além da
              capacidade.
            </p>
            <h3>Stakeholders</h3>
            <ul>
              <li>Narrativa: problema → aprendizado → próximo passo (não só lista de feature).</li>
              <li>Roadmap por temas; datas só com compromisso real.</li>
              <li>Decision log / ADR leve para não reabrir a mesma discussão.</li>
            </ul>
            <h3>DoR / DoD (exemplo)</h3>
            <p>
              <strong>Ready:</strong> aceite, design se preciso, sem bloqueio ignorado. <strong>Done:</strong> revisado,
              testes OK, prod/flag, analytics se combinado.
            </p>
          </GuideSection>

          <GuideSection
            id="scrum-kanban"
            icon={SquareKanban}
            title="Scrum e Kanban"
            description="Quando usar cada um e ritos por duração de sprint."
            accent="violet"
          >
            <h3>Scrum</h3>
            <p>
              Time-box, incremento utilizável por sprint, papéis <strong>PO</strong>, <strong>Scrum Master</strong> e{" "}
              <strong>time de desenvolvimento</strong>. Bom quando o backlog evolui mas você quer ritmo e compromisso
              por janela e stakeholders revisam ao fim do sprint.
            </p>
            <GuideCallout variant="warn">
              Evite Scrum “puro” se o fluxo for 100% reativo (fila de tickets) — considere Kanban ou Scrumban. Se todo
              sprint estoura por urgência não negociada, falta proteção de escopo ou capacidade realista.
            </GuideCallout>
            <h3>Ritos — sprint 1 semana</h3>
            <GuideTable
              headers={["Rito", "Duração"]}
              rows={[
                ["Sprint Planning", "~1h – 1h30"],
                ["Daily Scrum", "15 min (4 dias)"],
                ["Refinamento", "30–45 min"],
                ["Sprint Review", "45 min – 1h"],
                ["Retrospectiva", "45 min – 1h"],
              ]}
            />
            <p className="text-xs text-muted-foreground">
              Calendário exemplo: seg — planning + daily à tarde; ter–qui — daily; sex — review + retro. Refinamento:
              sexta anterior (45 min) ou terça (30 min).
            </p>
            <h3>Ritos — sprint 2 semanas</h3>
            <GuideTable
              headers={["Rito", "Duração"]}
              rows={[
                ["Sprint Planning", "2h – 4h"],
                ["Daily Scrum", "15 min × 10 dias"],
                ["Refinamento", "2×1h ou 1×2h"],
                ["Sprint Review", "1h – 2h"],
                ["Retrospectiva", "1h – 1h30"],
              ]}
            />
            <p className="text-xs text-muted-foreground">
              Ex.: seg S1 planning; daily todos os dias; qui S1 + ter S2 refinamento 1 h; sex S2 review 1h30 + retro 1 h.
            </p>
            <h3>Kanban</h3>
            <p>
              Visualizar fluxo, <strong>limitar WIP</strong> (ex.: máx. 3 em “Em desenvolvimento”), puxar próximo item
              quando há capacidade — sem sprint obrigatório. Foco em <strong>lead time</strong> e throughput.
            </p>
            <ul>
              <li>Ideal: suporte, SRE, bugs, demanda variável, deploy contínuo.</li>
              <li>Colunas: Backlog → Pronto → Doing → Review → Done/Produção.</li>
              <li><strong>Replenishment</strong> semanal (ou quando “Ready” esvaziar); daily opcional.</li>
              <li>Métricas: tempo médio até Done, cumulative flow.</li>
            </ul>
            <GuideCallout variant="tip">
              <strong>Scrum</strong> = sprint fixo. <strong>Kanban</strong> = fluxo. <strong>Scrumban</strong> mistura os dois.
            </GuideCallout>
          </GuideSection>

          <GuideSection
            id="cascata"
            icon={GitBranch}
            title="Modelo em cascata"
            description="Fases sequenciais e quando ainda faz sentido."
            accent="blue"
          >
            <p>
              Cada fase termina antes da próxima; requisitos costumam ser “congelados” cedo e entrega grande no fim.
            </p>
            <ol>
              <li><strong>Requisitos</strong> — documento aprovado pelo cliente/comitê.</li>
              <li><strong>Design</strong> — arquitetura, interfaces, dados.</li>
              <li><strong>Implementação</strong> — código conforme especificação.</li>
              <li><strong>Testes</strong> — sistema, aceite, critérios de saída.</li>
              <li><strong>Implantação</strong> — go-live, suporte, manutenção contratual.</li>
            </ol>
            <h3>Quando usar</h3>
            <ul>
              <li>Requisitos estáveis (legado, regulatório, escopo fechado).</li>
              <li>Entrega única com penalidade por mudança de escopo.</li>
              <li>Mudança tardia muito cara (hardware, certificação).</li>
            </ul>
            <h3>Riscos</h3>
            <p>
              Produto digital incerto: erro só aparece no fim; retrabalho massivo. Mitigue com <strong>gates</strong>,{" "}
              <strong>gestão de mudança</strong> documentada, <strong>POC</strong> na análise e rastreabilidade
              requisito→teste. Muitas empresas combinam cascata no contrato com Scrum/Kanban no desenvolvimento.
            </p>
          </GuideSection>

          <GuideSection
            id="exemplo"
            icon={Rocket}
            title="Exemplo de discovery preenchido"
            description="App fictício AgendaFácil: equipe real, sprints, design à frente do dev, histórias e divisão por dev."
            accent="emerald"
          >
            <h3>Contexto do produto</h3>
            <p>
              <strong>AgendaFácil</strong> — app de agendamento para pequenos negócios (barbearia, consultório, salão).
              Dono cadastra empresa e horários; cliente vê disponibilidade e agenda sem ligar. MVP em um quarter com
              time enxuto.
            </p>

            <h3>Equipe (como em uma empresa real)</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
                <User className="h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">1 PO / PM</p>
                  <p className="text-xs text-muted-foreground">Backlog, priorização, stakeholders</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
                <Palette className="h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">1 Design</p>
                  <p className="text-xs text-muted-foreground">Telas, fluxos, 1 sprint à frente</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
                <Code2 className="h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">3 Devs</p>
                  <p className="text-xs text-muted-foreground">Front, back, full ou feature-based</p>
                </div>
              </div>
            </div>

            <h3>Cadência: design 1 sprint à frente do dev</h3>
            <p>
              O design entrega especificação e telas para o <strong>próximo</strong> sprint de desenvolvimento. Assim
              o time de dev nunca fica sem “próximo passo” desenhado e há tempo para validação com PO antes de codar.
            </p>
            <GuideTable
              headers={["Sprint (2 sem)", "Foco Design", "Foco Dev", "Entrega dev"]}
              rows={[
                ["S0 (sem 1-2)", "Discovery + telas cadastro/login e onboarding", "Setup projeto, CI, ambiente", "-"],
                ["S1 (sem 3-4)", "Fluxo agendamento + calendário (cliente e dono)", "Cadastro, login, perfil (do S0)", "Donos e clientes entram"],
                ["S2 (sem 5-6)", "Config serviços + agenda do dia + confirmação", "Agendamento e calendário (do S1)", "Cliente agenda; dono vê agenda"],
                ["S3 (sem 7-8)", "Lembretes, notificações, painel semana", "Serviços, agenda do dia, confirmar/cancelar (do S2)", "Fluxo completo MVP"],
                ["S4 (sem 9-10)", "Ajustes, onboarding e polish", "Lembretes, painel semana, testes", "MVP fechado + polish"],
              ]}
            />
            <GuideCallout variant="tip">
              Em cada sprint, o PO prioriza com base no discovery; o design desenha o que será construído no sprint
              <strong> seguinte</strong>; os 3 devs pegam as histórias já desenhadas do sprint atual.
            </GuideCallout>

            <h3>Histórias de usuário (backlog MVP)</h3>
            <ol className="space-y-4 [&_li]:pl-2">
              <li>
                <strong>Como</strong> dono do negócio, <strong>quero</strong> cadastrar minha empresa e horários de
                funcionamento <strong>para que</strong> clientes possam me encontrar e ver quando estou disponível.
                <span className="mt-1 block text-xs text-muted-foreground">
                  Aceite: cadastro com nome, endereço, foto; definição de dias/horários; primeira tela após login.
                </span>
              </li>
              <li>
                <strong>Como</strong> dono, <strong>quero</strong> definir serviços (nome, duração, preço){" "}
                <strong>para que</strong> o sistema calcule os slots disponíveis corretamente.
                <span className="mt-1 block text-xs text-muted-foreground">
                  Aceite: CRUD serviços; duração em blocos de 15 min; exibição na escolha do cliente.
                </span>
              </li>
              <li>
                <strong>Como</strong> cliente, <strong>quero</strong> ver horários disponíveis e agendar{" "}
                <strong>para que</strong> eu não precise ligar ou mandar mensagem.
                <span className="mt-1 block text-xs text-muted-foreground">
                  Aceite: lista de slots por dia; seleção de serviço; confirmação com nome e contato.
                </span>
              </li>
              <li>
                <strong>Como</strong> dono, <strong>quero</strong> ver a agenda do dia e confirmar ou cancelar
                agendamentos <strong>para que</strong> eu gerencie minha rotina.
                <span className="mt-1 block text-xs text-muted-foreground">
                  Aceite: visão dia; ações confirmar/cancelar; atualização em tempo real se outro dispositivo alterar.
                </span>
              </li>
              <li>
                <strong>Como</strong> cliente, <strong>quero</strong> receber um lembrete antes do horário{" "}
                <strong>para que</strong> eu não esqueça do compromisso.
                <span className="mt-1 block text-xs text-muted-foreground">
                  Aceite: notificação (push ou e-mail) configurável (ex.: 24h e 1h antes).
                </span>
              </li>
              <li>
                <strong>Como</strong> dono, <strong>quero</strong> um painel simples com os agendamentos da semana{" "}
                <strong>para que</strong> eu planeje recursos e equipe.
                <span className="mt-1 block text-xs text-muted-foreground">
                  Aceite: visão 7 dias; filtro por serviço; export ou impressão opcional.
                </span>
              </li>
            </ol>

            <h3>Divisão de tarefas por pessoa</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Exemplo real de quem faz o quê em cada sprint. Design sempre trabalha no conteúdo do próximo sprint de dev.
            </p>
            <p className="mt-5 text-sm font-semibold text-foreground">Sprint 1 (Dev: cadastro e login)</p>
            <GuideTable
              headers={["Quem", "Tarefas no sprint"]}
              rows={[
                ["PO", "Refinar histórias 1 e 2; validar fluxo de onboarding com design; preparar S2."],
                ["Design", "Desenhar S2: fluxo de agendamento, calendário cliente/dono (Figma)."],
                ["Dev 1", "Auth (login/cadastro); API perfil e empresa; modelo de dados inicial."],
                ["Dev 2", "Telas: login, cadastro dono, onboarding (nome, horários, endereço)."],
                ["Dev 3", "Validações e testes; configuração de ambiente e E2E do fluxo de cadastro."],
              ]}
            />
            <p className="mt-5 text-sm font-semibold text-foreground">Sprint 2 (Dev: agendamento e calendário)</p>
            <GuideTable
              headers={["Quem", "Tarefas no sprint"]}
              rows={[
                ["PO", "Refinamento com design; aceite das telas; preparar S3."],
                ["Design", "S3: configuração de serviços, agenda do dia, confirmar/cancelar."],
                ["Dev 1", "API slots (disponibilidade); criar/cancelar agendamento; regras de negócio."],
                ["Dev 2", "Telas cliente: escolher serviço, ver slots, confirmar agendamento."],
                ["Dev 3", "Telas dono: agenda do dia, confirmar/cancelar; testes E2E do fluxo."],
              ]}
            />
            <p className="text-xs text-muted-foreground mt-2">
              A divisão pode rodar entre os devs (ex.: Dev 2 no backend no S3) para equilibrar conhecimento.
            </p>

            <h3>Resumo: como seria na empresa</h3>
            <ul>
              <li><strong>Segunda S0:</strong> Kickoff discovery; PO + Design + 1 dev na imersão; definição de escopo MVP.</li>
              <li><strong>S0:</strong> Design entrega fluxo cadastro/login; devs montam repo, pipeline, ambiente e já começam a olhar o Figma.</li>
              <li><strong>S1 em diante:</strong> Planning na segunda com histórias “Ready” (design do sprint anterior); daily 15 min; review na sexta com demo; retro; design já em trabalho do próximo sprint.</li>
              <li><strong>Entrega:</strong> Ao fim do S4, MVP em produção: dono cadastra, define serviços, vê agenda; cliente agenda e recebe lembrete. Próximo passo: pagamento ou múltiplos profissionais.</li>
            </ul>
          </GuideSection>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Button asChild>
              <Link href={room ? workshopHref : "/"}>{room ? "Voltar à sala" : "Página inicial"}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/workshop">Abrir workshop</Link>
            </Button>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
}
