const { REST, Routes } = require('discord.js')


// These will be shown on the Discord app
const commands = [
    {
        name: 'batgif',
        description: 'Fetch a Batman GIF',
        type: 1,
    },
    {
        name:  'batquote',
        description: 'Fetch a Batman quote',
        type: 1,
    }
]


// Register the slash commands
const mountCommands = async (DISCORD_TOKEN, DISCORD_BOT) => {
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

    try {
        console.log('Started refreshing application (/) commands.')

        await rest.put(
            Routes.applicationCommands(DISCORD_BOT.user.id),
            { body: commands },
        )

        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error(error)
    }
}

module.exports = { mountCommands }
