const {
    default: WADefault,
    isJidGroup,
} = require('@adiwajshing/baileys')
const { menuBot, menuBotGrup } = require('./menuBot')
const fs = require('fs')
const Absen = require('./absen')
const GroupMessage = require('./groupMessage')
const SetCommand = require('./setCommand')
const { dayOfWeekText, date, monthText, year, hours, minutes, seconds } = require('./dateFormat')
const stringToIDR = require('./stringToIDR')
const { searchParticipantFromGroup, userIsAdmin, isAllDigits, formatPhoneWhatsAppNumber } = require('./utils')
const { PromoteUser, DemoteUser, KickUser, AddUser } = require('./promoteDemote')
const { DoneMessage } = require('./GroupMessageAck')

const messageHandler = async (msg, client = WADefault()) => {
    try {
        let commandMessage = msg.messages[0]?.message?.conversation.toString().toLowerCase()
        if (commandMessage == '' || commandMessage == undefined) {
            commandMessage = msg.messages[0]?.message?.extendedTextMessage?.text
        }
        const messageDefault = `${msg.messages[0]?.message?.conversation.toString()}`
        const containsKeyword = /(bantu|admin)/i.test(commandMessage)
        let containsSetKeyword = []
        if (commandMessage) {
            containsSetKeyword = commandMessage.split(' ')
        } else {
            containsSetKeyword = msg.messages[0]?.message?.extendedTextMessage?.text?.split(' ')
        }
        const me = client.authState.creds.me.id.replace(/:.+@/, '@')

        const msgJId = msg.messages[0]?.key
        if (isJidGroup(msgJId.remoteJid)) {
            const reply = menuBotGrup[commandMessage]
            let rply = reply
            const groupInfo = await client.groupMetadata(msgJId.remoteJid)
            const user = searchParticipantFromGroup(msg.messages[0].key.participant, groupInfo.participants, 'id')
            let ackMessage = []
            if (commandMessage) {
                ackMessage = commandMessage.split(' ')
            }
            if (containsSetKeyword == undefined) return
            if (containsSetKeyword[0] == '.setcmd') {
                return client.sendMessage(msgJId.remoteJid, { text: 'Jangan coba coba buat set command disini yaa maaf banget 🙏🙏🙏' }, { quoted: msg.messages[0] })
            }

            // menu demote dan promote admin 
            const botInGroup = searchParticipantFromGroup(me, groupInfo.participants, 'id')
            // return jika bukan admin
            if (containsSetKeyword[0] == 'promote' || containsSetKeyword[0] == 'demote') {
                if (!userIsAdmin(user)) {
                    return client.sendMessage(msgJId.remoteJid, { text: 'Jangan coba coba promote atau demote deh yaaa karena anda bukan admin 🙏🙏🙏' }, { quoted: msg.messages[0] })
                }
            }

            // check member di grup
            if (containsSetKeyword[0] == 'promote' || containsSetKeyword[0] == 'demote') {
                if(containsSetKeyword[1] != undefined) {
                    const userInGroup = searchParticipantFromGroup(formatPhoneWhatsAppNumber(containsSetKeyword[1]), groupInfo.participants, 'id')
                    if (!userInGroup) return client.sendMessage(msgJId.remoteJid, { text: 'Maaf Nomor Telepon Tidak ada di dalam group ini.' }, { quoted: msg.messages[0] })
                }
            }
            
            if (containsSetKeyword[0] == 'promote' && userIsAdmin(botInGroup)) return await PromoteUser(msg, msgJId, client, containsSetKeyword)
            if (containsSetKeyword[0] == 'demote' && userIsAdmin(botInGroup)) return await DemoteUser(msg, msgJId, client, containsSetKeyword)
            if (containsSetKeyword[0] == 'kick' && userIsAdmin(botInGroup)) return await KickUser(msg, msgJId, client, containsSetKeyword)
            if (containsSetKeyword[0] == 'add' && userIsAdmin(botInGroup)) return await AddUser(msg, msgJId, client, containsSetKeyword)

            // end demote promote
            if (ackMessage[0] == 'done' && ackMessage[1] != undefined && userIsAdmin(user)) return DoneMessage(msg, ackMessage, msgJId, client, '')

            if (menuBotGrup.hasOwnProperty(commandMessage) || containsKeyword) {
                if (containsKeyword) rply = ''
                GroupMessage(msg, msgJId, client, rply, containsKeyword, commandMessage)
            }
        } else {
            if (menuBot.hasOwnProperty(commandMessage)) {
                if (commandMessage == 'absen' || commandMessage == 'pulang') {
                    Absen(msg, msgJId, client, commandMessage)
                }
            }
            try {
                if (containsSetKeyword[0] == '.setcmd') {
                    SetCommand(msg, client, messageDefault, msgJId, containsSetKeyword, '')
                }
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = messageHandler;