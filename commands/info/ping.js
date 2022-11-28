const { Message, Client,  PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    description: "Send custom embed messages.",
    args: false,
    guildOnly: false,
    usage: "",
    botPermissions: PermissionsBitField.Flags.MenageMessages,
    userPermissions: PermissionsBitField.Flags.MenageMessages,
    /**
     *
     * @param {Client} client
     * @param {Message} msg
     * @param {String[]} args
     */
     async function(msg, client, args) {
        msg.channel.send(`${client.ws.ping} ws ping`);
    },
};