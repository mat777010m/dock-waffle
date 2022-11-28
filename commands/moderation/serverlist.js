const { Message, Client,  PermissionsBitField } = require("discord.js");

module.exports = {
    name: "serverlist",
    aliases: [],
    description: "List",
    args: false,
    guildOnly: false,
    ownerOnly: true,
    usage: "",
    botPermissions: PermissionsBitField.Flags.Administrator,
    userPermissions: PermissionsBitField.Flags.Administrator,
    
     async function(msg, client, args) {
        client.guilds.cache.forEach(guild => {
            msg.author.send(`${guild.name} | ${guild.id}`);
          })
    },
};