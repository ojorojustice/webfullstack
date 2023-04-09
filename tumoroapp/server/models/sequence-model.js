const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxPlacesId: { type: Number, required: true },
  maxUsersId: { type: Number, required: true }
});

module.exports = mongoose.model("sequences", sequenceSchema);