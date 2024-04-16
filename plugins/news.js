const { bot, generateList, getJson } = require('../lib/')

bot(
  {
    pattern: 'news ?(.*)',
    fromMe: true,
    desc: 'malayalam news',
    type: 'misc',
  },
  async (message, match) => {
    if (!match) {
      const { result } = await getJson('https://masky-bot-oev1.onrender.com/news.json')
      const list = generateList(
        result.map(({ title, url, time }) => ({
          _id: `🆔 &id\n`,
          text: `🗞${title}${time ? `\n🕒${time}` : ''}\n`,
          id: `news ${url}`,
        })),
        'Malayalam News',
        message.jid,
        message.participant
      )

      return await message.send(list.message, {}, list.type)
    }
    if (match.startsWith('http')) {
      const { result } = await getJson(`https://masky-bot-oev1.onrender.com/news.json?url=${match}`)
      return await message.send(result, { quoted: message.data })
    }
  }
)
