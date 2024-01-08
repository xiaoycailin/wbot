const { default: WaDefault } = require('@adiwajshing/baileys')
const { userIsAdmin, searchParticipantFromGroup } = require('./utils')
const GroupMessage = async (msg, msgJId, client = WaDefault(), rply = '', containsKeyword, commandMessage) => {
    let tagAdmin = []
    const groupInfo = await client.groupMetadata(msgJId.remoteJid)
    const me = client.authState.creds.me.id.replace(/:.+@/, '@')
    const user = searchParticipantFromGroup(msg.messages[0].key.participant, groupInfo.participants, 'id')
    let botIsAdmin = false
    groupInfo.participants.forEach(admin => {
        if (me === admin.id && admin.admin == 'admin') {
            botIsAdmin = true
        }
        if (admin.isAdmin) {
            tagAdmin.push(admin.id)
        }
    })

    if (!botIsAdmin) rply = 'Jadikan saya admin dong pak :)'
    if (containsKeyword) {
        await client.sendMessage(msgJId.remoteJid, {
            text: rply,
            mentions: tagAdmin
        }, { quoted: msg.messages[0] })
        return;
    }
    if (commandMessage == 'absen' && userIsAdmin(user)) {
        rply = 'Untuk absen ketik *absen* ke chat pribadi saya yaa'
    }
    
    if(commandMessage == 'closeg' || commandMessage == 'openg') {
        if(!userIsAdmin(user)) {
            rply = 'Anda bukan admin'
            console.log(user)
            await client.sendMessage(msgJId.remoteJid, {
                text: rply,
            }, { quoted: msg.messages[0] })
            return;
        }
    }

    if (commandMessage == 'closeg' && botIsAdmin) {
        await client.groupSettingUpdate(msgJId.remoteJid, 'announcement')
        rply = 'Grup nya saya tutup dulu yaa 😊'
    } else if (commandMessage == 'openg' && !botIsAdmin) {
        rply = 'Jadikan saya admin biar bisa ubah pengaturan group dong 😒'
    }
    if (commandMessage == 'openg' && botIsAdmin) {
        await client.groupSettingUpdate(msgJId.remoteJid, 'not_announcement')
        rply = 'Grup nya sudah saya buka lagi yaa 😊'
    } else if (commandMessage == 'openg' && !botIsAdmin) {
        rply = 'Jadikan saya admin biar bisa ubah pengaturan group dong 😒'
    }
    if (commandMessage == 'descg' && botIsAdmin) {
        rply = groupInfo.desc
    } else if (commandMessage == 'descg' && !botIsAdmin) {
        rply = 'Jadikan saya admin biar bisa kirim deskiripsi group 😒'
    }
    const tag = commandMessage === 'h' || commandMessage === 'htag' || commandMessage === 'hidetag' ? groupInfo.participants : null

    await client.sendMessage(msgJId.remoteJid, {
        text: rply,
        mentions: commandMessage == 'online' ? tagAdmin : tag
    }, { quoted: msg.messages[0] })
}

module.exports = GroupMessage