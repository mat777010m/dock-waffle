const { Client, CommandInteraction } = require("discord.js");
const {QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "pause",
    description: "Zatrzymuje muzykę",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        const paused = queue.setPaused(true);
        return void interaction.followUp({ content: paused ? "⏸ | Zatrzymano:" : "❌ | Houston, mamy problem! Coś poszło nie tak" });

    },
};