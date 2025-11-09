
import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  // In a real app, you'd want to handle this more gracefully,
  // but for this environment, we can throw an error.
  console.error("API_KEY environment variable not set. Please set it in your environment.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const generateImage = async (prompt: string): Promise<string | null> => {
  if (!apiKey) {
    console.error("Cannot generate image without an API key.");
    return Promise.resolve("https://picsum.photos/400/300"); // Return placeholder if no key
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    console.warn("No image data found in Gemini response for prompt:", prompt);
    return null;
  } catch (error) {
    console.error(`Error generating image for prompt "${prompt}":`, error);
    // Fallback to a placeholder image on error
    return "https://picsum.photos/400/300";
  }
};
