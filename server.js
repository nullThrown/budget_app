const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const mongooseConnect = require('./db/db');

mongooseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profiles'));
app.use('/api/profile', require('./routes/api/expenditures'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
