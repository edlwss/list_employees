module.exports = {
    formatPassport: (series, number) => {
        if (!series || !number) return "";
        return `${series}-${number}`;
    },

    formatPhone: (phone) => {
        if (!phone || phone.length !== 11) return phone;
        return `7(${phone.slice(1, 4)})-${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
    },

};
