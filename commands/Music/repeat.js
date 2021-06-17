const Discord = require('discord.js')
module.exports = {
    name: "repeat",
    aliases: ["loop", "rp"],
    category: 'Music',
    description: 'Lệnh lặp cho nhạc',
    usage: '_repeat / _loop / _rp [0/1/2]\n0: Không lặp\n1: Lặp bài hiện tại\n2: Lặp danh sách phát',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        const queue = distube.getQueue(message)
        if (!queue) return  embedbuilder(client, message, "Lỗi", "Không có nhạc trong danh sách đợi 😔")
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        try {
            if(0 <= Number(args[0]) && Number(args[0]) <= 2){
                distube.setRepeatMode(message,parseInt(args[0]))
                embedbuilder(client, message, "GREEN", "Chế độ lặp được đặt:", `${args[0].replace("0", "Tắt").replace("1", ":repeat_one: Lặp bài hiện tại").replace("2", ":repeat: Lặp danh sách phát")}`)
            }
            else{
                embedbuilder(client, message, "RED", "Lỗi", ':loop: Bạn cần đặt chế độ lặp hợp lệ !\nHướng dẫn: a.help repeat')
            }
        } catch {
            return;
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
