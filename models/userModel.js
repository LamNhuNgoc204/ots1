const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  cccd: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.users || mongoose.model("user", userSchema);
