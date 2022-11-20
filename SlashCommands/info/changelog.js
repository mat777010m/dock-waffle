const { Client, CommandInteraction } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "changelog",
    description: "Co nowego w bocie",
    type: 'CHAT_INPUT',

    run: async (client, interaction, args) => {
        return void interaction.followUp({
            embeds: [
                {
                    title: "**Zmiany**",
                    description: "\***Lista zmian:\***" +  "```diff\n" + "---DODANE--- \n+  komendy pod ukośnikiem / \n+ w pełni sprawne filtry muzyczne(np. bassboost, earrape) \n+ lepsze komendy muzyczne (i już nie będzie wywalać) \n+ wiele funkcji przeniesione z bota @toB, a jeszcze więcej dodanych (zmiany możecie mi proponować na priv mat777010m#0926) \n+ bot teraz będzie wykorzystywał uczenie maszynowe do funkcji asystenta głosowego (BETA) \n---USUNIĘTE/NIESPRAWNE---\n- AI i asystent głosowy nie jest jeszcze ogólno dostępny na wszystkie serwery (jak coś to będę mówił, a jak chcesz pomóc go testować (i ci działa) przywołaj go na kanał komendą !join)```",
                    color: 0xFFFFFF
                }
            ]
        });
    },
};