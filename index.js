const {
    default: WADefault,
    useMultiFileAuthState,
    DisconnectReason,
    Browsers
} = require('@adiwajshing/baileys')
const { Boom } = require('@hapi/boom')
const chalk = require('chalk')
const { default: pino } = require('pino')
const messageHandler = require('./lib/messageHandler.js')
const fs = require('fs')
let addMenu = ''
!async function () {
    const cmdMenu = await fs.promises.readFile('./database/command.json')
    const jsData = JSON.parse(cmdMenu)
    jsData.forEach(m => {
        addMenu += `${m.cmd}\r\n`
    })
    console.log(addMenu)
}()
const getReplyMenu = () => {
    const replyMenu = `[*MENU BOT*]
done
h
absen
closeg
openg
descg
.setcmd
promote
demote
${addMenu}
    `
    return replyMenu
}
const startWhatsApp = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const client = WADefault({
        browser: Browsers.macOS('Dekstop'),
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        auth: state,
    })
    client.ev.on('creds.update', saveCreds)
    client.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update
        if (connection == 'close') {
            const shouldReconnect =
                lastDisconnect.error instanceof Boom &&
                lastDisconnect.error.output &&
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                startWhatsApp()
            } else {
                console.log('last Disconnect', lastDisconnect)
            }
        } else if (connection === 'open') {
            console.log(chalk.green('Device Ready Gas...'))
        }
    })
    client.ev.on('messages.upsert', async (msg) => {
        let commandMessage = msg.messages[0]?.message?.conversation.toString().toLowerCase()
        if (commandMessage == '' || commandMessage == undefined) {
            commandMessage = msg.messages[0]?.message?.extendedTextMessage?.text
        }
        console.log(chalk.greenBright('======= New Message Received ========'))
        console.log('RemoteJID => ', chalk.blue(msg.messages[0].key.remoteJid), chalk.white(commandMessage))
        if (commandMessage == 'menu') {
            client.sendMessage(msg.messages[0].key.remoteJid, {
                text: getReplyMenu()
            })
            return;
        }
        fs.readFile('./database/command.json', (err, command) => {
            const commands = JSON.parse(command)
            commands.forEach(value => {
                if (value.cmd == commandMessage) {
                    return client.sendMessage(msg.messages[0].key.remoteJid, {
                        text: value.reply,
                    }, { quoted: msg.messages[0] })
                }
            })
        })
        messageHandler(msg, client)
    })
}


startWhatsApp()