const fs = require('fs').promises
const { dayOfWeekText, date, monthText, year, hours, minutes } = require('./dateFormat')
const Absen = async (msg, msgJId, client, commandMessage = 'absen') => {
    const filePath = './database/user_online.json';
    let rply = ''
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        if (commandMessage.toLowerCase() === 'pulang') {
            // Hapus data berdasarkan msgJId.remoteJid
            const updatedData = jsonData.filter((user) => user.remoteJid !== msgJId.remoteJid);
            await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
            rply = 'Anda Telah Pulang';
        } else {
            let dateAbsen = `Hr/Tgl: ${dayOfWeekText}, ${date} ${monthText} ${year} \r\nPukul:${hours}:${minutes}`
            rply = `Anda berhasil Absen pada\r\n${dateAbsen}`
            const existingUser = jsonData.find((json) => json.remoteJid === msgJId.remoteJid);
            if (existingUser) {
                rply = `Anda Sudah Absen Pada \r\n${existingUser.date}`;
            } else {
                jsonData.push({
                    remoteJid: msgJId.remoteJid,
                    status: true,
                    name: msg.messages[0].pushName,
                    date: dateAbsen,
                });
                await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
            }
        }

        await client.sendMessage(msgJId.remoteJid, {
            text: rply,
        }, { quoted: msg.messages[0] });
    } catch (error) {
        console.error('Error:', error);
    }
}
module.exports = Absen
