const Discord = require('discord.js')
module.exports = {
    name: "leave",
    category: 'Music',
    description: 'Thoát voice channel. Hết\n*trong trường hợp stop lỗi* :)',
    usage: '_leave',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        try {
            const voice_channel = message.member.voice.channel;
            if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        voice_channel.leave();
            embedbuilder(client, message, "RED", "Thoát voice channel ", `Đã thoát voice channel ${voice_channel} !`)
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
    }}
