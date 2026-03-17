import type { WorkshopState } from "@/types/workshop";
import { generatePRD } from "./artifacts";

export function exportWorkshopAsMarkdown(state: WorkshopState): string {
  const prd = generatePRD(state);
  return `# Discovery Workshop - ${state.roomName}
Exportado em ${new Date().toLocaleString("pt-BR")}

---
${prd}
`;
}

export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".md") ? filename : `${filename}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
