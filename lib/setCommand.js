const SetCommand = async (msg, client, messageDefault, msgJId, containsSetKeyword, rply) => {
    const filePath = './database/command.json'

    try {
        const data = await fs.promises.readFile(filePath, 'utf8')
        const jsonData = JSON.parse(data)

        const rplyCommand = messageDefault.replace(containsSetKeyword[0], '').replace(containsSetKeyword[1], '').trim()

        const commandExists = jsonData.some((json) => json.cmd === containsSetKeyword[1])

        if (commandExists) {
            rply = `Maaf 😭, command *${containsSetKeyword[1]}* Sudah tersedia \r\nSilahkan tambahkan command lain.`
        } else {
            jsonData.push({ cmd: containsSetKeyword[1], reply: rplyCommand })
            await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8')
            rply = `Yeaaay 😍, command *${containsSetKeyword[1]}* Berhasil Ditambahkan \r\nCommand: *${containsSetKeyword[1]}* \r\nReply: *${rplyCommand}*`
        }
        await client.sendMessage(msgJId.remoteJid, { text: rply }, { quoted: msg.messages[0] })
    } catch (error) {
        console.error('Error:', error)
    }
}

const fs = require('fs')
const { promisify } = require('util')
fs.promises = {
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile),
}

module.exports = SetCommand