"use client";

import { useState, useEffect } from "react";
import { WorkshopSidebar } from "./workshop-sidebar";
import { WorkshopHeader } from "./workshop-header";
import { WorkshopContent } from "./workshop-content";
import { useLocalParticipant } from "@/hooks/use-local-participant";
import { SpotlightTour } from "@/components/onboarding/spotlight-tour";
import { CollabBoardDialog } from "./collab-board-dialog";
import {
  WORKSHOP_TOUR_STEPS,
  TUTORIAL_WORKSHOP_KEY,
} from "@/components/onboarding/workshop-tour-steps";

export function WorkshopLayout() {
  useLocalParticipant();
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem(TUTORIAL_WORKSHOP_KEY);
    if (!done) setTutorialOpen(true);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background h-dvh max-h-dvh overflow-x-hidden">
      <SpotlightTour
        open={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
        steps={WORKSHOP_TOUR_STEPS}
        dontShowAgain={dontShowAgain}
        onDontShowAgain={setDontShowAgain}
        storageKey={TUTORIAL_WORKSHOP_KEY}
      />
      <WorkshopHeader
        onOpenTutorial={() => setTutorialOpen(true)}
        onOpenSidebar={() => setSidebarOpen(true)}
        onOpenBoard={() => setBoardOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden min-h-0">
        <WorkshopSidebar
          mobileOpen={sidebarOpen}
          onMobileClose={() => setSidebarOpen(false)}
        />
        <WorkshopContent />
      </div>
      <CollabBoardDialog open={boardOpen} onOpenChange={setBoardOpen} />
    </div>
  );
}
