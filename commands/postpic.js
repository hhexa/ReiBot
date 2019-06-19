const log = require('./logger.js')

module.exports = {
    name: 'postpic',
    description: 'Gets a picture from google',
    aliases: ['p', 'pic', 'img'],
    usage: '[search]',
    guildOnly: true,
    cooldown: 4,
    args: true,

    execute(message, args) {
        try {
            const search = args;
            search = 'x'
            message.channel.send(`Searching for \'${search}\'...`)
        }
        catch (error) {
            log.execute(message, ['error',error])
        }
    }
}