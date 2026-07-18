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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, delay = 5000): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw new Error("Server is waking up, please try again in a moment");
    }
    return res;
  }
  throw new Error("Server is waking up, please try again in a moment");
}

export async function generateImage(prompt: string): Promise<GenerateResult> {
  const res = await fetchWithRetry(`${API_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

  return res.json();
}
