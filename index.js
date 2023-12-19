const { Client, Events, GatewayIntentBits, userMention, REST, Routes } = require('discord.js')
const { DiscussServiceClient } = require("@google-ai/generativelanguage")
const { mountCommands } = require("./commands/mountCommands")
const { promptBatman } = require("./utils/promptBatman")
const { GoogleAuth } = require("google-auth-library")
const { batquote } = require("./commands/batquote")
const { batgif } = require("./commands/batgif")
require("dotenv").config()


// Declare environment variables
const PALM_AI_API_KEY = process.env.PALM_AI_API_KEY
const DISCORD_TOKEN = process.env.DISCORD_TOKEN


// Create Discord and Palm AI clients
const DISCORD_BOT = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageTyping] })
const PALM_AI = new DiscussServiceClient({ authClient: new GoogleAuth().fromAPIKey(PALM_AI_API_KEY) })


// Login to discord and register the slash commands
DISCORD_BOT.login(DISCORD_TOKEN)
DISCORD_BOT.once('ready', () =>  mountCommands(DISCORD_TOKEN, DISCORD_BOT))


// Slash commands
DISCORD_BOT.on('interactionCreate', batgif)
DISCORD_BOT.on('interactionCreate', batquote)


// Main chat logic
DISCORD_BOT.on("messageCreate", async (message) => {
    if (message.author.bot || message.author.id === DISCORD_BOT.user.id) return
    if (message.content && message.mentions.users.some((user) => user.username === DISCORD_BOT.user.username)) {
        try {
            message.channel.sendTyping()
            const response = await promptBatman(message.content, PALM_AI)
            message.channel.send(`<@${message.author.id}> ${response}`)
        } catch (error) {
            await message.channel.send("🦇");
        }
    }
})



