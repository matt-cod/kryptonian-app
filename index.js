const express = require('express');
const bodyParser = require('body-parser');
const redisClient = require('./config/redis');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);

mongoose.connect('mongodb://localhost/kryptonian', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
