import type { SpotlightStep } from "./spotlight-tour";

export const WORKSHOP_TOUR_STEPS: SpotlightStep[] = [
  {
    target: "[data-tour=back]",
    title: "Voltar",
    content: "Clique aqui para voltar à página inicial e criar ou entrar em outra sala.",
  },
  {
    target: "[data-tour=room-name]",
    title: "Nome da sala",
    content: "É o nome do seu workshop. Aparece no topo para todos os participantes.",
  },
  {
    target: "[data-tour=share]",
    title: "Compartilhar link",
    content: "Copie o link da sala e envie para o time. Quem abrir entra na mesma sala e segue o roteiro junto.",
  },
  {
    target: "[data-tour=participants]",
    title: "Participantes",
    content: "Aqui aparecem os avatares de quem está na sala. Cada um usa o nome que definiu no primeiro acesso.",
  },
  {
    target: "[data-tour=meu-perfil]",
    title: "Meu perfil",
    content: "Altere seu nome e reveja o tutorial quando quiser.",
  },
  {
    target: "[data-tour=timer]",
    title: "Timer (timebox)",
    content: "Use play/pause para controlar o tempo. No menu (⋮) você define 5, 15 ou 30 minutos ou adiciona mais tempo.",
  },
  {
    target: "[data-tour=sidebar]",
    title: "Roteiro do discovery",
    content: "As etapas Imersão, Ideação e Plano. Clique em um framework para ir direto. O ícone de engrenagem permite escolher e ordenar os frameworks.",
  },
  {
    target: "[data-tour=content]",
    title: "Formulário do framework",
    content: "Aqui você preenche o framework atual. Use \"Como usar este framework\" para ver o passo a passo.",
  },
  {
    target: "[data-tour=group-answers]",
    title: "Respostas do grupo",
    content: "Cada participante preenche sua visão; o facilitador usa \"Revelar\" para mostrar as respostas na dinâmica.",
  },
  {
    target: "[data-tour=footer]",
    title: "Rodapé",
    content: "Anterior / Próximo navegam entre os passos (só avança quando o framework estiver completo). \"Gerar artefatos\" gera User Stories, PRD e prompt para o Cursor.",
  },
];

export const TUTORIAL_WORKSHOP_KEY = "discovery-workshop-ai-tutorial-workshop-done";
