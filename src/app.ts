import express from 'express';
import categories from './category/router';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3211;
var cloudinary = require('cloudinary').v2;

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use('/', categories);
app.listen(PORT, () => console.log('server'));

