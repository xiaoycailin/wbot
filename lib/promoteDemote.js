const { isAllDigits, formatPhoneWhatsAppNumber } = require("./utils")
const PromoteUser = async (msg, msgJId, client, containsSetKeyword) => {
    let txt = ''
    if (containsSetKeyword[1] != undefined && isAllDigits(containsSetKeyword[1].replace('@', ''))) {
        await client.groupParticipantsUpdate(msgJId.remoteJid, [formatPhoneWhatsAppNumber(containsSetKeyword[1].replace('@', ''))], 'promote')
        txt = `Berhasil di Promote`
    } else {
        txt = 'Format tidak valid \r\nFormat: *promote Nomor yang akan di Promote*\r\nContoh: *.promote 6282123456789*'
    }

    let fMention = null
    if(containsSetKeyword[1] == undefined) {
        fMention = null
    }else {
        fMention = formatPhoneWhatsAppNumber(containsSetKeyword[1].replace('@', ''))
    }
    await client.sendMessage(msgJId.remoteJid, { text: txt, mentions: [fMention] }, { quoted: msg.messages[0] })

}
const DemoteUser = async (msg, msgJId, client, containsSetKeyword) => {
    let txt = ''
    if (containsSetKeyword[1] != undefined && isAllDigits(containsSetKeyword[1].replace('@', ''))) {
        await client.groupParticipantsUpdate(msgJId.remoteJid, [formatPhoneWhatsAppNumber(containsSetKeyword[1].replace('@', ''))], 'demote')
        txt = `Berhasil di Demote`
    } else {
        txt = 'Format tidak valid \r\nFormat: *demote Nomor yang akan di demote*\r\nContoh: *.promote 6282123456789*'
    }
    let fMention = null
    if(containsSetKeyword[1] == undefined) {
        fMention = null
    }else {
        fMention = formatPhoneWhatsAppNumber(containsSetKeyword[1].replace('@', ''))
    }
    await client.sendMessage(msgJId.remoteJid, { text: txt, mentions: [fMention] }, { quoted: msg.messages[0] })
}

const KickUser = async (msg, msgJId, client, containsSetKeyword) => {
    let txt = ''
    if (containsSetKeyword[1] != undefined && isAllDigits(containsSetKeyword[1].replace('@', ''))) {
        const c = await client.groupParticipantsUpdate(msgJId.remoteJid, [formatPhoneWhatsAppNumber(containsSetKeyword[1].replace('@', ''))], 'remove')
        txt = `Berhasil di Tendang selamat tinggal wkwkwkwkasur`
        if(c[0].status == '403') txt = 'Gagal 403 Ketika mengeluarkan dari grup'
    } else {
        txt = 'Format tidak valid \r\nFormat: *kick Nomor yang akan di kick*\r\nContoh: *.promote 6282123456789*'
    }
    let fMention = null
    if(containsSetKeyword[1] == undefined) {
        fMention = null
    }else {
        fMention = formatPhoneWhatsAppNumber(containsSetKeyword[1].replace('@', ''))
    }
    await client.sendMessage(msgJId.remoteJid, { text: txt, mentions: [fMention] }, { quoted: msg.messages[0] })
}
const AddUser = async (msg, msgJId, client, containsSetKeyword) => {
    let txt = ''
    if (containsSetKeyword[1] != undefined && isAllDigits(containsSetKeyword[1].replace('@', ''))) {
        const c = await client.groupParticipantsUpdate(msgJId.remoteJid, [formatPhoneWhatsAppNumber(containsSetKeyword[1].replace('@', ''))], 'add')
        txt = `Berhasil di Tambahkan Ke grup`
        if(c[0].status == '403') txt = 'Gagal 403 Ketika menambahkan ke grup'
    } else {
        txt = 'Format tidak valid \r\nFormat: *add Nomor yang akan di tambah ke grup*\r\nContoh: *.promote 6282123456789*'
    }
    let fMention = null
    if(containsSetKeyword[1] == undefined) {
        fMention = null
    }else {
        fMention = formatPhoneWhatsAppNumber(containsSetKeyword[1].replace('@', ''))
    }
    await client.sendMessage(msgJId.remoteJid, { text: txt, mentions: [fMention] }, { quoted: msg.messages[0] })
}

module.exports = { PromoteUser, DemoteUser, KickUser, AddUser }