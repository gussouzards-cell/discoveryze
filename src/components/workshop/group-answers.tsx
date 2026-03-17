"use client";

import { useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useWorkshopStore } from "@/store/workshop-store";
import { useLocalParticipant } from "@/hooks/use-local-participant";
import type { FrameworkId } from "@/types/workshop";
import { GROUP_QUESTIONS } from "@/lib/group-questions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface GroupAnswersProps {
  frameworkId: FrameworkId;
}

export function GroupAnswers({ frameworkId }: GroupAnswersProps) {
  const questions = GROUP_QUESTIONS[frameworkId];
  const local = useLocalParticipant();

  const participants = useWorkshopStore((s) => s.participants);
  const groupAnswers = useWorkshopStore((s) => s.groupAnswers);
  const submitGroupAnswer = useWorkshopStore((s) => s.submitGroupAnswer);
  const revealGroupAnswer = useWorkshopStore((s) => s.revealGroupAnswer);
  const revealAllGroupAnswers = useWorkshopStore(
    (s) => s.revealAllGroupAnswers
  );

  const answersForFramework =
    groupAnswers[frameworkId as keyof typeof groupAnswers] ?? {};

  const localAnswers = answersForFramework[local.id] ?? {};

  const participantsWithAnswers = useMemo(
    () =>
      participants.map((p) => ({
        ...p,
        answers: answersForFramework[p.id],
      })),
    [participants, answersForFramework]
  );

  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-6 sm:mt-8 grid gap-4 grid-cols-1 lg:grid-cols-2" data-tour="group-answers">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Sua visão (respostas individuais)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((q) => (
            <div key={q.key} className="space-y-2">
              <Label className="text-xs">{q.label}</Label>
              <Textarea
                rows={2}
                placeholder={q.placeholder}
                className="resize-none text-sm"
                value={localAnswers[q.key]?.value ?? ""}
                onChange={(e) =>
                  submitGroupAnswer(
                    frameworkId,
                    local.id,
                    q.key,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
          <p className="text-[11px] text-muted-foreground">
            Suas respostas ficam ligadas ao seu usuário local neste navegador.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-sm">
            Respostas do grupo (visão facilitador)
          </CardTitle>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => revealAllGroupAnswers(frameworkId)}
          >
            Revelar todas
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[320px] overflow-auto pr-1">
          {participantsWithAnswers.map((p) => {
            const hasAny = p.answers && Object.keys(p.answers).length > 0;
            const isRevealed =
              hasAny &&
              Object.values(p.answers!).some((a) => a.revealed === true);
            return (
              <div
                key={p.id}
                className={cn(
                  "flex gap-2 rounded-md border border-border bg-background px-2 py-2 text-xs",
                  !hasAny && "opacity-60"
                )}
              >
                <Avatar className="h-7 w-7 border border-border">
                  <AvatarFallback className="text-[10px]">
                    {p.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{p.name}</span>
                    {hasAny ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-[11px]"
                        onClick={() => revealGroupAnswer(frameworkId, p.id)}
                      >
                        Revelar
                      </Button>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">
                        Aguardando resposta
                      </span>
                    )}
                  </div>
                  {hasAny && isRevealed && (
                    <div className="space-y-1">
                      {questions.map((q) => {
                        const qa = p.answers?.[q.key];
                        if (!qa?.value?.trim()) return null;
                        return (
                          <div key={q.key} className="space-y-0.5">
                            <p className="text-[10px] font-semibold text-muted-foreground">
                              {q.label}
                            </p>
                            <p className="text-[11px] leading-snug">
                              {qa.value}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {participantsWithAnswers.length === 0 && (
            <p className="text-[11px] text-muted-foreground">
              Ainda não há participantes conectados nesta sala.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

