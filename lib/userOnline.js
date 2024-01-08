const {
    default: WADefault,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    Browsers,
    isJidGroup,
} = require('@adiwajshing/baileys')
const userOnline = (client = WADefault()) => {
    fs.readFile('./database/user_online.json', (err, data) => {
        const jsonData = JSON.parse(data)  
    })
}


module.exports = userOnline