import { apiUrl } from "@/shared/config/api.config";
import type { Analysis } from "@/shared/types/analysis";

export type UploadResponse = Analysis;
export type DeleteResponse = { deleted: number };
export type DeleteBulkPayload = { ids: number[] };

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000 * 2);

  try {
    const res = await fetch(apiUrl(path), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      signal: controller.signal,
      cache: "no-store",
      redirect: "follow",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new ApiError(res.status, text || `Request failed: ${res.status}`);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } catch (err) {
    const e = err as Error & { cause?: unknown };
    console.error("Fetch error details:", {
      url: apiUrl(path),
      message: e.message,
      cause: e.cause,
      fullError: e,
    });
    throw new ApiError(0, (err as Error).message ?? "Network error");
  } finally {
    clearTimeout(timeout);
  }
}

export const analysesService = {
  list(): Promise<Analysis[]> {
    return request<Analysis[]>("/analyses");
  },

  async get(id: string | number): Promise<Analysis | null> {
    try {
      return await request<Analysis>(`/analyses/${id}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  },

  async upload(file: File): Promise<UploadResponse> {
    const form = new FormData();
    form.append("file", file);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000); // uploads podem ser lentos

    try {
      const res = await fetch(apiUrl("/analyses/upload"), {
        method: "POST",
        body: form,
        signal: controller.signal,
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new ApiError(res.status, text || "Upload failed");
      }
      return (await res.json()) as UploadResponse;
    } finally {
      clearTimeout(timeout);
    }
  },

  remove(id: string | number): Promise<void> {
    return request<void>(`/analyses/${id}`, { method: "DELETE" });
  },

  removeBulk(ids: number[]): Promise<DeleteResponse> {
    return request<DeleteResponse>("/analyses/bulk", {
      method: "DELETE",
      body: JSON.stringify({ ids } satisfies DeleteBulkPayload),
    });
  },
};
