"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useWorkshopStore } from "@/store/workshop-store";
import { WorkshopLayout } from "@/components/workshop/workshop-layout";

function WorkshopPageInner() {
  const searchParams = useSearchParams();
  const setRoom = useWorkshopStore((s) => s.setRoom);

  useEffect(() => {
    const room = searchParams.get("room");
    if (room) {
      const name = useWorkshopStore.getState().roomName;
      setRoom(room, name === "Nova Sala" ? `Sala ${room}` : name);
    }
  }, [searchParams, setRoom]);

  return <WorkshopLayout />;
}

export default function WorkshopPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-background">Carregando...</div>}>
      <WorkshopPageInner />
    </Suspense>
  );
}
