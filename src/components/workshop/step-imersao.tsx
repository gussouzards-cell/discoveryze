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
              Siga a ordem: <strong>1) Job</strong> → <strong>2) Contexto</strong> →{" "}
              <strong>3) Sucesso</strong>. Monta a frase: “Quando ___, eu quero ___, para ___”.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jtbdJob">1. Job (o que a pessoa quer fazer)</Label>
              <p className="text-[11px] text-muted-foreground">
                Primeiro: qual progresso a pessoa busca? Evite solução (“usar app”); pense em tarefa real.
              </p>
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
              <Label htmlFor="jtbdContexto">2. Contexto (quando / em que situação)</Label>
              <p className="text-[11px] text-muted-foreground">
                Em que momento da rotina isso aparece? Reuniões, prazos, pressão do cliente…
              </p>
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
              <Label htmlFor="jtbdSucesso">3. Sucesso (para quê / resultado esperado)</Label>
              <p className="text-[11px] text-muted-foreground">
                O que muda se o “job” for bem feito? Resultado mensurável ou sentimento claro.
              </p>
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
          <CardDescription>
            Ordem sugerida: <strong>Problema → Público → Dor → Impacto</strong>. Não pule: cada campo
            alimenta o próximo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problema">1. Problema</Label>
            <p className="text-[11px] text-muted-foreground">
              Em uma frase: o que está errado hoje? Sem mencionar solução ou produto.
            </p>
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
            <Label htmlFor="publico">2. Público-alvo</Label>
            <p className="text-[11px] text-muted-foreground">
              Quem sente esse problema no dia a dia? Cargo, time, tipo de empresa.
            </p>
            <Input
              id="publico"
              placeholder="Quem sofre com esse problema?"
              value={imersao.publico}
              onChange={(e) => setImersao({ publico: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dor">3. Dor principal</Label>
            <p className="text-[11px] text-muted-foreground">
              A frustração mais forte: tempo perdido, risco, medo, retrabalho…
            </p>
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
            <Label htmlFor="impacto">4. Impacto esperado</Label>
            <p className="text-[11px] text-muted-foreground">
              Se resolvermos bem, o que melhora para negócio e para o usuário?
            </p>
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
