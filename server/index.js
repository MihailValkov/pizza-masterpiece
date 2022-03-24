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
      if (allowed.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`public/${req.url}`));
      } else {
        res.sendFile(path.join(__dirname, 'public/index.html'));
      }
    });

    console.log('*** >>> Data base is connect <<< ***');
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.error('!!!--- > Data base is not connect < --- !!!\nError:', error);
  }
};
start();