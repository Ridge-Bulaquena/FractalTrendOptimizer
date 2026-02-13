
import { GoogleGenAI } from "@google/genai";

export class AnalysisService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async synthesizeNarrative(graphMetrics: any) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze these social network fractal metrics and synthesize the emergent narrative:
        ${JSON.stringify(graphMetrics)}
        
        Focus on:
        1. Narrative coherence
        2. Potential for viral cascade
        3. Information bottlenecks
        
        Return a concise, research-grade summary.`,
        config: {
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text || "Analysis pending...";
    } catch (error) {
      console.error("AI Analysis Error:", error);
      return "Unable to reach narrative synthesizer.";
    }
  }
}

export const analysisService = new AnalysisService();
