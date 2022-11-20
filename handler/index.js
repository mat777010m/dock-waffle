const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const ascii = require("ascii-table")
const chalk = require("chalk");

const globPromise = promisify(glob);

const table = new ascii().setHeading("Command", "Load status")
const slashTable = new ascii().setHeading("Slash command", "Load status")

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];
        const commandName = splitted[splitted.length - 1];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
            table.addRow(commandName, "✅")
        } else {
            table.addRow(commandName, "❌  -> missing 'name'!")
          }
    });
    console.log(table.toString())
    console.log(chalk.magenta("-------------------------------------"))

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        const slashCommandName = value.split("/")[value.split("/").length - 1]
        if (!file?.name) return slashTable.addRow(slashCommandName, "❌  -> missing 'name'!");
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
        slashTable.addRow(slashCommandName, "✅")
    });
    console.log(slashTable.toString())
    client.on("ready", async () => {
        // Register for a single guild
        await client.guilds.cache
            .get("661616052341309442")//laki games
            .commands.set(arrayOfSlashCommands);
        await client.guilds.cache
            .get("763759118669840404")//9a JD
            .commands.set(arrayOfSlashCommands);
        await client.guilds.cache
            .get("858075450759970816")//Szescienna
            .commands.set(arrayOfSlashCommands);
        await client.guilds.cache
            .get("875693867427561533")//Szescienna
            .commands.set(arrayOfSlashCommands);
            await client.guilds.cache
            .get("1043889319414345729")//Dock serwer
            .commands.set(arrayOfSlashCommands);

        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands);
    });

    // mongoose
    const { mongooseConnectionString } = require('../config.json')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));
};