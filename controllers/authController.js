const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const redisClient = require('../config/redis');
const Kryptonian = require('../models/kryptonian');  // Assuming a Mongoose model for MongoDB

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password'
  }
});

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newKryptonian = new Kryptonian({ email, password: hashedPassword });
  await newKryptonian.save();

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Confirm your email',
    text: 'Thank you for registering. Please confirm your email.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Registration successful. Please check your email to confirm.');
  });
};

exports.login = async (req, res) => {
  const { email } = req.body;
  const kryptonian = await Kryptonian.findOne({ email });

  if (!kryptonian) {
    return res.status(404).send('Kryptonian not found.');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redisClient.set(email, otp, 'EX', 300);  // OTP expires in 300 seconds (5 minutes)

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('OTP sent to your email.');
  });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  redisClient.get(email, (err, reply) => {
    if (err) throw err;

    if (reply === otp) {
      const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(400).send('Invalid OTP.');
    }
  });
};

exports.generateApiKey = async (req, res) => {
  const { email } = req.body;
  const kryptonian = await Kryptonian.findOne({ email });

  if (!kryptonian) {
    return res.status(404).send('Kryptonian not found.');
  }

  const apiKey = uuidv4();
  kryptonian.apiKey = apiKey;
  await kryptonian.save();

  res.status(200).json({ apiKey });
};
