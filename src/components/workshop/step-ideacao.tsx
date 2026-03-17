"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ThumbsUp, Plus, Trash2 } from "lucide-react";
import { useWorkshopStore } from "@/store/workshop-store";
import { toast } from "sonner";
import type { FrameworkId } from "@/types/workshop";

export function StepIdeacao({ frameworkId }: { frameworkId: FrameworkId }) {
  const ideacao = useWorkshopStore((s) => s.ideacao);
  const setIdeacao = useWorkshopStore((s) => s.setIdeacao);
  const addFuncionalidade = useWorkshopStore((s) => s.addFuncionalidade);
  const voteFuncionalidade = useWorkshopStore((s) => s.voteFuncionalidade);
  const updateLeanCanvas = useWorkshopStore((s) => s.updateLeanCanvas);
  const [newFeature, setNewFeature] = useState("");

  const handleAddFeature = () => {
    const t = newFeature.trim();
    if (!t) {
      toast.error("Digite o nome da funcionalidade");
      return;
    }
    addFuncionalidade(t);
    setNewFeature("");
    toast.success("Funcionalidade adicionada");
  };

  if (frameworkId === "story-mapping") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Ideação</h2>
          <p className="text-muted-foreground">
            User Story Mapping: desenhe a jornada em atividades e passos.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Story Mapping (simplificado)</CardTitle>
            <CardDescription>
              Uma versão rápida para workshops: 1) Atividades macro 2) Passos
              detalhados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storyAtividades">
                Atividades macro (linha de cima)
              </Label>
              <Textarea
                id="storyAtividades"
                placeholder="Ex: Descobrir → Comparar → Comprar → Usar → Renovar"
                value={ideacao.storyMapAtividades}
                onChange={(e) => setIdeacao({ storyMapAtividades: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storyPassos">
                Passos / histórias (linha de baixo)
              </Label>
              <Textarea
                id="storyPassos"
                placeholder="Liste passos por atividade. Ex:\nDescobrir: buscar, filtrar\nComparar: ver detalhes, favoritar\n..."
                value={ideacao.storyMapPassos}
                onChange={(e) => setIdeacao({ storyMapPassos: e.target.value })}
                rows={6}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (frameworkId === "funcionalidades-votacao") {
    // mantém a parte de funcionalidades (sem o canvas)
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Ideação</h2>
          <p className="text-muted-foreground">
            Liste e priorize funcionalidades com votação rápida do time.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades</CardTitle>
            <CardDescription>Liste e vote nas prioridades.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nova funcionalidade..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
              />
              <Button type="button" onClick={handleAddFeature} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <ul className="space-y-2">
              {ideacao.funcionalidades.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2"
                >
                  <span className="text-sm font-medium">{f.title}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => voteFuncionalidade(f.id, 1)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="min-w-[1.5rem] text-center text-sm text-muted-foreground">
                      {f.votes}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFuncionalidade(f.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (frameworkId === "rice") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Ideação</h2>
          <p className="text-muted-foreground">
            RICE: priorização quantitativa usando Reach, Impact, Confidence e Effort.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>RICE</CardTitle>
            <CardDescription>
              Preencha de forma simples (pode ser escala 1–5 ou números absolutos).
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="riceReach">Reach (alcance)</Label>
              <Input
                id="riceReach"
                placeholder="Ex: 100 clientes por trimestre"
                value={ideacao.riceReach}
                onChange={(e) => setIdeacao({ riceReach: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="riceImpact">Impact (impacto)</Label>
              <Input
                id="riceImpact"
                placeholder="Ex: 3 (impacto médio-alto)"
                value={ideacao.riceImpact}
                onChange={(e) => setIdeacao({ riceImpact: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="riceConfidence">Confidence (confiança)</Label>
              <Input
                id="riceConfidence"
                placeholder="Ex: 80%"
                value={ideacao.riceConfidence}
                onChange={(e) => setIdeacao({ riceConfidence: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="riceEffort">Effort (esforço)</Label>
              <Input
                id="riceEffort"
                placeholder="Ex: 2 sprints"
                value={ideacao.riceEffort}
                onChange={(e) => setIdeacao({ riceEffort: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const removeFuncionalidade = (id: string) => {
    setIdeacao((prev) => ({
      ...prev,
      funcionalidades: prev.funcionalidades.filter((f) => f.id !== id),
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Ideação</h2>
        <p className="text-muted-foreground">
          Lean Canvas e lista de funcionalidades com votação.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lean Canvas</CardTitle>
          <CardDescription>Preencha os blocos do canvas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ideacao.leanCanvas.map((item) => (
              <div key={item.id} className="space-y-2">
                <Label className="text-xs text-muted-foreground">{item.title}</Label>
                <Textarea
                  placeholder={item.title}
                  value={item.content}
                  onChange={(e) => updateLeanCanvas(item.id, e.target.value)}
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funcionalidades</CardTitle>
          <CardDescription>Liste e vote nas prioridades.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nova funcionalidade..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
            />
            <Button type="button" onClick={handleAddFeature} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <ul className="space-y-2">
            {ideacao.funcionalidades.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2"
              >
                <span className="text-sm font-medium">{f.title}</span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => voteFuncionalidade(f.id, 1)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[1.5rem] text-center text-sm text-muted-foreground">
                    {f.votes}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFuncionalidade(f.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
