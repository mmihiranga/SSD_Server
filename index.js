const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors({ origin: ['http://localhost:3000', 'https://abc-company-client.vercel.app'], credentials: true }));
app.use('/api/public/uploads', express.static(path.join(__dirname, '/api/public/uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    sslServer.listen(PORT, () => console.log(`Secure server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use('/message', require('./routes/message.route'));
app.use('/user', require('./routes/user.route'));
app.use('/admin', require('./routes/admin.route'));
app.use('/file', require('./routes/file.route'));

app.get('/', (req, res) => {
  res.send('<h3>ABC COMPANY API</h3>');
});
