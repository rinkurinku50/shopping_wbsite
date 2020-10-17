require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const mongoDbStore = require('connect-mongo')(expressSession);
const flash = require('express-flash');
const initRoute = require('./routes/web');
const apiRoutes = require('./routes/api');

//port 
const port = process.env.PORT || 3000;

//mongodb setup
const url = 'mongodb://localhost/test';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database Connected...');
}).catch(err => {
    console.log('Connection failed...');
})

//assets
app.use(express.static('public'));

//express data middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





//cors
let cors_options = {
    "origin": "*",
    "methods": "GET",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,

}

const cors = require('cors')({ origin: true });
app.use(cors);

//express flash
app.use(flash());


//session store
let mongoStore = new mongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

//session config
app.use(expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //valid for 24hours
}));

//passport setup
const passport = require('passport');
const init = require('./app/config/passport');
//const initAdmin = require('./app/config/adminPassport');
//initAdmin(passport);
init(passport);
app.use(passport.initialize());
app.use(passport.session());


//global middleware is to used to provide session on html views
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

//set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

//web
initRoute(app);

//api 
apiRoutes(app);

//app.use((req, res, next) => {
//    console.log(req.session);
//});

app.listen(port, () => {
    console.log("server is running at 3000 port....");
});