const discord = require("discord.js");
 const YouTube = require('simple-youtube-api');
const ytdl = require("ytdl-core");
const youtube = new YouTube('AIzaSyAeBiOIP7Tm2UcU3A4tovquHkrOlVF249s');

module.exports = {
  name: "yasin",
  description: "Stop the music",
  execute(client, message, args) {


youtube.searchVideos('Centuries', 4)
    .then(async results => {
 ytdl.getInfo(results[0].url,{}).then(a =>{
        message.channel.send(`Video Oynatılıyor. ${results[0].title} ${a.videoDetails.author.name}`);
  })
    })
    .catch(console.log);
  }
};
