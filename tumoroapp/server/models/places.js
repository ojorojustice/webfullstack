const mongoose = require("mongoose");

const placesSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
});

module.exports = mongoose.model("Place", placesSchema);
