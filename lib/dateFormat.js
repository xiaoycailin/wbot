const currentDate = new Date();
const year = currentDate.getFullYear();
const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const month = currentDate.getMonth() + 1;
const monthText = months[month];
const date = currentDate.getDate();
const day = currentDate.getDay();
const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const dayOfWeekText = daysOfWeek[day];
const hours = `0${currentDate.getHours()}`.slice(-2);
const minutes = `0${currentDate.getMinutes()}`.slice(-2); // Menambah "0" di depan dan mengambil 2 karakter terakhir
const seconds = `0${currentDate.getSeconds()}`.slice(-2);
module.exports = { currentDate, year, month, monthText, date, day, dayOfWeekText, hours, minutes, seconds}