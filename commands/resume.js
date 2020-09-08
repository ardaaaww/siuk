module.exports = {
  name: "resume", 
  description: "Resume the paused Song",
  execute (client, message, args) {
      const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send(":star: **Ses Kanalında Değilsin !** :star:");
    }

    const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  
  return message.channel.send("✅ | Duraklatılan Şarkı Başarıyla Devam Ediyor ! :star:") 
 }
    
    message.channel.send("Çalmaya Devam Edebileceğim Duraklatılmış Bir Şarkı Bulunmamakta !")
    
  }
}
