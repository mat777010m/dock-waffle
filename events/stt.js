const client = require("../index");
const axios = require('axios')
const googleTTS = require('google-tts-api')
const chalk = require('chalk')
const player = require("./interactionCreate")

//https://www.npmjs.com/package/discord-speech-recognition
//https://stackoverflow.com/questions/68987592/discord-bot-update-how-to-play-audio

const { addSpeechEvent } = require("discord-speech-recognition");
const { joinVoiceChannel, getVoiceConnection, createAudioResource, createAudioPlayer, createReadStream} = require("@discordjs/voice");
const { connection } = require("mongoose");



addSpeechEvent(client, { lang: "en-US" });
const audioplayer = createAudioPlayer();


client.on("speech", async (msg) => {
   if(msg.guild.id != "661616052341309442" || "875693867427561533") return
      //const queue = player.getQueue(msg.guild.id);
     // if (queue || queue.playing) return 

      
      const response = await axios.get(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(msg.content)}&botname=Dock&ownername=mat777010m&user=${msg.author.id}`)
     if(!response.data.message || response.data.message === undefined || response.data.message === "undefined" || msg.content === undefined ||response.data.message.lenght > 200){
      const url = await googleTTS.getAudioUrl("Sorry, i dont understand", {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
      })
      let resource = createAudioResource(url, {
        inlineVolume : true
    });
      msg.connection.subscribe(audioplayer);
      audioplayer.play(resource)
    }else {
      try{
      console.log(chalk.magenta(msg.content) +" | "+ chalk.blue(response.data.message))
        const url = googleTTS.getAudioUrl(response.data.message, {
          lang: 'en',
          slow: false,
          host: 'https://translate.google.com',
        })
        let resource = await createAudioResource(url, {
          inlineVolume : true
      });
      await msg.connection.subscribe(audioplayer);
      audioplayer.play(resource)
    }catch(error){
      const url = await googleTTS.getAudioUrl("It seems to be an error with this", {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
      })
      let resource = createAudioResource(url, {
        inlineVolume : true
    });
      msg.connection.subscribe(audioplayer);
      audioplayer.play(resource)
    }
      }
     
    
    
    
    
    
    /*else{//else if (msg.content.toLowerCase().startsWith("dock" || "dog" || "doc" || "dok" || "tok" || "toc"|| "bot")){
      const res = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(msg.content)}&botname=Dock&ownername=mat777010m&user=${msg.author.id}`, {});
      const response = await res.json();
      console.log(response)
      msg.member.voice.channel.join().then(conn => {
        googleTTS( response.message, "en-US", 1)
          .then((url) => {
            conn.play(url)
          })
          .catch((err) => {
            console.error(err.stack);
          });
      })
    }*/
  });
  //https://www.npmjs.com/package/discord-speech-recognition