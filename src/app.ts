import express from 'express';
import categories from './category/router';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 80;
var cloudinary = require('cloudinary').v2;

app.use(cors());
app.use('/', categories);
app.listen(PORT, () => console.log('server'));

