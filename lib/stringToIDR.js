const stringToIDR = (amountString = '') => {
    if (!amountString.endsWith('k')) {
        return false;
    }

    const parseAmountString = (amountString) => {
        const multiplier = amountString.endsWith('k') ? 1000 : 1;
        const numericValue = parseFloat(amountString.replace(/[^\d.]/g, '')) * multiplier;
        return numericValue;
    };

    const amountNumeric = parseAmountString(amountString);
    const formattedAmount = new Number(amountNumeric).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formattedAmount;
};

module.exports = stringToIDR