const Discord = require('discord.js')
module.exports = {
    name: "volume",
    aliases: ["vol"],
    category: 'Music',
    description: 'Đặt âm lượng phát nhạc',
    usage: '_volume / _vol [ 0 -> 500 % ]', // sửa cái này đi
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => { //thêm như v thêm vào các lệnh
        const queue = distube.getQueue(message)
        if (!queue) return  embedbuilder(client, message, "Lỗi", "Không có nhạc trong danh sách đợi 😔")
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        try {
            if (!args[0]) return message.reply("Bạn hãy nhập mức âm lượng `%`")
            if(isNaN(args[0])) return message.reply("Mức âm lượng không hợp lệ🚫");
            if (args[0] > 100 && args[0] < 501) {
                embedbuilder(client, message, "GREEN", "Volume-booster", `:loud_sound::chart_with_upwards_trend: Âm lượng được boost hiện tại là \`${args[0]} %\``)
                return distube.setVolume(message, args[0]);
            }
            if (args[0] > 49 && args[0] < 101) {
                embedbuilder(client, message, "GREEN", "Volume", `:loud_sound: Âm lượng hiện tại là \`${args[0]} %\``)
                return distube.setVolume(message, args[0]);
            }
            if (0 < args[0] && args[0] < 50) {
                embedbuilder(client, message, "GREEN", "Volume", `:sound: Âm lượng hiện tại là \`${args[0]} %\``)
                return distube.setVolume(message, args[0]);
            }
            if (args[0] == 0) {
                embedbuilder(client, message, "GREEN", "Volume", `:mute: Bạn đã tắt tiếng !`)
                return distube.setVolume(message, args[0]);
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
