const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "earrape",
    description: "Filtr earrape",
    type: 'CHAT_INPUT',
   
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        await queue.setFilters({
            earrape: !queue.getFiltersEnabled().includes("earrape"),
        });

        return void interaction.followUp({ content: `🎵 | Filtr earrape ${queue.getFiltersEnabled().includes("earrape") ? "włączony ✔" : "wyłączony ❌"}!` })

    },
};