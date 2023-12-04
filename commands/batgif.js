const { SlashCommandBuilder } = require("discord.js")
require("dotenv").config()

module.exports = {
  batgif: async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'batgif') {
      try {
        var random = Math.floor(Math.random() * 50);
        const response = await fetch(process.env.GIPHY_API);
        const gifs = await response.json()
        await interaction.reply(gifs.data[random].url)
      } catch (error) {
        await interaction.reply('Something isn\'t working with my bat wifi...');
      }
    }
  }
}