const { Message, Client,  Permissions: {FLAGS} } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    description: "Send custom embed messages.",
    args: false,
    guildOnly: false,
    usage: "",
    botPermissions: [FLAGS.ADMINISTRATOR],
    userPermissions: [FLAGS.MANAGE_MESSAGES],
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