const { Client, CommandInteraction } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "help",
    description: "Wyświetla pomoc",
    type: 'CHAT_INPUT',

    run: async (client, interaction, args) => {
        return void interaction.followUp({
            embeds: [
                {
                    title: "**Pomoc**",
                    description: "\***Z ukośnikiem /:\***\n" +  '**MUZYCZNE**\n•`/play` - gra muzykę\n•`/queue` - pokazuję kolejkę\n• `/nowplaying` - pokazuje co jest teraz grane\n• `/loop` -zapętla\n• `/skip` - pomija\n• `/pause` - zatrzymuje\n• `/resume` - wznawia\n• `/clearqueue` - czyści kolejkę\n•Filtry `/bassboost`, `/earrape`, `/kakaoke`, `/nightcore`\n**INNE**\n• `/changelog` - pokazuję listę zmian \n `/ping` - wyświetla ping\n ' + "\***Z wykrzyknikiem !\***\n" + '• `!join` - dołącza jako *asystent głosowy* (**BETA**). Na razie ograniczona liczba serwerów. W przyszłości będzie przniesione na komendy z ukośnikiem. W tym momencie jest tylko w języku angielskim, bo polska język trudna język',
                    color: 0xFFFFFF
                }
            ]
        });
    },
};