const client = require("../index");
const { Player } = require("discord-player");

const player = new Player(client, {ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
    dlChunkSize: 0,
},});
player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Gram teraz **${track.title}**!`))


client.on("interactionCreate", async (interaction) => {
    if(!interaction.guild) return
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "👨‍🚀Houston, mamy problem z tym poleceniem!" });

        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

       try{ cmd.run(client, interaction, args, player);}catch(error){console.log(error); return interaction.followUp({content: `Wystąpił błąd: \`${error}\``})}
    }
    if(!interaction.guild) return null
    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction, player);
    }
});