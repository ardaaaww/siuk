const discord = require("discord.js");
 const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAeBiOIP7Tm2UcU3A4tovquHkrOlVF249s');

module.exports = {
  name: "yasin",
  description: "Stop the music",
  execute(client, message, args) {


youtube.searchVideos('Centuries', 4)
    .then(results => {
        message.channel.send(`Video Oynatılıyor. ${results[0].title}`);
    })
    .catch(console.log);
  }
};
