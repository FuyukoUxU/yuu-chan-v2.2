const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "discord-js",
  aliases: ["doc" , "djs"],
  category: "user",
  description: "||Dành cho ai đang code Discordjs||",
  usage: "_discord-js / _djs / _doc [Từ khóa]",
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("Bạn hãy nhập từ khóa tìm kiếm!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embed: data });
      }
    });
  },
};