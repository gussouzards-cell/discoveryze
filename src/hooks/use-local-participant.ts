"use client";

import { useEffect } from "react";
import { useWorkshopStore } from "@/store/workshop-store";

const LOCAL_PARTICIPANT_KEY = "dw-participant";
const COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6",
  "#3b82f6", "#8b5cf6", "#ec4899",
];

function getOrCreateParticipant(): { id: string; name: string; color: string } {
  if (typeof window === "undefined") {
    return { id: "anon", name: "Anônimo", color: COLORS[0] };
  }
  const raw = localStorage.getItem(LOCAL_PARTICIPANT_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // invalid
    }
  }
  const id = crypto.randomUUID();
  const name = "Participante";
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const p = { id, name, color };
  localStorage.setItem(LOCAL_PARTICIPANT_KEY, JSON.stringify(p));
  return p;
}

export function useLocalParticipant() {
  const addParticipant = useWorkshopStore((s) => s.addParticipant);

  useEffect(() => {
    const p = getOrCreateParticipant();
    addParticipant({
      id: p.id,
      name: p.name,
      color: p.color,
    });
  }, [addParticipant]);

  return getOrCreateParticipant();
}

export function setLocalParticipantName(name: string) {
  const raw = localStorage.getItem(LOCAL_PARTICIPANT_KEY);
  if (raw) {
    try {
      const p = JSON.parse(raw);
      p.name = name;
      localStorage.setItem(LOCAL_PARTICIPANT_KEY, JSON.stringify(p));
    } catch {
      // ignore
    }
  }
}

export function getLocalParticipantName(): string {
  if (typeof window === "undefined") return "Participante";
  const raw = localStorage.getItem(LOCAL_PARTICIPANT_KEY);
  if (raw) {
    try {
      const p = JSON.parse(raw);
      return p.name || "Participante";
    } catch {
      // ignore
    }
  }
  return "Participante";
}
