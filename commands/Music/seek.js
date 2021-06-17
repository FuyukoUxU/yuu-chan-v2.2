const Discord = require('discord.js')
module.exports = {
    name: "seek",
    category: 'Music',
    description: 'Tua video :)',
    usage: '_seek [ ?h ?m ?s ]\n?h: số giờ của video\n?m: số phút của video\n?s: số giây của video',
    inVoiceChannel: true,
    run: async (client, message, args, cmd , distube) => {
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        try {
            if (!args[0]) return message.reply("Hãy nhập số giờ cần tua")
            if (!args[1]) return message.reply("Hãy nhập số phút cần tua")
            if (!args[2]) return message.reply("Hãy nhập số giây cần tua")
            const h = parseInt(args[0])
            const m = parseInt(args[1])
            const s = parseInt(args[2])
            if (h < 0) return message.reply("Số giờ sao nhỏ hơn 0 được ?")
            if (m > 60) return message.reply("Số phút trong giờ sao lớn hơn 60 được ?")
            if (m < 0) return message.reply("Số phút trong giờ sao nhở hơn 0 được ?")
            if (s > 60) return message.reply("Số giây trong phút sao lớn hơn 60 được ?")
            if (s < 0) return message.reply("Số giây trong phút sao nhỏ hơn 0 được ?")
            let time = h * 3600 + m * 60 + s
            distube.seek(message, Number(time*1000));
            embedbuilder(client, message, "GREEN", "Tua video", `:fast_forward: Tua đến \`${h}\` giờ \`${m}\` phút \`${s}\` giây`)
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