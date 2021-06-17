const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const { category } = require('./chat');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'user',
    description: 'Hướng dẫn xài lệnh',
    usage: '_help [tên lệnh]',
    run: async ( client , message , args , cmd) => {    
        if (!args[0]) return getAll(client, message);
        return getCMD(client, message, args[0]);
    },
};

function getAll(client,message) {
    const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor('Sử dụng cú pháp   _help  [commands]   để thông tin về lệnh đó :')
        .setFooter(`Copyright  Shirakami Yuu#5382 - 2021 ©`, client.user.displayAvatarURL())
        .addField(`\n:robot: Yuu-info`, `Prefix của Yuu là: _`, true)
        .addField(`\n:gear: The Owner's bot x Developer :`, `Shirakami Yuu`)
        .addField(`\n:information_source: Thông báo từ chủ bot Shirakami Yuu :`, `Bot đang trong quá trình quá trình phát triển nên sẽ xuất hiện bug !\nMong các bạn thông cảm !`, true)
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setTimestamp()

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(', ')
    }

    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    let info = `\`\`\`Không có câu lệnh này : ${input.toLowerCase()}\`\`\``;
    

    if (!cmd) return message.channel.send(embed.setColor('RANDOM').setAuthor('Lỗi !!!').setDescription(info).setThumbnail('https://cdn.discordapp.com/attachments/820557032016969751/844060811751981096/sagiriangry.gif').setFooter('Copyright Shirakami Yuu#5382', client.user.displayAvatarURL()).setTimestamp())

    if (cmd.name) info = `**Tên lệnh**: \`\`${cmd.name}\`\``;
    if (cmd.aliases) info += `\n**Lệnh tắt / Lệnh mở rộng**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
    if (cmd.description) info += `\n**Thông tin**: ${cmd.description}`;
    if (cmd.info) info += `\n**Chú thích**: ${cmd.info}`;
    if (cmd.ver) info += `\n**Version Command ( Phiên bản lệnh )**: ${cmd.ver}`;
    if (cmd.thumbnail) info += embed.setThumbnail(`${cmd.thumbnail}`);

// Nhạc cmd
    // Chỉ dành cho lệnh nhạc vì nó có quá nhiều command :)
    if (cmd.dong) info += `\n------------------${cmd.dong}`;
    if (cmd.dong1) info += `\n**Lệnh phát cơ bản**: ${cmd.dong1}`;
    if (cmd.dong2) info += `\n**Lệnh phát nâng cao**: ${cmd.dong2}`;
    if (cmd.dong3) info += `\n**Hiệu ứng nhạc**: ${cmd.dong3}`;
    if (cmd.dong4) info += `\n**Cài đặt nhạc**: ${cmd.dong4}`;


    if (cmd.usage) {
        info += `\n**Cách dùng**: ${cmd.usage}`;
        embed.setFooter(`Kí hiệu: [] = bắt buộc, <> = Tùy chọn | Bot by Shirakami Yuu`);

    }

    return message.channel.send(embed.setColor('GREEN').setDescription(info));
}