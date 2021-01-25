const mongoose = require("mongoose");

const DB_NAME = process.env.DB;

//connexion à la bdd mongo
mongoose.connect("mongodb://" + DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connection to the NoSQL MongoDB database "${DB_NAME}"`);
});

module.exports = mongoose;