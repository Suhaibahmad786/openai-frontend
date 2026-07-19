export interface ScoreBreakdown {
  adherence: number;
  aesthetics: number;
  lighting: number;
  creativity: number;
}

export interface Candidate {
  url: string;
  total: number;
  breakdown: ScoreBreakdown;
  reasoning: string;
}

export interface GenerateResult {
  bestImageUrl: string;
  score: number;
  breakdown: ScoreBreakdown;
  reasoning: string;
  intent: {
    subject: string;
    style: string;
    mood: string;
    keyVisualElements: string[];
  };
  promptVariations: string[];
  allCandidates: Candidate[];
  iterations: number;
  error?: string;
}

export interface SSEEvent {
  type: "node_start" | "node_end" | "complete" | "error" | "log";
  node?: string;
  label?: string;
  result?: GenerateResult;
  error?: string;
  message?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const REQUEST_TIMEOUT = 120_000;

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function generateImage(
  prompt: string,
  signal?: AbortSignal
): Promise<GenerateResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);

  try {
    const res = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    return res.json();
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

export function generateStream(
  prompt: string,
  onEvent: (event: SSEEvent) => void,
  signal?: AbortSignal
): () => void {
  const controller = new AbortController();
  const url = `${API_URL}/generate/stream?prompt=${encodeURIComponent(prompt)}`;

  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);

  fetch(url, { signal: controller.signal })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Stream failed" }));
        onEvent({ type: "error", error: err.error || `HTTP ${res.status}` });
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        onEvent({ type: "error", error: "No response body" });
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        let eventType = "";
        for (const line of lines) {
          if (line.startsWith("event: ")) {
            eventType = line.slice(7).trim();
          } else if (line.startsWith("data: ")) {
            const data = line.slice(6);
            try {
              const parsed = JSON.parse(data);
              onEvent({ type: eventType as SSEEvent["type"], ...parsed });
            } catch {
              // skip malformed data
            }
          }
        }
      }
    })
    .catch((err) => {
      if (err.name !== "AbortError") {
        onEvent({ type: "error", error: err.message || "Connection failed" });
      }
    });

  return () => {
    signal?.removeEventListener("abort", onAbort);
    controller.abort();
  };
}
