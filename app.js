const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash')
const passport = require('passport');


// route imports
const indexRoute = require('./routes/index');
const signupRoute = require('./routes/forms');  
 
// database connect
const mongooseConnect = mongoose.connect('mongodb+srv://wes123:wes123@cluster.34hab.mongodb.net/budget?retryWrites=true&w=majority',
 { useNewUrlParser: true , useUnifiedTopology: true},
 () => console.log('connected to database')) 
 
const app = express(); 

app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));




app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


app.use(indexRoute);  
app.use(signupRoute);


const port = process.env.port || 4000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  })
