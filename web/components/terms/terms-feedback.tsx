"use client";

import { useState } from "react";
import { CircleHelp, MessageCircleQuestion, ThumbsUp } from "lucide-react";

export function TermsFeedback() {
  const [answer, setAnswer] = useState<null | "yes" | "help">(null);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm print:hidden">
      <p className="flex items-center gap-2.5">
        <CircleHelp className="size-5 text-muted-foreground" />
        {answer === null && "Estes termos responderam a todas as tuas questões?"}
        {answer === "yes" && "Obrigado pelo feedback."}
        {answer === "help" && (
          <span>
            Escreve-nos para{" "}
            <a href="mailto:suporte@datalens.ao" className="font-semibold text-accent-foreground hover:underline">
              suporte@datalens.ao
            </a>{" "}
            e respondemos o mais depressa possível.
          </span>
        )}
      </p>

      {answer === null && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAnswer("yes")}
            className="inline-flex items-center gap-1.5 rounded-full bg-chart-2/60 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-chart-2"
          >
            <ThumbsUp className="size-3.5" /> Sim, claro
          </button>
          <button
            type="button"
            onClick={() => setAnswer("help")}
            className="inline-flex items-center gap-1.5 rounded-full bg-chart-2/60 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-chart-2"
          >
            <MessageCircleQuestion className="size-3.5" /> Preciso de apoio
          </button>
        </div>
      )}
    </div>
  );
}