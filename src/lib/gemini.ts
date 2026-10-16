import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

export interface TranslationInput {
  text: string;
  sourceLang: Language;
  targetLang: Language;
}

export async function translateTextWithGemini(
  text: string,
  sourceLang: Language,
  targetLangs: Language[]
): Promise<Partial<Record<Language, string>>> {
  if (!text || text.trim() === '') return {};

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');
  
  const langNames: Record<Language, string> = {
    mr: 'Marathi (मराठी)',
    hi: 'Hindi (हिंदी)',
    en: 'English'
  };

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert translator specializing in medical science and everyday human body terminology.
Translate the following ${langNames[sourceLang]} text into ${targetLangs.map(l => langNames[l]).join(' and ')}.
Keep tone friendly, calm, factual, and natural in Devanagari script for Marathi and Hindi.

Text to translate:
"""
${text}
"""

Return strictly a JSON object where keys are the language codes (${targetLangs.map(l => `"${l}"`).join(', ')}) and values are the translated strings. Do not include markdown code fence formatting or other text.`;

      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = res.text?.trim() || '';
      try {
        const parsed = JSON.parse(responseText);
        return parsed;
      } catch {
        // Remove markdown backticks if any
        const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
      }
    } catch (err) {
      console.warn('Gemini translation API call failed or timed out, using fallback translation:', err);
    }
  }

  // Graceful offline fallback if Gemini API key is missing or call fails
  const results: Partial<Record<Language, string>> = {};
  for (const target of targetLangs) {
    if (target === sourceLang) {
      results[target] = text;
    } else {
      // Provide a clean placeholder note indicating translation
      if (target === 'mr') {
        results[target] = `[मराठी अनुवाद] ${text}`;
      } else if (target === 'hi') {
        results[target] = `[हिंदी अनुवाद] ${text}`;
      } else {
        results[target] = `[English translation] ${text}`;
      }
    }
  }
  return results;
}
