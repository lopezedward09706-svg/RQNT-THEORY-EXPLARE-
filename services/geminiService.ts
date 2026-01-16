
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { TheoryMessage } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (
  messages: TheoryMessage[],
  useThinking: boolean = true
): Promise<{ text: string; thought?: string }> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = `
    You are an expert theoretical physicist specializing in the R-QNT (Rama-Quantum Network Torsion) theory.
    R-QNT proposes that spacetime is a dynamic elastic network of A, B, and C fields.
    Matter is represented as topological knots (Borromean knots).
    Gravity is the elastic restorative force of 'string consumption'.
    Chirality (Right/Left) dictates charge.
    There are two branches: R-QNT-C (constant c) and R-QNT-V (variable c based on network tension).
    Provide deep, rigorous insights using the provided theory context.
    Use LaTeX formatting for equations where possible.
  `;

  const lastMessage = messages[messages.length - 1];
  
  const response = await ai.models.generateContent({
    model,
    contents: messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    })),
    config: {
      systemInstruction,
      thinkingConfig: useThinking ? { thinkingBudget: 32768 } : undefined,
    },
  });

  return {
    text: response.text || "I'm sorry, I couldn't generate a response.",
    // Note: Thinking metadata is currently not explicitly separated in the standard text output 
    // but the model will reflect the thinking in its logical flow.
  };
};
