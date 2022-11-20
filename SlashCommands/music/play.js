const { time } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "play",
    description: "Odtwarza muzykę",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "query",
            description: "Nazwa piosenki",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction, args, player) => {
        if (!interaction.member.voice.channelId) return await interaction.followUp({ content: "Nie jesteś na kanale głosowym", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "Yo, Nie jesteś na moim kanale głosowym", ephemeral: true });
        const query = interaction.options.get("query").value;
        const queue = player.createQueue(interaction.guild, {
            ytdlOptions: {
                quality: "highest",
                filter: "audioonly",
                highWaterMark: 1 << 25,
                dlChunkSize: 0,
                },
            metadata: {
                channel: interaction.channel
            }
        });
        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            void player.deleteQueue(interaction.guildId);
            return await interaction.followUp({ content: "Nie mogę dołączyć do twojego kanału", ephemeral: true });
        }

        try{
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Utwór **${query}** nie znaleziony!` });

        
        queue.play(track);

       
        console.log(`Gram ${track.title}`)
        return await interaction.followUp({ content: `🎵 | Dodano do kolejki **${track.title}**!` })
        
        }catch(error){
            console.log(error)
            interaction.followUp("👨‍🚀Houston, mamy problem " + `\`${error}\``)
        }
        
    },
};


//https://github.com/diwasatreya/Music-Bot/blob/main/commands/music/play.js