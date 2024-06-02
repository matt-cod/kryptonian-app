const Kryptonian = require('../models/kryptonian');

exports.authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers['api-key'];

  if (!apiKey) {
    return res.status(401).send('API key is missing.');
  }

  const kryptonian = await Kryptonian.findOne({ apiKey });

  if (!kryptonian) {
    return res.status(403).send('Invalid API key.');
  }

  req.kryptonian = kryptonian;
  next();
};
