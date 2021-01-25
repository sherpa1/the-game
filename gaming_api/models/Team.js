const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    player_uuid: { type: String, required: true },
    name: { type: String, required: false, default: "My Team" },
    characters: [{ type: String }]
});

module.exports = mongoose.model("Team", schema);