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

export async function generateImage(prompt: string): Promise<GenerateResult> {
  const res = await fetch(`${API_URL}/generate`, {
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
