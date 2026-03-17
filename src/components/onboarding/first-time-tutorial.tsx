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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLocalParticipantName, setLocalParticipantName } from "@/hooks/use-local-participant";

const TUTORIAL_HOME_KEY = "discovery-workshop-ai-tutorial-home-done";

const HOME_STEPS = [
  {
    title: "Bem-vindo ao Discovery Workshop AI",
    description:
      "Antes de começar, como você quer ser chamado na sala? Esse nome aparece para o time quando você participa.",
    showNameInput: true,
  },
  {
    title: "Criar uma sala",
    description:
      "Use o card \"Criar sala\": defina o nome do workshop e escolha Discovery rápido (menos frameworks) ou Discovery profundo (roteiro completo). Depois compartilhe o link com o time.",
    showNameInput: false,
  },
  {
    title: "Entrar em uma sala",
    description:
      "Quem recebeu o link usa o card \"Entrar na sala\" e cola o endereço ou o código. Todos entram na mesma sala e seguem o mesmo roteiro.",
    showNameInput: false,
  },
  {
    title: "Pronto para começar",
    description:
      "Na próxima tela você verá a barra lateral com as etapas (Imersão, Ideação, Plano), o timer no topo, o formulário do framework no centro e os botões Anterior/Próximo e Gerar artefatos no rodapé. Pode reabrir este tutorial pelo menu de perfil.",
    showNameInput: false,
  },
];

export function FirstTimeTutorialHome() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem(TUTORIAL_HOME_KEY);
    if (!done) {
      setOpen(true);
      setName(getLocalParticipantName());
    }
  }, []);

  const handleNext = () => {
    if (HOME_STEPS[step].showNameInput && name.trim()) {
      setLocalParticipantName(name.trim());
    }
    if (step < HOME_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      if (dontShowAgain) localStorage.setItem(TUTORIAL_HOME_KEY, "true");
      setOpen(false);
    }
  };

  const handleClose = () => {
    if (HOME_STEPS[step].showNameInput && name.trim()) {
      setLocalParticipantName(name.trim());
    }
    if (dontShowAgain) localStorage.setItem(TUTORIAL_HOME_KEY, "true");
    setOpen(false);
  };

  const current = HOME_STEPS[step];
  const isLast = step === HOME_STEPS.length - 1;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{current.title}</DialogTitle>
          <DialogDescription className="text-left">
            {current.description}
          </DialogDescription>
        </DialogHeader>
        {current.showNameInput && (
          <div className="space-y-2 py-2">
            <Label htmlFor="tutorial-name">Seu nome</Label>
            <Input
              id="tutorial-name"
              placeholder="Ex: Maria, João, Time Produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <DialogFooter className="flex-row items-center justify-between gap-2 sm:justify-between">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-border"
            />
            Não mostrar de novo
          </label>
          <Button onClick={handleNext}>
            {isLast ? "Entendi" : "Próximo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
