const Discord = require('discord.js')
config = require('../../config.json')
const log = config.log
const err = config.error
module.exports = {
    name: "resume",
    aliases: [">"],
    category: 'Music',
    description: 'Tiếp tục phát nhạc :)',
    usage: '_resume / _>',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        const lc = client.channels.cache.get(log);
const er = client.channels.cache.get(err);
        const queue = distube.getQueue(message)
        if (!queue) return  embedbuilder(client, message, "Lỗi", "Không có nhạc trong danh sách đợi 😔")
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        try{
            distube.resume(message);
            embedbuilder(client, message, "YELLOW", "Tiếp tục", `:arrow_forward: Bài hát tiếp tục phát ! `)
        } catch (e) {
            console.log (e)
            return er.send(`Bot lỗi rồi, hãy báo cho Shirakami Yuu#5382 nhé!`)
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
