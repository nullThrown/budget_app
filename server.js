const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded());

app.use('/', require('./routes/indexRoute'));
app.use('/', require('./routes/loginRoute'));
app.use('/', require('./routes/logoutRoute'));
app.use('/', require('./routes/profileSetUpRoute'));
app.use('/', require('./routes/signupRoute'));
app.use('/', require('./routes/userProfileRoute'));

app.get('/', (req, res) => {
  res.send('hello from server');
});
const PORT = process.env.port || 4000;
app.listen(PORT, console.log(`listening on port: ${PORT}`));
