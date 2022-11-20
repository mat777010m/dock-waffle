const { Client, CommandInteraction } = require("discord.js");
const {QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "skip",
    description: "Pomija piosenkę",
    type: 'CHAT_INPUT',
   
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        const currentTrack = queue.current;
        const success = queue.skip();
        return void interaction.followUp({
            content: success ? `✅ | Pomijam **${currentTrack}**!` : "❌ | Houston, mamy problem! Coś poszło nie tak"
        });
    },
};