"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useWorkshopStore } from "@/store/workshop-store";
import type { FrameworkId } from "@/types/workshop";

export function StepImersao({ frameworkId }: { frameworkId: FrameworkId }) {
  const imersao = useWorkshopStore((s) => s.imersao);
  const setImersao = useWorkshopStore((s) => s.setImersao);

  if (frameworkId === "jobs-to-be-done") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Imersão</h2>
          <p className="text-muted-foreground">
            Jobs To Be Done: defina o “job”, o contexto e o que é sucesso.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>JTBD</CardTitle>
            <CardDescription>
              Escreva como se fosse a frase: “Quando ___, eu quero ___, para
              ___”.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jtbdJob">Job (o que a pessoa quer fazer)</Label>
              <Textarea
                id="jtbdJob"
                placeholder="Ex: organizar as prioridades do backlog com clareza"
                value={imersao.jtbdJob}
                onChange={(e) => setImersao({ jtbdJob: e.target.value })}
                rows={2}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jtbdContexto">Contexto (quando / em que situação)</Label>
              <Textarea
                id="jtbdContexto"
                placeholder="Ex: quando estou em uma reunião de alinhamento com time e cliente"
                value={imersao.jtbdContexto}
                onChange={(e) => setImersao({ jtbdContexto: e.target.value })}
                rows={2}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jtbdSucesso">Sucesso (para quê / resultado esperado)</Label>
              <Textarea
                id="jtbdSucesso"
                placeholder="Ex: reduzir retrabalho e acelerar decisões de escopo"
                value={imersao.jtbdSucesso}
                onChange={(e) => setImersao({ jtbdSucesso: e.target.value })}
                rows={2}
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
        <h2 className="text-2xl font-semibold tracking-tight">Imersão</h2>
        <p className="text-muted-foreground">
          Entenda o problema, o público e o impacto antes de propor soluções.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contexto do problema</CardTitle>
          <CardDescription>Preencha os campos com a visão do grupo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problema">Problema</Label>
            <Textarea
              id="problema"
              placeholder="Qual problema estamos tentando resolver?"
              value={imersao.problema}
              onChange={(e) => setImersao({ problema: e.target.value })}
              rows={3}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publico">Público-alvo</Label>
            <Input
              id="publico"
              placeholder="Quem sofre com esse problema?"
              value={imersao.publico}
              onChange={(e) => setImersao({ publico: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dor">Dor principal</Label>
            <Textarea
              id="dor"
              placeholder="Qual a maior dor ou frustração?"
              value={imersao.dor}
              onChange={(e) => setImersao({ dor: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="impacto">Impacto esperado</Label>
            <Textarea
              id="impacto"
              placeholder="Que resultado queremos ao resolver?"
              value={imersao.impacto}
              onChange={(e) => setImersao({ impacto: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
