const mongoose = require('mongoose');

const kryptonianSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKey: { type: String, unique: true }
});

module.exports = mongoose.model('Kryptonian', kryptonianSchema);
