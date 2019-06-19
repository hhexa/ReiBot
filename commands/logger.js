const ct = require('common-tags')
const chalk = require('chalk')
const logchannel = require('../config.json').channels.logs
const discord = require('discord.js')

const logLevels = [
    {
        name: 'log',
        aliases: ['l'],
        chalkcolor: chalk.green,
        color: 0x00FF00
    },
    {
        name: 'warning',
        aliases: ['warn'],
        chalkcolor: chalk.yellow,
        color: 0xFFFF00
    },
    {
        name: 'error',
        aliases: ['e', 'er', 'err'],
        chalkcolor: chalk.red,
        color: 0xFF0000
    }
]

module.exports = {
    name: 'log',
    description: ct.stripIndents`
    Handles logging to the console,
    and dming logs to the admin.
    `,
    aliases: ['l'],
    guildOnly: false,
    args: true,
    cooldown: 1,
    usage: ct.stripIndents`
    [Message] <Log-Level> ${logLevels.map(lvl => '\n\n' + lvl.name + '\nAliases [' + lvl.aliases + ']') + '\n'}`,

    execute(message, args) {
        // console.log(logLevels.map(lvl => lvl.name))

        let logInput = 'log'

        if (args.length > 1)
            logInput = args.shift()


        try {
            var loglevel = logLevels.find(lvl => lvl.name === logInput) || logLevels.find(lvl => lvl.aliases && lvl.aliases.includes(logInput))
            const msg = args.join(' ')

            console.log(loglevel.chalkcolor(msg))

            const embedlog = new discord.RichEmbed()
                .setTitle(loglevel.name)
                .setColor(loglevel.color)
                .setDescription(`${msg}`)
                .setTimestamp()

            message.client.channels.get(logchannel).send(embedlog)
        }
        catch (error) {
            if (loglevel === undefined) {
                message.reply
                    (
                        ct.commaListsOr`
                        Invalid log - level: '${logInput}'
                        Use: ${ logLevels.map(lvl => lvl.name)}

                        For a list of aliases use the help command
                        `
                    )
            }
        }
    }
}