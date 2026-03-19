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
import { LeanCanvasGuided } from "./lean-canvas-guided";

export function StepIdeacao({ frameworkId }: { frameworkId: FrameworkId }) {
  const ideacao = useWorkshopStore((s) => s.ideacao);
  const setIdeacao = useWorkshopStore((s) => s.setIdeacao);
  const addFuncionalidade = useWorkshopStore((s) => s.addFuncionalidade);
  const voteFuncionalidade = useWorkshopStore((s) => s.voteFuncionalidade);
  const updateLeanCanvas = useWorkshopStore((s) => s.updateLeanCanvas);
  const [newFeature, setNewFeature] = useState("");

  const removeFuncionalidade = (id: string) => {
    setIdeacao((prev) => ({
      ...prev,
      funcionalidades: prev.funcionalidades.filter((f) => f.id !== id),
    }));
  };

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
              <strong>1º</strong> defina a jornada em etapas grandes; <strong>2º</strong> quebre em histórias/passos
              por etapa. Só depois marque o que entra no MVP.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storyAtividades">
                1. Atividades macro (linha de cima)
              </Label>
              <p className="text-[11px] text-muted-foreground">
                Ex.: Descobrir → Avaliar → Comprar → Usar. Poucas palavras por etapa.
              </p>
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
                2. Passos / histórias (linha de baixo)
              </Label>
              <p className="text-[11px] text-muted-foreground">
                Para cada atividade, liste ações ou histórias. Depois o time corta o que não entra no MVP.
              </p>
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
              Ordem útil: <strong>Reach</strong> → <strong>Impact</strong> → <strong>Confidence</strong> →{" "}
              <strong>Effort</strong>. Estime rápido; o score é apoio à conversa, não verdade absoluta.
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

  if (frameworkId === "kano") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Ideação</h2>
          <p className="text-muted-foreground">
            Kano: classifique requisitos ou funcionalidades em básicos, desempenho e encantadores.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Kano</CardTitle>
            <CardDescription>
              Liste itens em cada categoria (uma linha ou bullet por item).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kanoB">Básicos (must-have)</Label>
              <Textarea
                id="kanoB"
                placeholder="Ex: login seguro, exportar relatório..."
                value={ideacao.kanoBasico}
                onChange={(e) => setIdeacao({ kanoBasico: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kanoD">Desempenho (quanto melhor, mais satisfeito)</Label>
              <Textarea
                id="kanoD"
                placeholder="Ex: tempo de resposta, quantidade de filtros..."
                value={ideacao.kanoDesempenho}
                onChange={(e) => setIdeacao({ kanoDesempenho: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kanoE">Encantadores (surpresa positiva)</Label>
              <Textarea
                id="kanoE"
                placeholder="Ex: atalho que poucos esperam, personalização..."
                value={ideacao.kanoEncantador}
                onChange={(e) => setIdeacao({ kanoEncantador: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (frameworkId === "opportunity-solution-tree") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Ideação</h2>
          <p className="text-muted-foreground">
            Opportunity Solution Tree: objetivo → oportunidades → soluções possíveis.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Solution Tree</CardTitle>
            <CardDescription>
              Comece pelo resultado desejado, depois oportunidades e ideias de solução.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ostObj">Objetivo / resultado desejado</Label>
              <Textarea
                id="ostObj"
                placeholder="Ex: Aumentar retenção de clientes enterprise em 15% no trimestre"
                value={ideacao.ostObjetivo}
                onChange={(e) => setIdeacao({ ostObjetivo: e.target.value })}
                rows={2}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ostOpp">Oportunidades (problemas ou gaps a explorar)</Label>
              <Textarea
                id="ostOpp"
                placeholder="Liste oportunidades, uma por linha ou em bullets"
                value={ideacao.ostOportunidades}
                onChange={(e) => setIdeacao({ ostOportunidades: e.target.value })}
                rows={5}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ostSol">Soluções candidatas (por oportunidade ou geral)</Label>
              <Textarea
                id="ostSol"
                placeholder="Ideias de produto, fluxos ou features que endereçam as oportunidades"
                value={ideacao.ostSolucoes}
                onChange={(e) => setIdeacao({ ostSolucoes: e.target.value })}
                rows={5}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (frameworkId === "impact-mapping") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Ideação</h2>
          <p className="text-muted-foreground">
            Impact Mapping: ligar objetivo de negócio a atores, impactos e entregáveis.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Impact Mapping</CardTitle>
            <CardDescription>
              Do objetivo aos entregáveis que movem comportamento dos atores.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imGoal">Objetivo de negócio</Label>
              <Textarea
                id="imGoal"
                placeholder="Ex: Reduzir churn de contas pagantes"
                value={ideacao.impactGoal}
                onChange={(e) => setIdeacao({ impactGoal: e.target.value })}
                rows={2}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imActors">Atores (quem pode ajudar ou bloquear)</Label>
              <Textarea
                id="imActors"
                placeholder="Ex: admin do cliente, PM interno, suporte..."
                value={ideacao.impactActors}
                onChange={(e) => setIdeacao({ impactActors: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imImpacts">Impactos desejados (comportamentos)</Label>
              <Textarea
                id="imImpacts"
                placeholder="Ex: usar feature X toda semana, convidar colegas..."
                value={ideacao.impactImpacts}
                onChange={(e) => setIdeacao({ impactImpacts: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imDeliv">Entregáveis (o que o produto oferece)</Label>
              <Textarea
                id="imDeliv"
                placeholder="Features, integrações, conteúdos que sustentam os impactos"
                value={ideacao.impactDeliverables}
                onChange={(e) => setIdeacao({ impactDeliverables: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (frameworkId === "lean-canvas") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Ideação</h2>
          <p className="text-muted-foreground">
            Lean Canvas em <strong>ordem de workshop</strong>: um bloco por vez, com dicas para o facilitador.
            Você pode alternar para a visão completa quando quiser revisar.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lean Canvas (guiado)</CardTitle>
            <CardDescription>
              Seguindo a sequência clássica: problema → segmento → proposta de valor → solução → canais →
              receita → custo → métricas → vantagem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeanCanvasGuided leanCanvas={ideacao.leanCanvas} updateLeanCanvas={updateLeanCanvas} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
      O framework <strong>{frameworkId}</strong> ainda não tem formulário dedicado nesta etapa.
      Use o configurador de roteiro (engrenagem na sidebar) para ajustar o workshop.
    </div>
  );
}
