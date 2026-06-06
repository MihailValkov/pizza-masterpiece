require('dotenv').config();
const express = require('express');
const path = require('path');

const db = require('./config/db');
const { port, dbConnection } = require('./config/config');

const allowed = ['.js', '.css', '.png', '.jpg', '.jpeg', '.ico'];

const app = express();
const start = async () => {
  try {
    await db(dbConnection);
    require('./config/express')(app, express);
    require('./routes/router')(app);

    app.get('*', (req, res) => {
      const isAllowed = allowed.filter((ext) => req.url.indexOf(ext) > 0).length > 0;
      const pathName = isAllowed ? path.resolve(`public/${req.url}`) : path.join(__dirname, 'public/index.html');
      res.sendFile(pathName);
    });
    console.log('*** >>> Database is connected <<< ***');
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.error('!!! >>> Database is not connected <<< !!!\nError:', error.message);
  }
};

start();

module.exports.globalDir = __dirname;
