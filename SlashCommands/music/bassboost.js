const { Client, CommandInteraction } = require("discord.js");
const {QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "bassboost",
    description: "Daje bass i to całkiem fajny",
    type: 'CHAT_INPUT',
   
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        if(!queue.getFiltersEnabled().includes("bassboost_high"||"basboost")){
        await queue.setFilters({
            bassboost_high: !queue.getFiltersEnabled().includes("bassboost"),
            normalizer2: !queue.getFiltersEnabled().includes("bassboost") // because we need to toggle it with bass
        });
    }else{
        await queue.setFilters({});
    }
        return void interaction.followUp({ content: `🎵 | Filtr bassboost ${queue.getFiltersEnabled().includes("bassboost_high") ? "włączony ✔" : "wyłączony ❌"}!` })

    },
};