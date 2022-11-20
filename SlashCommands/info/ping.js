const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Zwraca ping sieci",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, player) => {
       // interaction.followUp({ content: `${client.ws.ping}ms!` });
       const queue = player.getQueue(interaction.guild);

        return void interaction.followUp({
            embeds: [
                {
                    title: "⏱️ | Opóźnienie",
                    fields: [
                        { name: "Ping bota", value: `\`${Math.round(client.ws.ping)}ms\`` },
                        { name: "Opóźnienie pakietów głosowych", value: !queue ? "N/A" : `UDP: \`${queue.connection.voiceConnection.ping.udp ?? "N/A"}\`ms\nWebSocket: \`${queue.connection.voiceConnection.ping.ws ?? "N/A"}\`ms` }
                    ],
                    color: 0xFFFFFF
                }
            ]
        });
    },
};