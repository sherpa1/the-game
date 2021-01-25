const mongoose = require("mongoose");
const Team = require("./Team");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    user_uuid: { type: String, index: true, unique: true, required: true },
    score: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    defeats: { type: Number, default: 0 },
    team: { type: Team.schema }
});

module.exports = mongoose.model("Player", schema);