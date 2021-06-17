const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'manage',
    description: "Bỏ ban người dùng.",
    usage: '_unban [iduser] <Lí do bỏ ban>',
    run: async(client, message, args, cmd ) => { 
        if (message.channel.type == 'dm') return message.channel.send("Lệnh này không thể dùng ở đây !");
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Bạn không có quyền unban!').then(m => m.delete({ timeout: 5000 }));
        if (!args[0]) return message.channel.send('Nhập ID người dùng cần unban').then(m => m.delete({ timeout: 5000 }));
        const member = parseInt(args[0])
try {
await message.guild.members.unban(member)
const embed = new MessageEmbed()
embed.setAuthor('Unban thành công !')
embed.setDescription(`Đã unban thành công <@${member}>`)
return message.channel.send(embed)
} catch (e) {
message.channel.send(`Bot lỗi : ${e}`)
}

    }
}