const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Link do dodania bota na serwer",
    type: 'CHAT_INPUT',

    run: async (client, interaction, args) => {
        return void interaction.followUp({
            embeds: [
                {
                    title: "**Link do dodania na Twój serwer**",
                    description: "[**Kliknij tutaj**, aby zaprosić Docka na **Twój serwer**.](https://discord.com/api/oauth2/authorize?client_id=910106473323974687&permissions=8&scope=bot%20applications.commands) Bot ułatwia rzeczy związanye z moderacją i zawiera muzykę (której już nie ma w innych znanych botach). Dodatkowo botem będzie można sterować głosowo. W razie potrzeby skontaktuj się z właścicielem (mat777010m#0926)",
                    color: "#71308d"
                }
            ]
        });
    },
};