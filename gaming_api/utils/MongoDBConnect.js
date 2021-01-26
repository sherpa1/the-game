const mongoose = require("mongoose");
const { DB_NAME, DB_HOST, DB_USER, DB_PWD } = process.env;

mongoose.connect(`mongodb://${DB_HOST}`, {
    user: DB_USER,
    pass: DB_PWD,
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`✅ Successful connection to the NoSQL "${DB_NAME}" MongoDB database`);
}).catch(error => {
    throw new Error(error);
});

module.exports = mongoose;
