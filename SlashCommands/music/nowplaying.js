const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "nowplaying",
    description: "Pokazuje co jest teraz grane",
    type: 'CHAT_INPUT',
    
    run: async (client, interaction, args, player) => {
        
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void interaction.followUp({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress
                        },
                        {
                            name: "Filtry: ",
                            value: queue.getFiltersEnabled() ? "Nie ma aktywnych filtrów" : queue.getFiltersEnabled.toString()
                        }
                    ],
                    color: 0xffffff
                }
            ]
        });

    },
};