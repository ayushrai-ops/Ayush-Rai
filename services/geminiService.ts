import { GoogleGenAI, Type } from "@google/genai";
import { CelebrationConfig } from "../types";

// Initialize Gemini
// Note: In a real deployment, this key should be in process.env
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateDateIdea = async (partnerName: string): Promise<CelebrationConfig> => {
    if (!apiKey) {
        // Fallback if no API key is provided
        return {
            message: `Yay! I can't wait to go out with you, ${partnerName}! ❤️`,
            dateIdea: "Let's go get some delicious ramen followed by your favorite ice cream!"
        };
    }

    try {
        const prompt = `
            My girlfriend ${partnerName} just agreed to go on a date with me via a web app.
            Generate a short, very romantic and excited confirmation message, 
            and a specific, cute date idea that specifically involves going out for ramen and ice cream.
            Keep it wholesome and adorable.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        message: {
                            type: Type.STRING,
                            description: "A short, excited romantic message celebrating her saying yes."
                        },
                        dateIdea: {
                            type: Type.STRING,
                            description: "A creative, cute date idea involving ramen and ice cream."
                        }
                    },
                    required: ["message", "dateIdea"]
                }
            }
        });

        // Ensure we handle the potentially undefined response text
        const responseText = response.text;
        if (!responseText) {
             throw new Error("Empty response from Gemini");
        }

        return JSON.parse(responseText) as CelebrationConfig;
    } catch (error) {
        console.error("Error generating date idea:", error);
        return {
            message: `You made me the happiest person alive, ${partnerName}! ❤️`,
            dateIdea: "Ramen date followed by ice cream it is!"
        };
    }
};