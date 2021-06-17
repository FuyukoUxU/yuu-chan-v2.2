const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const { getMember  } = require('../../support/utils') // à quên cái này không có get role =))
module.exports = {
    name: 'mute',
    aliases: ['unmute'],
    category: 'manage',
    description: "Mute / Unmute một thằng lol nào đó trong server :>>",
    usage: '_mute [@username] [time]',
    run: async(client, message, args, cmd ) => { 
        const embed = new MessageEmbed() //defind rồi nên cái này chỉnh vào embed , chứ không phải là message edit
            .setFooter(`${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
            .setAuthor("Lỗi !!!")
            .setDescription('```Không tìm thấy thằng lol này trong server :/```')//bỏ này đi dc ko để v để
            .setColor('RANDOM')
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/attachments/820557032016969751/844060811751981096/sagiriangry.gif')
        const target = await getMember(message , args[0] , false)
        let mute = message.guild.roles.cache.find(role => role.name === 'Muted'); // Tìm role tên Muted
        if(!mute) {
            embed.setDescription('```Éo có role Muted các chú ạ , tạo đi cho Yuu chạy```')
            embed.setFooter(`${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }
        if (target) {

            if(cmd == 'mute') {
            if (!args[1]) { // Không có thời gian
                target.roles.add(mute.id);
                embed.setAuthor('Mute thành công !')
                embed.setDescription(`<@${message.member.id}> đã mute ${target} !`)
                embed.setFooter(`${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
                embed.setThumbnail('https://cdn.discordapp.com/attachments/820557032016969751/844193985140097064/sagirihihi.gif')
                embed.setTimestamp()
                return message.channel.send(embed); //defind toàn cái linh tinh
                
            } else {
                target.roles.add(mute.id);
                embed.setAuthor('Mute thành công !')
                embed.setDescription(`<@${message.member.id}> đã mute ${target} trong ${args[1]} !`);
                const msg = await message.channel.send(embed);
                setTimeout(() => {
                    target.roles.remove(mute.id)
                    embed.setAuthor('Đã hết thời gian mute !')
                    embed.setDescription(`<@${message.member.id}> đã unmute ${target} !`)
                    embed.setFooter(`${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
                    embed.setThumbnail('https://cdn.discordapp.com/attachments/820557032016969751/844193985140097064/sagirihihi.gif')
                    embed.setTimestamp()
                    msg.edit(embed)
                }, ms(args[1]))
            }
        } else if(cmd == 'unmute') {
            target.roles.remove(mute.id)
            embed.setAuthor('Unmute thành công !')
            embed.setDescription(`<@${message.member.id}> đã unmute ${target} !`)
            embed.setFooter(`${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true }))
            embed.setThumbnail('https://cdn.discordapp.com/attachments/820557032016969751/844193985140097064/sagirihihi.gif')
            embed.setTimestamp()
            return message.channel.send(embed)
        }
        } else {
            return message.channel.send(embed) //  cái này gửi lỗi luôn không cầnf defind a
        }
    }
}