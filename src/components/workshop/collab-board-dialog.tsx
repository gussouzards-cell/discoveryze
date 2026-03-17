"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useWorkshopStore } from "@/store/workshop-store";
import { useLocalParticipant } from "@/hooks/use-local-participant";
import type { BoardColumnId } from "@/types/workshop";
import { ThumbsUp, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CollabBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COLUMNS: { id: BoardColumnId; title: string; description: string }[] = [
  {
    id: "ideias",
    title: "Ideias / insights",
    description: "Anote problemas, oportunidades, frases do cliente, hipóteses.",
  },
  {
    id: "priorizadas",
    title: "Priorizadas",
    description: "O que faz mais sentido atacar primeiro.",
  },
  {
    id: "proximas",
    title: "Próximas decisões",
    description: "Pontos que precisam de definição ou validação.",
  },
];

export function CollabBoardDialog({ open, onOpenChange }: CollabBoardDialogProps) {
  const local = useLocalParticipant();
  const boardCards = useWorkshopStore((s) => s.boardCards);
  const addBoardCard = useWorkshopStore((s) => s.addBoardCard);
  const moveBoardCard = useWorkshopStore((s) => s.moveBoardCard);
  const voteBoardCard = useWorkshopStore((s) => s.voteBoardCard);
  const deleteBoardCard = useWorkshopStore((s) => s.deleteBoardCard);

  const [draft, setDraft] = useState("");

  const handleAdd = (columnId: BoardColumnId) => {
    const text = draft.trim();
    if (!text) return;
    addBoardCard(columnId, text, local.id);
    setDraft("");
  };

  const columnCards = (id: BoardColumnId) =>
    boardCards
      .filter((c) => c.columnId === id)
      .sort((a, b) => a.createdAt - b.createdAt);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full h-[80dvh] sm:h-[85vh] max-h-[90vh] flex flex-col gap-3 sm:gap-4 p-3 sm:p-6">
        <DialogHeader className="space-y-1 shrink-0">
          <DialogTitle className="text-base sm:text-lg">Quadro colaborativo da sala</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Use este quadro como um mural rápido durante o discovery. Cada pessoa pode adicionar
            cartões, votar e reorganizar ideias entre as colunas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 shrink-0">
          <Textarea
            rows={2}
            placeholder="Escreva uma ideia, insight, frase do cliente ou hipótese..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="text-xs sm:text-sm min-h-0"
          />
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-end">
            <Button
              size="sm"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => handleAdd("ideias")}
              disabled={!draft.trim()}
            >
              Enviar para Ideias
            </Button>
            <Button
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => handleAdd("priorizadas")}
              disabled={!draft.trim()}
            >
              Enviar já como Priorizada
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3 flex-1 min-h-0 overflow-hidden">
          {COLUMNS.map((col) => (
            <Card
              key={col.id}
              className={cn(
                "flex flex-col min-h-0",
                col.id === "priorizadas" && "border-primary/60"
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm flex items-center justify-between gap-2">
                  <span>{col.title}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {columnCards(col.id).length} itens
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-0 space-y-2 overflow-auto pb-2">
                <p className="text-[11px] text-muted-foreground mb-1">
                  {col.description}
                </p>
                {columnCards(col.id).length === 0 && (
                  <p className="text-[11px] text-muted-foreground italic">
                    Nenhum cartão ainda.
                  </p>
                )}
                {columnCards(col.id).map((card) => (
                  <div
                    key={card.id}
                    className="rounded-md border border-border bg-card/80 px-2 sm:px-3 py-2 text-xs space-y-2"
                  >
                    <p className="whitespace-pre-wrap break-words">{card.text}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 shrink-0"
                          onClick={() => voteBoardCard(card.id, 1)}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <span className="text-[11px] text-muted-foreground">
                          {card.votes} voto{card.votes === 1 ? "" : "s"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1">
                        {col.id !== "priorizadas" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-[10px] shrink-0"
                            onClick={() => moveBoardCard(card.id, "priorizadas")}
                          >
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Priorizar
                          </Button>
                        )}
                        {col.id !== "proximas" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-[10px] shrink-0"
                            onClick={() => moveBoardCard(card.id, "proximas")}
                          >
                            Próximas
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-destructive shrink-0"
                          onClick={() => deleteBoardCard(card.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

