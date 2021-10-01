const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// database connect
mongoose.connect(
  'mongodb+srv://wes123:wes123@cluster.34hab.mongodb.net/budget?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database')
);

app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
