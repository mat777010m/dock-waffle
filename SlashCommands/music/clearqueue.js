const { Client, CommandInteraction } = require("discord.js");
const {QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "clearqueue",
    description: "Czyści kolejkę",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        queue.destroy();
        return void interaction.followUp({ content: "🧹 | Kolejka wyczyszczona" });

    },
};