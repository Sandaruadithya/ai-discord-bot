const { SlashCommandBuilder } = require("discord.js")
require("dotenv").config()

module.exports = {
    batgif: async (interaction) => {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === 'batgif') {
            try {
                // Fetch gif from giphy and send to chat
                var random = Math.floor(Math.random() * 50);
                const response = await fetch(process.env.GIPHY_API_KEY);
                const gifs = await response.json()
                await interaction.reply(gifs.data[random].url)
            } catch (error) {
                await interaction.reply('The Joker! He has hacked my GIF signal!');
            }
        }
    }
}