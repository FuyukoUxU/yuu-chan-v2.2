const Discord = require('discord.js');
config = require('../../config.json')
const log = config.log
const err = config.error

module.exports = {
    name: "play",
    category: "Music",
    aliases: ['p'],
    description: "Lệnh phát nhạc - Phát được link, tìm kiếm youtube, add nhạc vào danh sách phát, thêm list nhạc luôn nè !",
    usage: '_play / _p <Link / Tên bài nhạc ; Link danh sách phát (public nhé)>',
    thumbnail: 'https://cdn.discordapp.com/attachments/820557032016969751/844193985140097064/sagirihihi.gif',
    run: async (client, message, args, cmd , distube) => {
        const lc = client.channels.cache.get(log);
const er = client.channels.cache.get(err);
        try {
            // Check quyền của user 
            const voice_channel = message.member.voice.channel;
            if (!voice_channel) return message.channel.send('Vào kênh voice trước nhé!');
        //Lệnh play + embed
        distube.play(message, args.join(" "));
        } catch (e) {
            console.log (e)
            return er.send(`Bot lỗi rồi, hãy báo cho Shirakami Yuu#5382 nhé!`)
        }
        }
};