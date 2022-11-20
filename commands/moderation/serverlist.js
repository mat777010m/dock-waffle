const { Message, Client,  Permissions: {FLAGS} } = require("discord.js");

module.exports = {
    name: "serverlist",
    aliases: [],
    description: "List",
    args: false,
    guildOnly: false,
    ownerOnly: true,
    usage: "",
    botPermissions: [FLAGS.ADMINISTRATOR],
    userPermissions: [FLAGS.MANAGE_MESSAGES],
    
     async function(msg, client, args) {
        client.guilds.cache.forEach(guild => {
            msg.author.send(`${guild.name} | ${guild.id}`);
          })
    },
};