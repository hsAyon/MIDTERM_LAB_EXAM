var express 	= require('express');
var session 	= require('express-session');
var bodyParser 	= require('body-parser');
var validator = require('express-validator');
var app = express();

var login = require('./controllers/login');
var admin = require('./controllers/admin');
var employee = require('./controllers/employee');
var logout = require('./controllers/logout');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'secret', saveUninitialized: false, resave: false}));


app.use('/assets',express.static('assets'));
app.use('/login',login);
app.use('/admin',admin);
app.use('/employee',employee);
app.use('/logout',logout);


app.use(function (req, res, next) {
    res.locals.username = req.session.username;
    res.locals.usertype = req.session.usertype;
    res.locals.userid = req.session.userid;
    next();
});
  
app.listen(3000, function(){
    console.log('express http server started at...3000');
});

//ROOT
app.get('/', function(req, res){
    res.redirect('/login');
});

