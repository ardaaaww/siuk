const Discord = require('discord.js')
const {PREFİX} = require('../config.json')
module.exports = {
  name: "yardım",
  description: "yardım",
  execute(client, message) {
  message.channel.send(new Discord.MessageEmbed()
                      .setDescription(
    `
${PREFİX}oynat <şarkı-adı> : Bir Şarkıyı Oynatır.
${PREFİX}atla : Sıradaki Şarkıyı atlar.
${PREFİX}loop : O Anki şarkıyı Hep tekrarlar.
${PREFİX}durdur : O anki Şarkıyı Durdurur.
${PREFİX}sıra : o anki



`)
                      )    
}
}
