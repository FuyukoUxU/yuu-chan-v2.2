const Discord = require("discord.js");
module.exports = {
    name: 'anal',
    category: "nsfw🔞",
    description: "porn (nhưng nó là hậu môn) 🔞",
    usage: '_anal',
    run: async(client, message, args) => {
    var superagent = require('superagent');
    if (!message.channel.nsfw) return message.channel.send('Channel này không được sử dụng. Hãy đến nsfw channel và thử lại ❗') 
    var lo = new Discord.MessageEmbed()
                .setDescription(`Đang lấy hình ảnh, vui lòng đợi. . .`)
                .setTimestamp()
    message.channel.send(lo).then(m => {
        superagent.get('https://nekobot.xyz/api/image').query({ type: 'anal'}).end((err, response) => {
            var embed_nsfw = new Discord.MessageEmbed()
                .setDescription(`:underage:\n**[Hình ảnh không tải? Bấm vào đây 🌏](${response.body.message})**`)
                .setTimestamp()
                .setImage(response.body.message) 
                .setFooter(`Bot by Shirakami Yuu`);
            m.edit(embed_nsfw);
        });
    });
}}
