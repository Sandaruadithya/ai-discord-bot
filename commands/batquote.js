const { SlashCommandBuilder } = require("discord.js")
require("dotenv").config()


// Wasn't able to find a Batman quote api so here we are
const quotes = [
    "\"That Mask, It’s Not To Hide Who I Am, But To Create What I Am.\"",
    "\"The Idea Was To Be A Symbol. Batman Could Be Anybody, That Was The Point.\"",
    "\"Maybe That's What Batman Is About. Not Winning. But Failing, And Getting Back Up.\"",
    "\"Bullets Don't Harm Me. Nothing Harms Me. But I Know Pain.\"",
    "\"No Miracles. No Mercy. No Redemption. No Heaven. No Hell.\"",
    "\"You Either Die A Hero Or You Live Long Enough To See Yourself Become The Villain.\"",
    "\"Death Is Powerless Against You If You Leave A Legacy Of Good Behind.\"",
    "\"It’s Not Who I Am Underneath, But What I Do That Defines Me.\"",
    "\"Sometimes It's Only Madness That Makes Us What We Are.\"",
    "\"When That Light Hits The Sky, It’s Not Just A Call. It’s A Warning.\"",
    "\"I Am Vengeance. I Am The Night. I Am Batman!\"",
    "\"The World Only Makes Sense If You Force It To.\"",
    "\"Vengeance Won't Change The Past. I Have To Become More\"",
]


// Randomize and send a quote
module.exports = {
    batquote: async (interaction) => {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === 'batquote') {
            try {
                var random = Math.floor(Math.random() * 13);
                await interaction.reply(quotes[random])
            } catch (error) {
                await interaction.reply('The Joker! He has hacked my quote signal!');
            }
        }
    }
}
