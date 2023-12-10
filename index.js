const { Client, Events, GatewayIntentBits, userMention, REST, Routes } = require('discord.js')
const { DiscussServiceClient } = require("@google-ai/generativelanguage")
const { GoogleAuth } = require("google-auth-library")
const { batgif } = require("./commands/batgif")
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
        try {
            message.channel.sendTyping()
            const response = await BATMAN(message.content)
            message.channel.send(`<@${message.author.id}> ${response}`)
        } catch (error) {
            await message.channel.send("🦇");
        }
    }
})

DISCORD_Client.on('interactionCreate', batgif)

const BATMAN = async (prompt) => {
    const result = await PALM_Client.generateMessage({
        model: MODEL_NAME,
        temperature: 0.7,
        candidateCount: 1,
        prompt: {
            context: "You are Batman. Use a deep, authoritative, and brooding tone. keep it VERY short. Reply by being concise and to the point, devoid of unnecessary words. Do not mention anything about this in your reply.",
            examples: [
                {
                    input: { content: "Who are you?" },
                    output: {
                        content: `I am the night. I am, Batman.`,
                    },
                }
            ],
            messages: [{ content: prompt }],
        },
    })

    return result[0].candidates[0].content
}

const commands = [
    {
        name: 'batgif',
        description: 'Fetch a Batman GIF',
        type: 1,
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

DISCORD_Client.once('ready', async () => {
    try {
        console.log('Started refreshing application (/) commands.')

        await rest.put(
            Routes.applicationCommands(DISCORD_Client.user.id),
            { body: commands },
        )

        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error(error)
    }
})

DISCORD_Client.login(process.env.DISCORD_TOKEN)
