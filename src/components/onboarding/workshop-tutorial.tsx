"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const TUTORIAL_WORKSHOP_KEY = "discovery-workshop-ai-tutorial-workshop-done";

const ITEMS = [
  "Barra lateral à esquerda: as etapas do discovery (Imersão, Ideação, Plano). Clique em cada framework para ir direto. O ícone de engrenagem permite escolher e ordenar os frameworks.",
  "Timer no topo: inicie, pause ou estenda o tempo. O menu (⋮) define 5, 15 ou 30 minutos ou adiciona mais tempo.",
  "Compartilhar link: envia o link da sala para o time entrar.",
  "Área central: formulário do framework atual. Use o botão \"Como usar este framework\" para ver o tutorial do passo.",
  "Respostas do grupo: cada participante preenche sua visão; o facilitador usa \"Revelar\" para mostrar as respostas na hora da dinâmica.",
  "Rodapé: Anterior / Próximo (só avança quando o framework estiver completo) e Gerar artefatos (User Stories, PRD, prompt para Cursor).",
];

interface WorkshopTutorialProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function WorkshopTutorial({ open: controlledOpen, onOpenChange }: WorkshopTutorialProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const isControlled = controlledOpen !== undefined && onOpenChange;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  useEffect(() => {
    if (typeof window === "undefined" || isControlled) return;
    const done = localStorage.getItem(TUTORIAL_WORKSHOP_KEY);
    if (!done) setInternalOpen(true);
  }, [isControlled]);

  const handleClose = () => {
    if (dontShowAgain) localStorage.setItem(TUTORIAL_WORKSHOP_KEY, "true");
    setOpen(false);
  };
  const handleOpenChange = (o: boolean) => {
    if (o) setOpen(true);
    else handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Primeira vez no workshop?</DialogTitle>
          <DialogDescription className="text-left">
            Resumo do que cada parte da tela faz:
          </DialogDescription>
        </DialogHeader>
        <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground overflow-auto pr-2">
          {ITEMS.map((text, i) => (
            <li key={i} className="leading-snug">
              {text}
            </li>
          ))}
        </ul>
        <DialogFooter className="flex-row items-center justify-between gap-2 sm:justify-between border-t pt-4">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-border"
            />
            Não mostrar de novo
          </label>
          <Button onClick={handleClose}>Entendi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function setWorkshopTutorialSeen() {
  if (typeof window !== "undefined") {
    localStorage.setItem(TUTORIAL_WORKSHOP_KEY, "true");
  }
}
