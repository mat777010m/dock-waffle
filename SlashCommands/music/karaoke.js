const { Client, CommandInteraction } = require("discord.js");
const {QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "kakaoke",
    description: "Filter karaoke",
    type: 'CHAT_INPUT',
   
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        await queue.setFilters({
            kakaoke: !queue.getFiltersEnabled().includes("kakaoke"),
        });

        return void interaction.followUp({ content: `🎵 | Filtr kakaoke ${queue.getFiltersEnabled().includes("kakaoke") ? "włączony" : "wyłączony"}!` })

    },
};