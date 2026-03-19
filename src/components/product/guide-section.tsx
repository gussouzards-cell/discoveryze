"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const body =
  "text-sm text-muted-foreground space-y-4 [&_h3]:text-foreground [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:first:mt-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1.5 [&_strong]:text-foreground [&_code]:text-xs [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5";

export function GuideSection({
  id,
  icon: Icon,
  title,
  description,
  accent,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "violet" | "blue" | "emerald" | "amber" | "rose" | "cyan" | "orange" | "slate";
  children: ReactNode;
}) {
  const accents = {
    violet: "from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300",
    blue: "from-blue-500/20 to-sky-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
    emerald: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    amber: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200",
    rose: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300",
    cyan: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300",
    orange: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-700 dark:text-orange-300",
    slate: "from-slate-500/20 to-zinc-500/10 border-slate-500/40 text-slate-700 dark:text-slate-300",
  };

  return (
    <section
      id={id}
      className="scroll-mt-[5.5rem] scroll-pb-8 rounded-2xl border border-border bg-card shadow-sm ring-1 ring-black/5 dark:ring-white/10"
    >
      <div
        className={cn(
          "flex flex-col gap-3 border-b border-border/80 bg-gradient-to-br px-5 py-5 sm:flex-row sm:items-center sm:gap-4 sm:px-6",
          accents[accent]
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-background/80 backdrop-blur-sm",
            accent === "violet" && "border-violet-500/20",
            accent === "blue" && "border-blue-500/20",
            accent === "emerald" && "border-emerald-500/20",
            accent === "amber" && "border-amber-500/20",
            accent === "rose" && "border-rose-500/20",
            accent === "cyan" && "border-cyan-500/20",
            accent === "orange" && "border-orange-500/20",
            accent === "slate" && "border-slate-500/20"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className={cn("px-5 py-6 sm:px-6 sm:py-8", body)}>{children}</div>
    </section>
  );
}

export function GuideCallout({
  variant = "tip",
  children,
}: {
  variant?: "tip" | "warn" | "flow";
  children: ReactNode;
}) {
  const styles = {
    tip: "border-emerald-500/30 bg-emerald-500/5",
    warn: "border-amber-500/30 bg-amber-500/5",
    flow: "border-primary/30 bg-primary/5",
  };
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm text-muted-foreground [&_strong]:text-foreground",
        styles[variant]
      )}
    >
      {children}
    </div>
  );
}

export function GuideTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
