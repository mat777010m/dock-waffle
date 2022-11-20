const client = require("../index");


client.on("ready", () =>{
    client.guilds.cache.forEach(guild => {
        console.log(`${guild.name} | ${guild.id}`);
      })
      console.log(" ")
    console.log(`${client.user.tag} jest gotowy na lot!`)
    client.user.setActivity({
        name: "lądowanie rakiety",
        type: "WATCHING"
    });
}
);
client.on("error", console.error);
client.on("warn", console.warn);