const { Client, CommandInteraction } = require("discord.js");
const {QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "nightcore",
    description: "FIltr nightcore",
    type: 'CHAT_INPUT',
   
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        await queue.setFilters({
            nightcore: !queue.getFiltersEnabled().includes("nightcore"),   
        });

        return void interaction.followUp({ content: `🎵 | Filtr nightcore ${queue.getFiltersEnabled().includes("nightcore") ? "włączony ✔" : "wyłączony ❌"}!` })

    },
};