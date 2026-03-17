"use client";

import { useEffect, useRef } from "react";
import { useWorkshopStore } from "@/store/workshop-store";

const TICK_MS = 1000;

export function useTimer(onFinish?: () => void) {
  const timerSeconds = useWorkshopStore((s) => s.timerSeconds);
  const timerRunning = useWorkshopStore((s) => s.timerRunning);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      const state = useWorkshopStore.getState();
      const next = Math.max(0, state.timerSeconds - 1);
      state.setTimerSeconds(next);
      if (next <= 0) {
        state.setTimerRunning(false);
        onFinishRef.current?.();
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [timerRunning]);

  return { timerSeconds, timerRunning };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
