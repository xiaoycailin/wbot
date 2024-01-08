const { dayOfWeekText, date, year, hours, minutes, monthText } = require("./dateFormat")
const stringToIDR = require("./stringToIDR")

const DoneMessage = (msg, ackMessage, msgJId, client, rply = '') => {
    let addText = ''
    if (ackMessage[2] != undefined) {
        addText += `ID: *${ackMessage[2]}*\r\n`
    }
    if (stringToIDR(ackMessage[1]) != false) {
        addText += `Nominal: *${stringToIDR(ackMessage[1])}*\r\n`
    }
    rply = `Sudah Done Transfer Ya Boskuuu\r\n\r\n${addText}Tanggal: *${dayOfWeekText}, ${date} ${monthText} ${year}*\r\nPukul: *${hours}:${minutes}*\r\n\r\nTerimakasih ya BOSKUU`
    client.sendMessage(msgJId.remoteJid, { text: rply }, { quoted: msg.messages[0] })
}

module.exports = { DoneMessage }