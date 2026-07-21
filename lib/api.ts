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

function getApiUrl(): string {
  if (typeof window !== "undefined") {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envUrl && !envUrl.includes("localhost")) return envUrl;
    return "http://localhost:4000";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
}

const API_URL = getApiUrl();

const REQUEST_TIMEOUT = 300_000;

function isLocalhost(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
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
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("Request timed out. The server may be waking up, please try again.");
    }
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error(
        `Cannot reach the backend at ${API_URL}. ` +
        (isLocalhost()
          ? "Make sure the backend is running on port 4000."
          : "The server may be starting up, please try again in a moment.")
      );
    }
    throw err;
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

  const streamTimeout = setTimeout(() => {
    controller.abort();
    onEvent({
      type: "error",
      error: "Generation is taking longer than expected. The server may be under heavy load — please try again.",
    });
  }, 600_000);

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
        if (err instanceof TypeError && err.message.includes("fetch")) {
          onEvent({
            type: "error",
            error: isLocalhost()
              ? "Cannot reach the backend. Make sure it's running on port 4000."
              : "Cannot reach the server. It may be starting up — please try again in a moment.",
          });
        } else {
          onEvent({
            type: "error",
            error: "Connection lost during generation. Click Try again to restart.",
          });
        }
      }
    })
    .finally(() => {
      clearTimeout(streamTimeout);
    });

  return () => {
    clearTimeout(streamTimeout);
    signal?.removeEventListener("abort", onAbort);
    controller.abort();
  };
}
