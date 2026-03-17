"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Lightbulb, Users, Link2, Clock, Layers, FileText, Zap, BookOpen, Target } from "lucide-react";
import { useWorkshopStore } from "@/store/workshop-store";
import { toast } from "sonner";

export default function HomePage() {
  const router = useRouter();
  const setRoom = useWorkshopStore((s) => s.setRoom);
  const applyPreset = useWorkshopStore((s) => s.applyPreset);
  const [joinOpen, setJoinOpen] = useState(false);
  const [roomName, setRoomName] = useState("Workshop Discovery");
  const [joinUrl, setJoinUrl] = useState("");

  const handleCreate = (preset: "rapido" | "profundo") => {
    applyPreset(preset);
    const id = crypto.randomUUID().slice(0, 8);
    setRoom(id, roomName);
    toast.success("Sala criada! Compartilhe o link.");
    router.push(`/workshop?room=${id}`);
  };

  const handleJoin = () => {
    const raw = joinUrl.trim();
    if (!raw) {
      toast.error("Cole o link ou o código da sala.");
      return;
    }
    let room: string;
    if (raw.startsWith("http")) {
      try {
        const url = new URL(raw);
        room = url.searchParams.get("room") ?? url.pathname.split("/").pop() ?? "";
      } catch {
        toast.error("Link inválido.");
        return;
      }
    } else {
      room = raw;
    }
    if (room) {
      setRoom(room, `Sala ${room}`);
      router.push(`/workshop?room=${room}`);
      setJoinOpen(false);
      setJoinUrl("");
    } else {
      toast.error("Não foi possível obter o código da sala do link.");
    }
  };

  return (
    <div className="min-h-screen bg-background min-h-[100dvh] pb-safe">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:gap-12 md:gap-16 px-3 py-8 sm:px-4 sm:py-12 md:py-16">
        {/* HERO */}
        <section className="grid gap-6 sm:gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-10 items-start md:items-center">
          <div className="min-w-0">
            <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Pensado para software houses que fazem discovery sério
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Conduza um dia de discovery como se fosse um produto.
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground md:text-lg">
              Discovery Workshop AI é uma sala digital para rodar dinâmicas de discovery
              em grupo com clientes e squad: timebox, frameworks clássicos, respostas
              individuais e artefatos prontos para desenvolvimento (incluindo prompt
              para o Cursor).
            </p>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
              <Button
                className="w-full sm:w-auto"
                onClick={() =>
                  document.getElementById("criar-sala")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Começar um discovery agora
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setJoinOpen(true)}
              >
                Entrar em uma sala existente
              </Button>
            </div>
            <p className="mt-2 sm:mt-3 text-xs text-muted-foreground">
              Sem cadastro, tudo salvo no navegador. Ideal para POCs e workshops rápidos.
            </p>
          </div>
          <div className="space-y-4 rounded-xl border border-border bg-card/70 p-3 sm:p-4 text-xs text-muted-foreground shadow-sm">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Em um único fluxo
                </p>
                <p className="text-sm font-medium text-foreground">
                  Imersão → Ideação → Plano de Ação
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-foreground">1. Imersão:</span> Imersão no
                problema, JTBD, contexto do cliente.
              </li>
              <li>
                <span className="font-semibold text-foreground">2. Ideação:</span> Lean Canvas,
                Story Mapping, RICE, Kano, funcionalidades com votação.
              </li>
              <li>
                <span className="font-semibold text-foreground">3. Plano:</span> Definition of MVP,
                plano de ação e plano de experimentos/validação.
              </li>
            </ul>
            <p>
              Ao final, gere User Stories, PRD, plano técnico e um prompt pronto para o Cursor com
              tudo o que foi decidido.
            </p>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="space-y-4 sm:space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              Por que usar a plataforma
            </h2>
            <p className="text-sm text-muted-foreground">
              Tudo que você precisa para um discovery profissional, sem improviso.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm">Timebox de verdade</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Timer no topo, pausar, estender e bloquear avanço até completar. O dia não vira reunião infinita.
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm">Frameworks clássicos guiados</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Imersão, JTBD, Lean Canvas, RICE, Kano, Story Mapping e mais, com tutoriais “por que / quando / como” em cada um.
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm">Artefatos prontos para dev</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                User Stories, PRD, plano técnico e prompt para Cursor gerados a partir do que o grupo decidiu. Export em Markdown.
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm">Colaboração que faz sentido</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Cada pessoa responde individualmente, o facilitador revela na hora certa. Ideal para dinâmicas com cliente e squad.
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm">Zero fricção para começar</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Sem cadastro. Crie a sala, compartilhe o link e comece. Dados no navegador; presets rápido e profundo já montam o roteiro.
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-sm">Aprenda fazendo</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Cada framework tem “Como usar”: por que usar, quando usar, como usar e saída esperada. Perfeito para estudar na prática.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CHAMADA PM/PO JUNIORS E FACILITADORES */}
        <section className="rounded-xl sm:rounded-2xl border border-border bg-primary/5 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 min-w-0">
              <div className="flex items-start gap-2">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0 mt-0.5" />
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
                  Para PMs, POs e facilitadores, especialmente quem está começando
                </h2>
              </div>
              <p className="max-w-xl text-sm text-muted-foreground">
                Se você é <strong className="text-foreground">PM ou PO júnior</strong>, está
                facilitando seu primeiro discovery ou quer um roteiro que não dependa só da sua
                memória, a plataforma guia o passo a passo, explica cada framework e gera os
                artefatos no final. Assim você foca em conduzir o grupo, não em montar slide ou
                documento do zero.
              </p>
              <p className="text-sm text-muted-foreground">
                Use em workshops com clientes, sprints de discovery internos ou para treinar
                o time em product discovery. Sem cadastro, crie uma sala e teste agora.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() =>
                  document.getElementById("criar-sala")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Criar minha primeira sala
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => setJoinOpen(true)}>
                Já tenho link, quero entrar
              </Button>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="space-y-4 sm:space-y-6">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              Como funciona na prática
            </h2>
            <p className="text-sm text-muted-foreground">
              Pensado para um dia de discovery com cliente + squad de produto e engenharia.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">1. Configure a sala</CardTitle>
                <CardDescription className="text-xs">
                  Defina o nome do workshop e escolha entre discovery rápido ou profundo.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1.5">
                <p>O sistema monta automaticamente a receita de frameworks por fase.</p>
                <p>Você sempre pode ajustar a ordem e os frameworks na sidebar.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">2. Rode as dinâmicas</CardTitle>
                <CardDescription className="text-xs">
                  Cada pessoa responde individualmente, o PM decide quando revelar.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1.5">
                <p>Funciona como um “mural” digital: ninguém é influenciado antes da hora.</p>
                <p>O timer e o roteiro guiado garantem que o grupo avance de forma fluida.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">3. Gere os artefatos</CardTitle>
                <CardDescription className="text-xs">
                  Clique em “Gerar artefatos” ao final e exporte tudo.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1.5">
                <p>User Stories, PRD e plano técnico já vêm preenchidos com o que foi decidido.</p>
                <p>O prompt para Cursor acelera a transição discovery → delivery.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA CRIAR/ENTRAR - destino do CTA "Começar um discovery agora" */}
        <section id="criar-sala" className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 scroll-mt-20">
          <Card className="border-border bg-card transition-colors hover:bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Criar sala
              </CardTitle>
              <CardDescription>
                Inicie um novo workshop. Defina o nome e compartilhe o link com o time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomName">Nome da sala</Label>
                <Input
                  id="roomName"
                  placeholder="Ex: Produto X - Sprint 1"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Escolha o tipo de dia de discovery:
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button
                    className="w-full text-xs"
                    variant="secondary"
                    onClick={() => handleCreate("rapido")}
                  >
                    Discovery rápido
                  </Button>
                  <Button
                    className="w-full text-xs"
                    onClick={() => handleCreate("profundo")}
                  >
                    Discovery profundo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card transition-colors hover:bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Entrar na sala
              </CardTitle>
              <CardDescription>
                Você recebeu um link? Cole aqui e entre no workshop.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setJoinOpen(true)}
              >
                Entrar com link
              </Button>
            </CardContent>
          </Card>
        </section>

        <p className="mt-6 sm:mt-8 px-2 text-center text-xs sm:text-sm text-muted-foreground">
          Dados salvos no navegador (localStorage). Timer, etapas e artefatos na mesma sessão.
        </p>
      </div>

      <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Entrar na sala</DialogTitle>
            <DialogDescription>
              Cole o link compartilhado (ex: https://.../workshop?room=abc123) ou o código da sala.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="joinUrl">Link ou código</Label>
              <Input
                id="joinUrl"
                placeholder="https://... ou código da sala"
                value={joinUrl}
                onChange={(e) => setJoinUrl(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleJoin}>
              Entrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
