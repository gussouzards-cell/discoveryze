import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guia PM & PO | Discovery Workshop AI",
  description:
    "Guia completo de produto: PM/PO, priorização, histórias, Scrum, Kanban, cascata, Linear e Jira — dentro da plataforma.",
};

export default function GuiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
