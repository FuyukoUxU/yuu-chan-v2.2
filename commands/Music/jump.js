const Discord = require('discord.js')
module.exports = {
    name: "jump",
    category: 'Music',
    description: 'Next bài nhạc trong danh sách phát và xóa những bài trước :)',
    usage: '_jump [số thứ tự bài]',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        const queue = distube.getQueue(message)
        if (!queue) return  embedbuilder(client, message, "Lỗi", "Không có nhạc trong danh sách đợi 😔")
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        try {
        if(0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length){
            embedbuilder(client, message, "RED", "Phát nhạc", `Chuyển tới bài ${parseInt(args[0])} !`)
            return distube.jump(message, parseInt(args[0])-1)
            .catch(err => message.channel.send("Số thứ tự nhạc không hợp lệ."));
        }} catch {
            embedbuilder(client, message, "RED", "Lỗi", `Nhập số thứ tự bài hợp lệ` )
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
    }}
