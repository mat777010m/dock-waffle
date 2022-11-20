const { Client, CommandInteraction } = require("discord.js");
const {QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "loop",
    description: "Zapętlanie",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "mode",
                        type: "INTEGER",
                        description: "Loop type",
                        required: true,
                        choices: [
                            {
                                name: "Off",
                                value: QueueRepeatMode.OFF
                            },
                            {
                                name: "Track",
                                value: QueueRepeatMode.TRACK
                            },
                            {
                                name: "Queue",
                                value: QueueRepeatMode.QUEUE
                            },
                            {
                                name: "Autoplay",
                                value: QueueRepeatMode.AUTOPLAY
                            }
                        ]
        },
    ],
    run: async (client, interaction, args, player) => {
       
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | Ale tutaj cicho, może najpierw puść muzykę ╰（‵□′）╯" });
        const loopMode = interaction.options.get("mode").value;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
        return void interaction.followUp({ content: success ? `${mode} | Zmienio tryb zapętlania` : "❌ | Nie można zmienić trybu zapętlania :(" });

    },
};