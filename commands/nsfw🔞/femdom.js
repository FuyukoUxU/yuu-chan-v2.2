const Discord = require("discord.js");
const superfetch = require('node-superfetch');
module.exports = {
    name: 'femdom',
    category: "nsfw🔞",
    description: "Hmm nói chung là 🔞 thế nhá!",
    usage: '_femdom',
    run: async(client, message, args) => {
        var superagent = require('superagent');
        if (!message.channel.nsfw) {
          return message.channel.send('Bạn phải sử dụng lệnh này trong phòng chờ nsfw!');
        }
    
        var lo = new Discord.MessageEmbed()
                    .setDescription(`Vui lòng chờ ...`)
                    .setTimestamp()
    
        message.channel.send(lo).then(m => {
    
        superagent.get('https://nekos.life/api/v2/img/femdom')
          .end((err, response) => {
            var embed_nsfw = new Discord.MessageEmbed()
                .setDescription(`:underage:\n** [Không tải được ảnh? Nhấp vào đây](${response.body.url})**`)
                .setTimestamp()
                .setImage(response.body.url)
                .setFooter(`Bot by Shirakami Yuu`)
            m.edit(embed_nsfw);
        })
      })
    }
}    