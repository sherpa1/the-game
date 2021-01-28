const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const Base64 = require('./Base64');

const cryptoRandomString = require('crypto-random-string');

class UWebtoken {
    static async create() {
        const unique_token = uuidv4();
        let hash;

        try {

            hash = bcrypt.hashSync(unique_token, 8);

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }

        const uwt = Base64.encode(hash);//60 chars url safe base 64 string
        return uwt;
    }

    static async verify(uwt) {

    }
}

module.exports = UWebtoken;