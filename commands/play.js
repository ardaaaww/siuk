const { Util } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../config.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const { play } = require("../system/music.js") 
module.exports = {
  name: "oynat",
  description: "PLAY THE SOFTNESS OF THE SOUND",
  async execute(client, message, args) {

    if (!args.length) {

      return message.channel.send("Şarkı ismi veya Linki Vermen Gerek");
    }

    const { channel } = message.member.voice;
    if (!channel) {
      
      return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
    }



    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.channel.send("Oynatma listesi oynatılamıyor.");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songData = null;
    let song = null;
 const result = await youtube.searchVideos(targetsong, 1)
    if (urlcheck) {
      try {
         if(!result[0]) return message.channel.send('arama Sonucu Bulunamadı.')
        songData = await ytdl.getInfo(result[0].url);
        song = {
          title: songData.title,
          url: result[0].url,
          duration: songData.length_seconds
        };
      } catch (error) {
        if (message.include === "copyright") {
          return message
            .reply("Bu video telif hakları nedeni ile oynatılamıyor.")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        if(!result[0]) return message.channel.send('arama Sonucu Bulunamadı.')
        songData = await ytdl.getInfo(result[0].url)
         song = {
          title: result[0].title,
          url: result[0].url,
          duration: songData.length_seconds
        };
       
      } catch (error) {
        console.error(error)
      }
    }
    
    if(serverQueue) {
      serverQueue.songs.push(song)
      return serverQueue.textChannel.send(`\`${song.title}\`, Adlı şarkı Sıraya Eklendi!`)
      .catch(console.error)
    } else {
      queueConstruct.songs.push(song);
    }
    
    if(!serverQueue) message.client.queue.set(message.guild.id, queueConstruct)
    
     if (!serverQueue) {
      try {
    
        queueConstruct.connection = await channel.join();
        play(song, message)
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send({embed: {"description": `Kanala giriş yapamıyorum.: ${error}`, "color": "#ff2050"}}).catch(console.error);
      }
    }
    
    
  }
};
  