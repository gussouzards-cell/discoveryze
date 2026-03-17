"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useWorkshopStore } from "@/store/workshop-store";
import type { FrameworkId } from "@/types/workshop";

export function StepPlano({ frameworkId }: { frameworkId: FrameworkId }) {
  const plano = useWorkshopStore((s) => s.plano);
  const setPlano = useWorkshopStore((s) => s.setPlano);

  if (frameworkId === "definition-of-mvp") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Plano de Ação</h2>
          <p className="text-muted-foreground">
            Definition of MVP: alinhe claramente o que entra e o que sai do primeiro release.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Definition of MVP</CardTitle>
            <CardDescription>
              Use bullets curtos para alinhar expectativas com time e cliente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mvpDef">O que entra no MVP</Label>
              <Textarea
                id="mvpDef"
                placeholder="Liste as capacidades essenciais do MVP..."
                value={plano.mvp}
                onChange={(e) => setPlano({ mvp: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entregaveis">Entregáveis</Label>
              <Textarea
                id="entregaveis"
                placeholder="Quais entregáveis tangíveis serão produzidos (docs, protótipos, etc.)?"
                value={plano.entregaveis}
                onChange={(e) => setPlano({ entregaveis: e.target.value })}
                rows={3}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (frameworkId === "experimentos-validacao") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Plano de Ação</h2>
          <p className="text-muted-foreground">
            Planeje os experimentos que vão validar problema, solução e disposição a pagar.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Experimentos & Validação</CardTitle>
            <CardDescription>
              Enumere hipóteses, tipo de experimento e critério de sucesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="planoValidacao">Plano de experimentos</Label>
              <Textarea
                id="planoValidacao"
                placeholder="Ex: Entrevistas qualitativas, teste de protótipo, landing page com CTA..."
                value={plano.planoValidacao}
                onChange={(e) => setPlano({ planoValidacao: e.target.value })}
                rows={6}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Plano de Ação</h2>
        <p className="text-muted-foreground">
          Defina MVP, roadmap, métricas e riscos.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plano</CardTitle>
          <CardDescription>Documente as decisões do workshop.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mvp">MVP (escopo mínimo)</Label>
            <Textarea
              id="mvp"
              placeholder="O que entra no primeiro lançamento?"
              value={plano.mvp}
              onChange={(e) => setPlano({ mvp: e.target.value })}
              rows={3}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roadmap">Roadmap</Label>
            <Textarea
              id="roadmap"
              placeholder="Fases ou marcos seguintes"
              value={plano.roadmap}
              onChange={(e) => setPlano({ roadmap: e.target.value })}
              rows={3}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metricas">Métricas de sucesso</Label>
            <Textarea
              id="metricas"
              placeholder="Como vamos medir o sucesso?"
              value={plano.metricas}
              onChange={(e) => setPlano({ metricas: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="riscos">Riscos e mitigações</Label>
            <Textarea
              id="riscos"
              placeholder="Principais riscos e como mitigar"
              value={plano.riscos}
              onChange={(e) => setPlano({ riscos: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
