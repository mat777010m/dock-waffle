const client = require("../index");


client.on("messageCreate", async (msg) => {
    const {author, guild, channel} = msg  
    if (author.bot || !msg.content.toLowerCase().startsWith(client.config.prefix)) return;

    const args = msg.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g)
////////aliasy//////
    //const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    const cmdName = args.shift().toLowerCase()
    const cmd = client.commands.get(cmdName)||
          client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(cmdName))

    if (!cmd) return;
///////DMs//////
if(cmd.guildOnly && !guild) return
if(guild){
    ////////// Check bot permissions////////////
  if (cmd.botPermissions && cmd.botPermissions.length) {
    if (!guild.me.permissionsIn(channel).has(cmd.botPermissions)) {
      return channel.send(
        `Nie mam uprawnień, aby wykonać tą misję. Muszę mieć uprawnienie: \`${cmd.botPermissions.join(
          "`,`",
        )}\``,
      )
    }
  }
 ///////////Check user perm////////////////
 if (cmd.userPermissions && cmd.userPermissions.length) {
    if (!msg.member.permissionsIn(channel).has(cmd.userPermissions) && !author.id === OWNER) {
      return msg.reply("Nie masz uprawnień by wykonać tą misję :sadge:")
    }
  }
}
//////////////OWNER////////////
if (cmd.ownerOnly) {
    if (author.id !== client.config.owner) {
      return msg.reply("Tylko dowódca (mat777010m#0926) może używać tej komendy")
    }
  }
 //////////args//////////
 if(cmd.args && !args.length){
    let reply = `🚀BZZ....Zbyt mało informacji. Proszę o podanie wszystkich potrzebnych informacji ${msg.author} !`
    if(cmd.usage){
      reply += ` Użyj: \`${PREFIX}${cmdName} ${cmd.usage}\``
    msg.react("❌");return msg.channel.send(reply)
    }
  }
  try{
    cmd.function(msg, client, args)
  }catch(error){
    msg.react("❌")
    msg.reply("👨‍🚀Houston, mamy problem " + `\`${error}\``)
     return console.log(error)  
  }
   /*try { 
       await command.run(client, msg, args);
    }catch(error){
        console.log(error);
    }*/
});