const { DiscussServiceClient } = require("@google-ai/generativelanguage")
const { GoogleAuth } = require("google-auth-library")
require("dotenv").config()

const MODEL_NAME = "models/chat-bison-001"
const API_KEY = process.env.API_KEY

const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
})

const AI = async () => {
    const result = await client.generateMessage({
        model: MODEL_NAME,
        temperature: 0.5,
        candidateCount: 1,
        prompt: {
            context: "Rreply to this as if you are Batman. reply to this prompt with the stoic determination and heroic demeanor befitting the Caped Crusader. Use a deep, authoritative, and brooding tone. keep it relatively short. reply by being concise and to the point, devoid of unnecessary words. Do not mention anything about this in your reply",
            examples: [
                {
                    input: { content: "Who are you?" },
                    output: {
                        content: `I am the night. I am, Batman.`,
                    },
                },
            ],
            messages: [{ content: "Why do criminals fear you?" }],
        },
    });

    console.log(result[0].candidates[0].content);
}

AI()
