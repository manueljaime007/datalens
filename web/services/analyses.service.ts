import { apiUrl } from "@/shared/config/api.config";
import type { Analysis } from "@/shared/types/analysis";
// import { cacheLife, cacheTag } from "next/cache";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type UploadResponse = Analysis;

export type DeleteResponse = { deleted: number };

export type DeleteBulkPayload = { ids: number[] };

/* -------------------------------------------------------------------------- */
/*  Errors                                                                    */
/* -------------------------------------------------------------------------- */

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/* -------------------------------------------------------------------------- */
/*  Core fetch                                                                */
/* -------------------------------------------------------------------------- */

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

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
    // if (err instanceof ApiError) throw err;
    // if ((err as Error).name === "AbortError") {
    //   throw new ApiError(504, "Request timed out");
    // }

    const e = err as Error & { cause?: { code?: string; message?: string } };
    console.error("Fetch error:", {
      url: apiUrl(path),
      message: e.message,
      code: e.cause?.code, // ex: ECONNREFUSED
      cause: e.cause?.message,
    });
    throw new ApiError(0, (err as Error).message ?? "Network error");
  } finally {
    clearTimeout(timeout);
  }
}

/* -------------------------------------------------------------------------- */
/*  Service                                                                   */
/* -------------------------------------------------------------------------- */

export const analysesService = {
  list(): Promise<Analysis[]> {
    return request<Analysis[]>("/analyses/"); // ← barra no fim
  },

  async get(id: string | number): Promise<Analysis | null> {
    try {
      return await request<Analysis>(`/analyses/${id}/`); // ← barra no fim
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  },
  
  /** POST /analyses/upload — multipart/form-data */
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

  /** DELETE /analyses/{id} */
  remove(id: string | number): Promise<void> {
    return request<void>(`/analyses/${id}`, { method: "DELETE" });
  },

  /** DELETE /analyses/bulk */
  removeBulk(ids: number[]): Promise<DeleteResponse> {
    return request<DeleteResponse>("/analyses/bulk", {
      method: "DELETE",
      body: JSON.stringify({ ids } satisfies DeleteBulkPayload),
    });
  },
};

// export async function listAnalysesCached(): Promise<Analysis[]> {
//   // "use cache";
//   cacheLife("minutes"); // ou "hours", dependendo da frequência de atualização
//   // cacheTag("analyses"); // tag para invalidação futura
//   return analysesService.list();
// }
