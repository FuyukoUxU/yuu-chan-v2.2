const Discord = require('discord.js')
module.exports = {
    name: "filter",
    aliases: ["effect", "eff"],
    category: 'Music',
    description: 'Thêm hiệu ứng vào bài hát :)',
    usage: '_filter / effect [`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`]\nChạy a.effect để tắt hiệu ứng',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        const queue = distube.getQueue(message)
        if (!queue) return  embedbuilder(client, message, "Lỗi", "Không có nhạc trong danh sách đợi 😔")
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        try {
            const cmd = args[0]
            if(!args[0]) {
                const eff = queue.filter
                if (!queue.filter) return message.channel.send('Bạn chưa thêm hiệu ứng nào cả !');
                distube.setFilter(message, queue.filter)
                embedbuilder(client, message, "YELLOW", `:arrows_counterclockwise: Bạn đã tắt hiệu ứng nhạc: ${eff}`)
            }
            let filter = distube.setFilter(message, cmd);
            return embedbuilder(client, message, "YELLOW", ":arrows_counterclockwise: Đang tải hiệu ứng nhạc: ", filter || "Tắt")
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
