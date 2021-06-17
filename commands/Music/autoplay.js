const Discord = require('discord.js')
module.exports = {
    name: "autoplay",
    category: 'Music',
    description: 'Tự động phát :)',
    usage: '_autoplay',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        try {
            const voice_channel = message.member.voice.channel;
            if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
            let mode = distube.toggleAutoplay(message);
            embedbuilder(client, message, "YELLOW", "Tự động phát", "Chế độ hiện tại `" + (mode ? "Bật" : "Tắt") + "`")
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