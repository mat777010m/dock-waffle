const { Client, CommandInteraction } = require("discord.js");
const {QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "resume",
    description: "Wyłącz zatrzymanie piosenki",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const paused = queue.setPaused(false);
        return void interaction.followUp({ content: !paused ? "❌ | Something went wrong!" : "▶ | Resumed!" });

    },
};