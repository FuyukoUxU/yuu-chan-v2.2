const Discord = require('discord.js')
module.exports = {
    name: "skip",
    category: 'Music',
    description: 'Skip nhạc và xóa trong danh sách phát',
    usage: '_skip',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        const queue = distube.getQueue(message)
        if (!queue) return  embedbuilder(client, message, "Lỗi", "Không có nhạc trong danh sách đợi 😔")
        console.log(queue.autoplay)
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        if (queue.autoplay == false) {
            try {
                distube.toggleAutoplay(message)
                distube.skip(message);
                embedbuilder(client, message, "YELLOW", "Bỏ qua", `:track_next: Đã bỏ qua, bật tự động phát và xóa bài hát trong danh sách ! `)
            } catch {
                embedbuilder(client, message, "RED", "Lỗi", `Không có nhạc thì sao phát được :)`);
            }
        } else if (queue.autoplay == true) {
        try {
            distube.skip(message);
            embedbuilder(client, message, "YELLOW", "Bỏ qua", `:track_next: Đã bỏ qua và xóa bài hát trong danh sách ! `)
        } catch {
            embedbuilder(client, message, "RED", "Lỗi", `Không có nhạc thì sao phát được :)`);
        }}
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
