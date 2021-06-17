const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: 'user',
    description: "Check độ trễ của bot .",
    usage: '_ping ',
    run: async(client, message, args) => {
        const msg = await message.channel.send("Pinging...");
        const embed = new MessageEmbed ()
        embed.setColor('RANDOM')
        embed.setTitle("Pong! :ping_pong: ")
        embed.setAuthor('Đã Ping')
        embed.setDescription(`Độ trễ của bot là: \n \`\`\`${Math.floor(msg.createdAt - message.createdAt)} ms \`\`\` \nĐộ trễ của API là: \n \`\`\`${Math.round(client.ws.ping)} ms\`\`\``)
        embed.setThumbnail('https://cdn.discordapp.com/attachments/820557032016969751/843428832795164692/1540303910_giphy.gif')
        embed.setFooter(`Yuu-chan ©`, client.user.displayAvatarURL())
        embed.setTimestamp()
        msg.edit(embed)
        
    }
}