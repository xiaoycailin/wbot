const { dayOfWeekText, date, monthText, year, hours, minutes } = require("./dateFormat")
const menuBotGrup = {
    done: 'Sudah Done Ya Bos Kuuu',
    h: '',
    htag: '',
    hidetag: '',
    absen: '',
    closeg: '',
    openg: '',
    descg:'',
}
const menuBot = {
    done: 'Pesan Berlaku Untuk Grup',
    absen: `Terima Kasih Sudah Absen \r\nHr/Tgl: ${dayOfWeekText}, ${date} ${monthText} ${year} \r\nPukul:${hours}:${minutes}`,
    pulang: '',
    setcmd: ''
}
module.exports = { menuBot, menuBotGrup }