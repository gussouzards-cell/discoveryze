"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Play, Pause, MoreVertical, Share2, ArrowLeft, BookOpen, Menu, LayoutTemplate } from "lucide-react";
import { useWorkshopStore } from "@/store/workshop-store";
import { useTimer, formatTime } from "@/hooks/use-timer";
import { useLocalParticipant, setLocalParticipantName } from "@/hooks/use-local-participant";
import { toast } from "sonner";

interface WorkshopHeaderProps {
  onOpenTutorial?: () => void;
  onOpenSidebar?: () => void;
  onOpenBoard?: () => void;
}

export function WorkshopHeader({ onOpenTutorial, onOpenSidebar, onOpenBoard }: WorkshopHeaderProps = {}) {
  const {
    roomId,
    roomName,
    participants,
    timerSeconds,
    timerRunning,
    timerInitialSeconds,
    setTimerRunning,
    extendTimer,
    setTimerInitial,
    updateParticipantName,
  } = useWorkshopStore();
  const localParticipant = useLocalParticipant();
  const [editName, setEditName] = useState(localParticipant.name);
  const progressPercent = timerInitialSeconds > 0 ? (timerSeconds / timerInitialSeconds) * 100 : 0;
  useLocalParticipant();

  const shareLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/workshop?room=${roomId || "new"}` : "";
    if (url && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Link copiado! Compartilhe com o time.");
    }
  };
  useTimer(() => {
    toast.info("Tempo esgotado! Finalize ou estenda o timebox.");
  });

  const handleExtend = (sec: number) => {
    extendTimer(sec);
    toast.success(`${sec / 60} min adicionados ao timer`);
  };

  return (
    <header className="sticky top-0 z-10 flex h-12 sm:h-14 flex-wrap items-center justify-between gap-2 border-b border-border bg-background/95 px-2 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
        {onOpenSidebar && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 md:hidden shrink-0"
            onClick={onOpenSidebar}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Link href="/" className="text-muted-foreground hover:text-foreground shrink-0" data-tour="back">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="truncate text-sm sm:text-lg font-semibold min-w-0 max-w-[120px] sm:max-w-none" data-tour="room-name">{roomName}</h1>
        <Button size="sm" variant="ghost" className="h-8 gap-1 shrink-0" onClick={shareLink} data-tour="share">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Compartilhar link</span>
        </Button>
        <div className="flex -space-x-2 items-center shrink-0" data-tour="participants">
          {participants.slice(0, 5).map((p) => (
            <Avatar
              key={p.id}
              className="h-8 w-8 border-2 border-background"
              style={{ backgroundColor: p.color }}
            >
              <AvatarFallback className="text-xs text-white">
                {p.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
          {participants.length > 5 && (
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">+{participants.length - 5}</AvatarFallback>
            </Avatar>
          )}
          <DropdownMenu onOpenChange={(open) => open && setEditName(localParticipant.name)}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2 h-8 gap-1.5 rounded-full px-2" data-tour="meu-perfil">
                <Avatar
                  className="h-7 w-7 border-2 border-border"
                  style={{ backgroundColor: localParticipant.color }}
                >
                  <AvatarFallback className="text-xs text-white">
                    {localParticipant.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground hidden sm:inline">Meu perfil</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <div className="p-2 space-y-2">
                <Label htmlFor="header-name" className="text-xs">Seu nome</Label>
                <Input
                  id="header-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Seu nome"
                  className="h-9"
                />
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    const name = editName.trim() || localParticipant.name;
                    setLocalParticipantName(name);
                    updateParticipantName(localParticipant.id, name);
                    toast.success("Nome atualizado.");
                  }}
                >
                  Salvar
                </Button>
              </div>
              <DropdownMenuSeparator />
              {onOpenTutorial && (
                <DropdownMenuItem onClick={onOpenTutorial}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Ver tutorial de novo
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {onOpenBoard && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1 shrink-0"
            onClick={onOpenBoard}
            data-tour="board"
          >
            <LayoutTemplate className="h-4 w-4" />
            <span className="hidden sm:inline">Quadro</span>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0" data-tour="timer">
        <Card className="flex flex-col gap-1 border-border px-2 sm:px-3 py-1.5 sm:py-2 min-w-0 w-[100px] sm:min-w-[140px] md:min-w-[180px]">
          <div className="flex items-center gap-1 sm:gap-2">
          <Badge
            variant={timerSeconds <= 60 ? "destructive" : "secondary"}
            className="font-mono text-xs sm:text-sm"
          >
            {formatTime(timerSeconds)}
          </Badge>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={() => setTimerRunning(!timerRunning)}
          >
            {timerRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimerInitial(5 * 60)}>
                5 min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimerInitial(15 * 60)}>
                15 min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimerInitial(30 * 60)}>
                30 min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExtend(5 * 60)}>
                Estender +5 min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExtend(10 * 60)}>
                Estender +10 min
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <Progress value={progressPercent} className="h-1" />
        </Card>
      </div>
    </header>
  );
}
