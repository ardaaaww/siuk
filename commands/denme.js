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
  let  songData = await ytdl.getInfo(results[0].url)
        message.channel.send(`Video Oynatılıyor. ${results[0].title} ${songData.title}`);
    })
    .catch(console.log);
  }
};
