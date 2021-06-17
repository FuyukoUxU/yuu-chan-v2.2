const Discord = require('discord.js')
config = require('../../config.json')
const log = config.log
const err = config.error
module.exports = {
    name: "stop",
    aliases: ["end"],
    description: 'Dừng bài hát và thoát voice !',
    category: 'Music',
    usage: '_stop / _end',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        const lc = client.channels.cache.get(log);
const er = client.channels.cache.get(err);
        const queue = distube.getQueue(message)
        if (!queue) return  embedbuilder(client, message, "Lỗi", "Không có nhạc trong danh sách đợi 😔")
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        try {
            distube.stop(message);
            embedbuilder(client, message, "RED", "Đang thoát...", `:eject: Đã rời khỏi voice channel rồi nhé !`)
            } catch {
                return er.send('Thoát thôi cũng lỗi, thôi thì gọi Shirakami Yuu#5382 vậy ...');
            }
            async function embedbuilder(client, message, color, title, description, url, thumbnail){
                let embed = new Discord.MessageEmbed()
                .setColor(color)
                .setFooter(client.user.username, client.user.displayAvatarURL());
                if(title) embed.setTitle(title);
                if(description) embed.setDescription(description);
                if(thumbnail) embed.setThumbnail(thumbnail);
                if(url) embed.setURL(url);
                return message.channel.send(embed);
            }
    }
}
