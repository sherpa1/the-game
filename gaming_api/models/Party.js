const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    uuid: { type: String, index: true, unique: true, required: true },
    token: { type: String, index: true, unique: true, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player', required: false }],
    turn_1_winner: { type: Schema.Types.ObjectId, ref: 'Player', required: false },
    turn_2_winner: { type: Schema.Types.ObjectId, ref: 'Player', required: false },
    turn_3_winner: { type: Schema.Types.ObjectId, ref: 'Player', required: false },
});

module.exports = mongoose.model("Player", schema);
