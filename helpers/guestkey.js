const crypto = require('crypto');

const generateGuestKey = () => {
    const length = 5;
    const buffer = crypto.randomBytes(length);
    const guestKey = buffer.toString('hex');
    return guestKey;
};







module.exports = { generateGuestKey };
