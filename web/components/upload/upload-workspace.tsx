"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  FileSpreadsheet,
  FileUp,
  FolderOpen,
  Loader2,
  TriangleAlert,
  X,
} from "lucide-react";
import { analysesService } from "@/services/analyses.service";

type Status = "idle" | "dragging" | "selected" | "invalid" | "processing";

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadWorkspace() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  function handleFile(f: File | undefined) {
    if (!f) return;

    if (!f.name.toLowerCase().endsWith(".csv")) {
      setFile(null);
      setError("Formato inválido. Só são aceites ficheiros .csv.");
      setStatus("invalid");
      return;
    }
    if (f.size > MAX_SIZE) {
      setFile(null);
      setError("O ficheiro excede o limite de 50 MB.");
      setStatus("invalid");
      return;
    }

    setError("");
    setFile(f);
    setStatus("selected");
  }

  function reset() {
    setFile(null);
    setError("");
    setProgress(0);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function startAnalysis() {
    if (!file) return;

    setProgress(0);
    setStatus("processing");

    // Animação fake de progresso enquanto o upload decorre
    const interval = setInterval(() => {
      setProgress((p) => Math.min(90, p + 8));
    }, 180);

    try {
      const analysis = await analysesService.upload(file);
      clearInterval(interval);
      setProgress(100);
      router.push(`/analyses/${analysis.id}`);
    } catch (err) {
      clearInterval(interval);
      setError(
        err instanceof Error ? err.message : "Falha ao enviar o ficheiro.",
      );
      setStatus("invalid");
    }
  }

  const busy = status === "processing";

  const zoneTone =
    status === "dragging"
      ? "border-primary bg-accent"
      : status === "invalid"
        ? "border-destructive/50 bg-destructive/5"
        : status === "selected"
          ? "border-success/50 bg-success/5"
          : "border-chart-2 bg-chart-2/40";

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mt-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground uppercase">
          <span className="size-1.5 rounded-full bg-primary" /> Nova análise
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tighter sm:text-5xl">
          Vamos analisar os teus dados.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-balance">
          Carrega um ficheiro CSV para descobrires informações importantes sobre
          as tuas vendas.
        </p>
      </div>

      {/* Cartão de upload */}
      <div className="mt-10 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-8">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (!busy) setStatus("dragging");
          }}
          onDragLeave={() => {
            if (status === "dragging") setStatus(file ? "selected" : "idle");
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (busy) return;
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex min-h-[18rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${zoneTone}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
            tabIndex={-1}
            aria-label="Escolher ficheiro CSV"
          />

          {(status === "idle" || status === "dragging") && (
            <>
              <span className="flex size-16 items-center justify-center rounded-2xl bg-accent text-primary">
                <FileUp className="size-8" />
              </span>
              <h2 className="mt-5 text-xl font-bold tracking-tight">
                {status === "dragging"
                  ? "Larga o ficheiro para o carregar"
                  : "Arrasta o teu ficheiro CSV para aqui"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                ou seleciona um ficheiro diretamente do teu dispositivo
              </p>
              <ChooseButton onClick={() => inputRef.current?.click()} />
              <FormatHint />
            </>
          )}

          {status === "selected" && file && (
            <>
              <span className="flex size-16 items-center justify-center rounded-2xl bg-success/10 text-success">
                <FileSpreadsheet className="size-8" />
              </span>
              <h2 className="mt-5 max-w-full truncate text-xl font-bold tracking-tight">
                {file.name}
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <BadgeCheck className="size-4 text-success" />{" "}
                {formatSize(file.size)} • pronto para analisar
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-background px-4 py-2 text-sm font-semibold shadow-sm transition-colors hover:bg-secondary"
              >
                <X className="size-4" /> Remover ficheiro
              </button>
            </>
          )}

          {status === "invalid" && (
            <>
              <span className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <TriangleAlert className="size-8" />
              </span>
              <h2 className="mt-5 text-xl font-bold tracking-tight">
                Não foi possível usar este ficheiro
              </h2>
              <p role="alert" className="mt-1 text-sm text-destructive">
                {error}
              </p>
              <ChooseButton
                label="Escolher outro ficheiro"
                onClick={() => inputRef.current?.click()}
              />
              <FormatHint />
            </>
          )}

          {status === "processing" && (
            <div className="w-full max-w-sm" aria-live="polite">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent text-primary">
                <Loader2 className="size-8 animate-spin motion-reduce:animate-none" />
              </span>
              <h2 className="mt-5 truncate text-xl font-bold tracking-tight">
                A enviar {file?.name ?? "o ficheiro"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A enviar o ficheiro para análise.
              </p>
              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-6 h-2 overflow-hidden rounded-full bg-background"
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-primary">
                {progress}%
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            O parsing acontece no teu navegador; os resultados são guardados na
            API para consultares mais tarde.
          </p>
          <button
            type="button"
            onClick={startAnalysis}
            disabled={status !== "selected"}
            className="inline-flex items-center gap-3 rounded-full bg-primary py-2 pr-2 pl-6 font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-transform enabled:hover:scale-[1.02] disabled:bg-chart-2 disabled:text-muted-foreground disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Analisar
            <span className="flex size-9 items-center justify-center rounded-full bg-white/25">
              <ArrowRight className="size-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ChooseButton({
  onClick,
  label = "Escolher ficheiro",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <FolderOpen className="size-4" /> {label}
    </button>
  );
}

function FormatHint() {
  return (
    <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-chart-2/70 px-3 py-1 text-xs font-medium">
      <BadgeCheck className="size-3.5 text-primary" /> Formato suportado: .CSV
      (até 50 MB, UTF-8)
    </p>
  );
}
