import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import { Hymn, HymnRecommendation, BibleCharacterProfile } from "../types";

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

export const generateColoringPage = async (prompt: string): Promise<string> => {
    if (!API_KEY) throw new Error("AI features are disabled. Please configure the API key.");
    const fullPrompt = `Generate a simple, clean, black and white line art coloring book page for a child. The style should be bold outlines, cartoonish, and friendly, with no shading or color. The subject is a Bible story: ${prompt}`;
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: fullPrompt,
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
        console.error("Error generating coloring page:", error);
        throw new Error("Could not generate coloring page.");
    }
};

export const getBibleCharacterInfo = async (characterName: string): Promise<BibleCharacterProfile> => {
    if (!API_KEY) throw new Error("AI features are disabled. Please configure the API key.");

    const imagePromise = ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `A cute, colorful, friendly cartoon illustration of the Bible character ${characterName}. The style should be simple and appealing to young children. Bright colors, full body, no text.`,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '1:1',
        },
    });

    const textPrompt = `You are a friendly storyteller for children under 10. Tell me about the Bible character: "${characterName}".
    Provide a simple summary of who they are in one paragraph.
    Provide a list of 2-3 fun facts or key things they did.
    Provide 2-3 important Bible verses about their story with the reference.
    Make everything very easy for a child to understand.
    Respond ONLY with a valid JSON object matching the specified schema.`;

    const textPromise = ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: textPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: {
                        type: Type.STRING,
                        description: "A simple, one-paragraph, child-friendly summary of the character."
                    },
                    keyFacts: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of 2-3 fun facts or key things the character did, written for a child."
                    },
                    verses: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                reference: { type: Type.STRING, description: "The Bible reference, e.g., '1 Samuel 17:49'." },
                                text: { type: Type.STRING, description: "The text of the Bible verse." },
                            },
                            required: ["reference", "text"],
                        },
                        description: "A list of 2-3 important Bible verses about the character's story."
                    },
                },
                required: ["summary", "keyFacts", "verses"],
            },
        }
    });

    try {
        const [imageResponse, textResponse] = await Promise.all([imagePromise, textPromise]);
        
        if (!imageResponse.generatedImages || imageResponse.generatedImages.length === 0) {
            throw new Error("AI failed to generate an image.");
        }
        const imageUrl = imageResponse.generatedImages[0].image.imageBytes;
        
        const textData = JSON.parse(textResponse.text.trim());

        return {
            name: characterName,
            imageUrl: `data:image/png;base64,${imageUrl}`,
            summary: textData.summary,
            keyFacts: textData.keyFacts,
            verses: textData.verses,
        };
    } catch (error) {
        console.error("Error getting Bible character info:", error);
        throw new Error("Could not find information for that character. Please try another name.");
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

export const generateSermonOutline = async (topic: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled.";
    const prompt = `Generate a three-point sermon outline on the topic "${topic}", in the style of Pastor W.F. Kumuyi. Each point should be alliterated if possible and supported by at least two scripture references. The structure should be clear, logical, and deeply biblical. Format with clear headings for each point.`;
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        return response.text;
    } catch (error) {
        console.error("Error generating sermon outline:", error);
        return "Could not generate an outline at this time.";
    }
};

export const findIllustrations = async (topic: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled.";
    const prompt = `Provide two short, impactful sermon illustrations for the topic "${topic}". One should be a biblical example (not one of the main teaching texts), and the other a relatable modern-day story or analogy. Each illustration should be a concise paragraph.`;
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        return response.text;
    } catch (error) {
        console.error("Error finding illustrations:", error);
        return "Could not find illustrations at this time.";
    }
};

export const suggestScriptures = async (topic: string): Promise<string> => {
    if (!API_KEY) return "AI features are disabled.";
    const prompt = `List 5-7 key scripture cross-references for a sermon on "${topic}". For each reference, provide the verse and a brief one-sentence explanation of its relevance to the topic.`;
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        return response.text;
    } catch (error) {
        console.error("Error suggesting scriptures:", error);
        return "Could not suggest scriptures at this time.";
    }
};