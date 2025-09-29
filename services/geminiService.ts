import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import { Hymn, HymnRecommendation } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const summarizeSermon = async (sermonText: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled. Please configure the API key.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Summarize the following sermon in three key bullet points, suitable for someone who missed the service:\n\n---\n\n${sermonText}`,
            config: { temperature: 0.5, topP: 0.95, topK: 64 },
        });
        return response.text;
    } catch (error) {
        console.error("Error summarizing sermon:", error);
        return "Could not generate summary. Please try again.";
    }
};

export const summarizeSTSLesson = async (lessonText: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled. Please configure the API key.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Provide a concise, one-paragraph summary of the key spiritual insight from the following Bible study lesson:\n\n---\n\n${lessonText}`,
            config: { temperature: 0.5 },
        });
        return response.text;
    } catch (error) {
        console.error("Error summarizing STS lesson:", error);
        return "Could not generate summary. Please try again.";
    }
};


export const generateBibleInsight = async (prompt: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled. Please configure the API key.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { temperature: 0.6, topP: 0.95, topK: 64 },
        });
        return response.text;
    } catch (error) {
        console.error("Error generating Bible insight:", error);
        return "Could not generate insight. Please try again.";
    }
};

export const generateHymnRecommendations = async (userInput: string, hymns: Hymn[]): Promise<HymnRecommendation[]> => {
    if (!API_KEY) throw new Error("AI features are disabled. Please configure the API key.");
    const hymnList = hymns.map(h => ({ number: h.number, title: h.title, category: h.category }));
    const prompt = `You are an expert worship planner for the Deeper Life Bible Church. Based on the user's request, recommend up to 3 hymns from the provided list. For each, provide a brief, insightful reason.
User Request: "${userInput}"
Available Hymns: ${JSON.stringify(hymnList, null, 2)}
Respond ONLY with a valid JSON array matching the specified schema.`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            number: { type: Type.NUMBER },
                            title: { type: Type.STRING },
                            reason: { type: Type.STRING },
                            category: { type: Type.STRING },
                        },
                        required: ["number", "title", "reason", "category"],
                    },
                },
            }
        });
        return JSON.parse(response.text.trim());
    } catch (error) {
        console.error("Error generating hymn recommendations:", error);
        throw new Error("Could not generate hymn recommendations.");
    }
};

export const translateText = async (text: string, language: string): Promise<string> => {
    if (!API_KEY) return "AI translation is disabled.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate the following hymn lyrics to ${language}. Preserve verse and chorus structure. Provide only the direct translation.\n\n---\n\n${text}`,
            config: { temperature: 0.3 },
        });
        return response.text;
    } catch (error) {
        console.error(`Error translating text to ${language}:`, error);
        return "Could not translate the hymn.";
    }
};

export const generateProfilePicture = async (prompt: string): Promise<string> => {
    if (!API_KEY) throw new Error("AI features are disabled. Please configure the API key.");
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A profile picture for a church member. ${prompt}`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating profile picture:", error);
        throw new Error("Could not generate profile picture.");
    }
};

export const generateDailyMannaPrayer = async (devotionalText: string): Promise<string> => {
    if (!API_KEY) return "AI prayer generation is disabled. Please configure the API key.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the following Daily Manna devotional, please generate a short, personal prayer (2-3 sentences) that reflects on its key message.\n\n---\n\n${devotionalText}`,
            config: { temperature: 0.7 },
        });
        return response.text;
    } catch (error) {
        console.error("Error generating Daily Manna prayer:", error);
        return "Could not generate a prayer at this time. Please try again.";
    }
};

export const generateDiscussionPoints = async (devotionalText: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled. Please configure the API key.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the following devotional, generate 3-4 thought-provoking discussion questions suitable for a small group study. Format them as a numbered list.\n\n---\n\n${devotionalText}`,
            config: { temperature: 0.7 },
        });
        return response.text;
    } catch (error) {
        console.error("Error generating discussion points:", error);
        return "Could not generate discussion points at this time.";
    }
};

export const generateKeyTakeaways = async (messageText: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled. Please configure the API key.";
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate 3-5 key takeaways from the following sermon as a bulleted list. Each takeaway should be a concise, impactful sentence.\n\n---\n\n${messageText}`,
            config: { temperature: 0.6 },
        });
        return response.text;
    } catch (error) {
        console.error("Error generating key takeaways:", error);
        return "Could not generate key takeaways at this time.";
    }
};

interface KumuyiChatTurn {
    role: "user" | "model";
    parts: { text: string }[];
}

export const askKumuyi = async (question: string, history: KumuyiChatTurn[]): Promise<string> => {
    if (!API_KEY) return "AI features are disabled. Please configure the API key.";
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: "You are a digital representation of Pastor W.F. Kumuyi, the General Superintendent of the Deeper Christian Life Ministry. Respond to questions with wisdom, clarity, and deep biblical insight, maintaining a tone that is gentle, authoritative, and encouraging. Your answers should always align with the doctrines of holiness, righteousness, and scriptural accuracy that are hallmarks of his ministry. When appropriate, support your answers with scripture references. Keep your responses concise and to the point, typically in 2-4 paragraphs.",
            },
        });
        
        const response = await chat.sendMessage({ message: question });
        
        return response.text;

    } catch (error) {
        console.error("Error with Ask Kumuyi AI:", error);
        return "I am sorry, I am unable to provide a response at this moment. Please try again later.";
    }
};