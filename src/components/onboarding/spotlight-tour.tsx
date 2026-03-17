"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PADDING = 8;
const CARD_GAP = 16;
const CARD_HEIGHT_ESTIMATE = 260;
const SAFE_MARGIN = 16;

export interface SpotlightStep {
  target: string;
  title: string;
  content: string;
}

interface SpotlightTourProps {
  open: boolean;
  onClose: () => void;
  steps: SpotlightStep[];
  dontShowAgain?: boolean;
  onDontShowAgain?: (value: boolean) => void;
  storageKey?: string;
}

export function SpotlightTour({
  open,
  onClose,
  steps,
  dontShowAgain = false,
  onDontShowAgain,
  storageKey,
}: SpotlightTourProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [cardStyle, setCardStyle] = useState<{ top?: number; bottom?: number }>({});
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  const step = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  const measure = useCallback(() => {
    if (typeof document === "undefined" || !step) return;
    const el = document.querySelector(step.target);
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const isMobile = vw < 640;
    setIsMobileLayout(isMobile);
    const minTop = SAFE_MARGIN;
    const maxTop = vh - CARD_HEIGHT_ESTIMATE - SAFE_MARGIN;

    // Modo mobile: card fixo no rodapé (bottom sheet) para não quebrar layout
    if (isMobile) {
      if (el) {
        const r = el.getBoundingClientRect();
        setRect(
          new DOMRect(
            r.left - PADDING,
            r.top - PADDING,
            r.width + PADDING * 2,
            r.height + PADDING * 2
          )
        );
      } else {
        setRect(null);
      }
      setCardStyle({ bottom: SAFE_MARGIN });
      return;
    }

    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: "auto", block: "center" });
      const r = el.getBoundingClientRect();
      setRect(new DOMRect(r.left - PADDING, r.top - PADDING, r.width + PADDING * 2, r.height + PADDING * 2));
      const spaceBelow = vh - r.bottom - CARD_GAP;
      const spaceAbove = r.top - CARD_GAP;
      const fitsBelow = spaceBelow >= CARD_HEIGHT_ESTIMATE;
      const fitsAbove = spaceAbove >= CARD_HEIGHT_ESTIMATE;

      // Em telas bem pequenas, fixa o card como um "bottom sheet"
      if (isMobile && vh < 640) {
        const top = Math.max(minTop, vh - CARD_HEIGHT_ESTIMATE - SAFE_MARGIN);
        setCardStyle({ top });
      } else if (fitsBelow) {
        let top = r.bottom + CARD_GAP;
        top = Math.max(minTop, Math.min(maxTop, top));
        setCardStyle({ top });
      } else if (fitsAbove) {
        let top = r.top - CARD_GAP - CARD_HEIGHT_ESTIMATE;
        top = Math.max(minTop, Math.min(maxTop, top));
        setCardStyle({ top });
      } else {
        setCardStyle({ top: Math.max(minTop, (vh - CARD_HEIGHT_ESTIMATE) / 2) });
      }
    } else {
      setRect(null);
      setCardStyle({ top: Math.max(minTop, (vh - CARD_HEIGHT_ESTIMATE) / 2) });
    }
  }, [step?.target]);

  useEffect(() => {
    if (!open || !step) return;
    measure();
    const afterScroll = setTimeout(measure, 100);
    const onScrollOrResize = () => measure();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      clearTimeout(afterScroll);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, step, measure]);

  useEffect(() => {
    if (open) setStepIndex(0);
  }, [open]);

  if (!open) return null;

  const handleNext = () => {
    if (isLast) {
      if (storageKey && dontShowAgain && typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, "true");
      }
      onClose();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (isFirst) return;
    setStepIndex((i) => i - 1);
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay strips: top, left, right, bottom, with a "hole" at rect */}
      <div className="absolute inset-0 pointer-events-auto">
        {rect && (
          <>
            <div
              className="absolute bg-black/60"
              style={{ top: 0, left: 0, right: 0, height: Math.max(0, rect.top) }}
            />
            <div
              className="absolute bg-black/60"
              style={{
                top: rect.top,
                left: 0,
                width: Math.max(0, rect.left),
                height: rect.height,
              }}
            />
            <div
              className="absolute bg-black/60"
              style={{
                top: rect.top,
                left: rect.right,
                right: 0,
                height: rect.height,
              }}
            />
            <div
              className="absolute bg-black/60"
              style={{
                top: rect.bottom,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
            {/* Highlight ring around target */}
            <div
              className="absolute rounded-lg border-2 border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/30"
              style={{
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
              }}
            />
          </>
        )}
        {!rect && step && (
          <div className="absolute inset-0 bg-black/60" />
        )}
      </div>

      {/* Tooltip card - fixo na viewport, com layout diferente em mobile */}
      {step && (
        <div
          className={cn(
            "fixed z-[101] pointer-events-auto",
            isMobileLayout
              ? "left-0 right-0 px-3"
              : "left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-sm sm:mx-4"
          )}
          style={
            isMobileLayout
              ? {
                  bottom: cardStyle.bottom ?? SAFE_MARGIN,
                }
              : {
                  left: "50%",
                  transform: "translateX(-50%)",
                  ...(cardStyle.top != null ? { top: cardStyle.top } : {}),
                  ...(cardStyle.bottom != null ? { bottom: cardStyle.bottom } : {}),
                }
          }
        >
          <div className="w-full rounded-xl border border-border bg-card p-4 shadow-xl max-h-[55vh] overflow-y-auto">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">{step.title}</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">{step.content}</p>
            <div className="mt-4 flex flex-col-reverse sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="text-xs text-muted-foreground hover:text-foreground underline py-1"
                >
                  Pular tutorial
                </button>
                {onDontShowAgain && (
                  <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={dontShowAgain}
                      onChange={(e) => onDontShowAgain(e.target.checked)}
                      className="rounded border-border"
                    />
                    Não mostrar de novo
                  </label>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!isFirst && (
                  <Button variant="outline" size="sm" onClick={handlePrev}>
                    Anterior
                  </Button>
                )}
                <Button size="sm" onClick={handleNext}>
                  {isLast ? "Entendi" : "Próximo"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
