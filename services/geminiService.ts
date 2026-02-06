import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getFirstAidAdvice = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "عذراً، خدمة الذكاء الاصطناعي غير متوفرة حالياً (API Key missing).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Query: ${query}`,
      config: {
        systemInstruction: "You are an expert emergency medical responder assistant. Provide concise, clear, and life-saving first aid instructions in Arabic. If the situation sounds critical, advise calling emergency services immediately as the first step. Keep answers short and actionable.",
      },
    });
    return response.text || "لم يتم استلام رد.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "حدث خطأ أثناء الاتصال بالمساعد الذكي. يرجى التصرف بناءً على معلوماتك الطبية أو الاتصال بالطوارئ.";
  }
};