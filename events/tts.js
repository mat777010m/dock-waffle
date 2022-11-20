const client = require("../index");
const request = require("request");
const crypto = require("crypto");
const fs = require("fs");
const { addSpeechEvent } = require("discord-speech-recognition");
const { joinVoiceChannel } = require("@discordjs/voice");

addSpeechEvent(client, { lang: "pl-PL" });
//https://github.com/lohith8776/Discord-voice-assistant/blob/main/index.js

const vocodesVoices = {
	altman: "sam-altman",
	arnold: "arnold-schwarzenegger",
	attenborough: "david-attenborough",
	ayoade: "richard-ayoade",
	barker: "bob-barker",
	bart: "bart-simpson",
	bill: "bill-clinton",
	boss: "the-boss",
	brimley: "wilford-brimley",
	broomstick: "boomstick",
	bush: "george-w-bush",
	carter: "jimmy-carter",
	cooper: "anderson-cooper",
	cramer: "jim-cramer",
	cranston: "bryan-cranston",
	cross: "david-cross",
	darth: "darth-vader",
	deen: "paula-deen",
	degrasse: "neil-degrasse-tyson",
	dench: "judi-dench",
	devito: "danny-devito",
	ferguson: "craig-ferguson",
	gates: "bill-gates",
	gottfried: "gilbert-gottfried",
	graham: "paul-graham",
	hillary: "hillary-clinton",
	homer: "homer-simpson",
	jones: "james-earl-jones",
	keeper: "crypt-keeper",
	king: "larry-king",
	krabs: "mr-krabs",
	lee: "christopher-lee",
	lisa: "lisa-simpson",
	luckey: "palmer-luckey",
	mcconnell: "mitch-mcconnell",
	nimoy: "leonard-nimoy",
	nixon: "richard-nixon",
	nye: "bill-nye",
	obama: "barack-obama",
	oliver: "john-oliver",
	palin: "sarah-palin",
	penguinz0: "moistcr1tikal",
	phil: "dr-phil-mcgraw",
	reagan: "ronald-reagan",
	rickman: "alan-rickman",
	rogers: "fred-rogers",
	rosen: "michael-rosen",
	saruman: "saruman",
	scout: "scout",
	shapiro: "ben-shapiro",
	shohreh: "shohreh-aghdashloo",
	simmons: "j-k-simmons",
	snake: "solid-snake",
	snape: "severus-snape",
	sonic: "sonic",
	spongebob: "spongebob-squarepants",
	squidward: "squidward",
	stein: "ben-stein",
	takei: "george-takei",
	thiel: "peter-thiel",
	trevor: "trevor-philips",
	trump: "donald-trump",
	tucker: "tucker-carlson",
	tupac: "tupac-shakur",
	vegeta: "vegeta",
	white: "betty-white",
	wiseau: "tommy-wiseau",
	wizard: "wizard",
	yugi: "yami-yugi",
	zuckerberg: "mark-zuckerberg"
};

function speak(message, utterance, params) {
	if (utterance) {
		console.log("Playing " + utterance + "!");
		// Generate random temporary filename to avoid overwriting other speech recordings
		const fileName = crypto.randomBytes(48).toString("hex") + ".wav";
		request.post(params, function(error, response, body) {
			if (error) {
				console.error(error);
				// Delete temporary file upon error
				fs.unlinkSync(fileName);
			} else if (response.statusCode !== 200) {
				// Send error description to user
				message.channel.send(body)
				// Delete temporary file upon error
				fs.unlinkSync(fileName);
			} else {
				const voiceChannel = message.member?.voice.channel;
				const connection = message.guild && message.guild.voice && message.guild.voice.connection;
				if (connection) {
					connection.play(fs.createReadStream(fileName)).on("speaking", function(speaking) {
						// Delete file when speaking has finished
						if (!speaking) {
							fs.unlinkSync(fileName);
						}
					}).on("error", console.error);
				} else {
					message.channel.send({
						files: [{
							attachment: fileName,
							name: utterance.replace(/[^a-z0-9]/gi, "_") + ".wav"
						}]
					}).then(function() {
						// Delete temporary file after sending
						fs.unlinkSync(fileName);
					})
				}
			}
		}).pipe(fs.createWriteStream(fileName));
	} else {
		message.channel.send("Give me something to say!")
	}
}

client.on("messageCreate", function(message) {
	if (message.author.bot) return;
	const content = message.content.toLowerCase();
	if (content.startsWith("tts_")) {
		const trimmedContent = content.slice(4);
		switch (trimmedContent) {
		case "join":
			if (!message.guild) {
				message.channel.send("This command only works on servers!")
			} else if (message.member.voice && message.member.voice.channel) {
				const voiceChannel = message.member?.voice.channel;
				joinVoiceChannel({
					channelId: voiceChannel.id,
					guildId: voiceChannel.guild.id,
					adapterCreator: voiceChannel.guild.voiceAdapterCreator,
					selfDeaf: false,
				  })
			} else {
				message.channel.send("Join a voice channel first!")
			}
			break;
		case "leave":
			const connection = message.guild && message.guild.voice && message.guild.voice.connection;
			if (connection) {
				connection.disconnect();
				//updateStatus();
			}
			break;
		default:
			const command = trimmedContent.split(" ")[0];
			const utterance = message.content.slice(4 + command.length).trim();
			const vocodeVoice = vocodesVoices[command];
			if (vocodeVoice) {
				speak(message, utterance, {
					url: "https://mumble.stream/speak",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						speaker: vocodeVoice,
						text: utterance
					})
				});
			} else {
				message.channel.send("No voice named " + command + "!")
			}
		}
	}
});
