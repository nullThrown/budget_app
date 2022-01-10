const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongooseConnect = require('./db/db');

mongooseConnect();

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profiles'));
app.use('/api/exp', require('./routes/api/expenditures'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
