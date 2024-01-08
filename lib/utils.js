const searchParticipantFromGroup = (id, data, srcKey) => data.find((item) => item[srcKey] === id);
const userIsAdmin = (userData) => userData.admin == 'admin';
const isAllDigits = (str) => /^\d+$/.test(str);
const formatPhoneWhatsAppNumber = (phoneNumber = '') => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    if (cleanNumber.startsWith('08')) {
        return '62' + cleanNumber.slice(1) + '@s.whatsapp.net';
    }
    if (cleanNumber.startsWith('62')) {
        return cleanNumber + '@s.whatsapp.net';
    }
    return '62' + cleanNumber + '@s.whatsapp.net';
};
module.exports = { searchParticipantFromGroup, userIsAdmin, isAllDigits, formatPhoneWhatsAppNumber }