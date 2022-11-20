const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");
module.exports = {
    name: "join",
    aliases: ['j'],
    description: "Join vc.",
    args: false,
    guildOnly: true,
    usage: "",
    /**
     *
     * @param {Client} client
     * @param {Message} msg
     * @param {String[]} args
     */
     async function(msg, client, args) {
        const voiceChannel = msg.member?.voice.channel;
        
        if(msg.guildId === "661616052341309442" ||"763759118669840404" || "875693867427561533"){

        if (voiceChannel) {
          joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            selfDeaf: false,
          });
        }else{
          msg.channel.send("Dołącz do kanału!")
        }
      }else return msg.channel.send({ embeds: [
        {
            title: "**Nie możesz użyć tego polecenia!**",
            description: "Ta funkcja jest w wersji **BETA** ograniczonej na kilka serwerów. Jeżeli chcesz pomóc testować nowe funkcje na swoim serwerze i otrzymać je przedwcześnie, pisz do mnie (mat777010m#0926)",
            color: "00000"
        }
    ]})
    },
};