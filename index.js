const { Client, Collection } = require("discord.js");
require('dotenv').config()
//const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
//const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
//const GUILD_ID = process.env.GUILD_ID 

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
client.setMaxListeners(3);
//process.setMaxListeners(3);
//require('events').EventEmitter.defaultMaxListeners = Infinity;

// Initializing the project
require("./handler")(client);


client.login(TOKEN);//login TOKEN