const { Client, Events, GatewayIntentBits, userMention } = require('discord.js')
const { DiscussServiceClient } = require("@google-ai/generativelanguage")
const { GoogleAuth } = require("google-auth-library")
require("dotenv").config()

const MODEL_NAME = "models/chat-bison-001"
const API_KEY = process.env.API_KEY

const DISCORD_Client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageTyping] })

const PALM_Client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
})

DISCORD_Client.on("messageCreate", async (message) => {
    if (message.author.bot || message.author.id === DISCORD_Client.user.id) return
    if (message.content && message.mentions.users.some((user) => user.username === DISCORD_Client.user.username)) {
        message.channel.sendTyping()
        const response = await BATMAN(message.content)
        message.channel.send(response)
    }
})

const BATMAN = async (prompt) => {
    const result = await PALM_Client.generateMessage({
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
            messages: [{ content: prompt }],
        },
    })

    return result[0].candidates[0].content
}

DISCORD_Client.login(process.env.DISCORD_TOKEN)
