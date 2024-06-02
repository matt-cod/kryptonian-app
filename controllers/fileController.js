const fs = require('fs');
const path = require('path');
const Kryptonian = require('../models/kryptonian');  // Assuming a Mongoose model for MongoDB

exports.uploadFile = async (req, res) => {
  const { email } = req.kryptonian;  // Assuming email is set in the middleware
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, '..', file.path);
  const fileData = fs.readFileSync(filePath);
  const base64String = fileData.toString('base64');

  // Store base64String in database associated with the kryptonian
  // Assuming a File model or similar (not shown in this snippet)
  // e.g., await File.create({ email, base64String });

  fs.unlinkSync(filePath);  // Delete file from system

  res.status(200).send('File uploaded and stored as Base64 string.');
};

exports.getFile = async (req, res) => {
  const { id } = req.params;

  // Retrieve file from database using the id
  // Assuming a File model or similar (not shown in this snippet)
  // e.g., const file = await File.findById(id);

  if (!file) {
    return res.status(404).send('File not found.');
  }

  res.status(200).json({ base64String: file.base64String });
};

exports.getFilePublic = async (req, res) => {
  const { id } = req.params;

  // Retrieve file from database using the id
  // Assuming a File model or similar (not shown in this snippet)
  // e.g., const file = await File.findById(id);

  if (!file) {
    return res.status(404).send('File not found.');
  }

  res.status(200).json({ base64String: file.base64String });
};
