const crypto = require('crypto');
const secret = 'abcdefghijklmnopqrstuvwxyzabcdef'

const encrypt = (password) => {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(`aes-256-ctr`, Buffer.from(secret), iv);
    
    const encryptedPassword = Buffer.concat([
        cipher.update(password), 
        cipher.final(),
    ]);

    //return object where iv = iv and password = encrypted password
    return {
        iv: iv.toString(`hex`), 
        password: encryptedPassword.toString(`hex`)
    };
};

const decrypt = (encryption) => {
    // get the iv from the encryption object we made
    const decipher = crypto.createDecipheriv(
        `aes-256-ctr`, 
        Buffer.from(secret), 
        Buffer.from(encryption.iv, `hex`,)
    );

    // get the password from the encryption object we made
    const decryptedPassword = Buffer.concat([
       decipher.update(Buffer.from(encryption.password), `hex`), 
       decipher.final(),
    ]);

    return decryptedPassword.toString();
};

module.exports = {encrypt, decrypt};