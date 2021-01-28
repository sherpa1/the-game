const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Player = require("./Player");

const schema = new mongoose.Schema({
    token: { type: String, index: true, unique: true, required: false, default: '' },
    turn_1_winner: { type: Schema.Types.ObjectId, ref: "Player", default: null },
    turn_2_winner: { type: Schema.Types.ObjectId, ref: "Player", default: null },
    turn_3_winner: { type: Schema.Types.ObjectId, ref: "Player", default: null },
});

module.exports = mongoose.model("Party", schema);
