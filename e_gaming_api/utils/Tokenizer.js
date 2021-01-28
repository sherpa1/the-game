const jwt = require('jsonwebtoken');
const jwt_duration = 3;
const jwt_expiration = 3600 * jwt_duration;//convert hour in seconds
let jwt_private_key;

const { JWT_PRIVATE_KEY } = process.env;

const fs = require('fs');

class Tokenizer {
    static async create(payload = {}, duration_in_ms = jwt_expiration) {

        let token;

        try {

            token = await jwt.sign(payload, JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: duration_in_ms });

        } catch (error) {

            throw new Error(error);

        }

        return token;
    }
}

module.exports = Tokenizer;