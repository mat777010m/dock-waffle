const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Pokazuje koljkę",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "page",
            description: "Strona kolejki",
            type: "STRING",
            required: false,
        },
    ],
    run: async (client, interaction, args, player) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        if (!interaction.options.page) interaction.options.page = 1;
        const pageStart = 10 * (interaction.options.page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `- ${i + pageStart + 1}. ${m.title} `;
        });

        return void interaction.followUp({
            /*embeds: [
                {
                    title: 'Server Queue',
                    description: `${tracks.join('\n')}${
                        queue.tracks.length > pageEnd
                            ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                            : ''
                    }`,
                    color: 0xff0000,
                    fields: [{ name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
                }
            ]*/


            content: "```diff\n"+`- PLAYLISTA SERWERA - ${interaction.guild.name} 🔁 ${player.getQueue(interaction.guildId).loopMode ? '(zapętlone)' : ''} strona ${interaction.options.page}/${pageStart + 1}
            \n Teraz grane: ${queue.current.title} | ${queue.current.author} \n` + `${tracks.join('\n')}${
                queue.tracks.length > pageEnd
                    ? `\n...${queue.tracks.length - pageEnd} innych piosenek(s)`
                    : ''
            }` +
            `\n\n${queue.tracks.length > 5 ? `Jest ogólnie ${queue.tracks.length - 5} piosenek...` : `W playliście są ogólnie ${queue.tracks.length} piosenki...`}`+ "```"

        });
    },
};