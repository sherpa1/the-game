class Base64 {

    static encode(str) {
        return Buffer.from(str, 'utf-8');
    }

    static decode(base64str) {
        return base64str.toString('base64');
    }

}

module.exports = Base64;