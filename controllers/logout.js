var express = require('express');
var login = require.main.require('./models/login');
var router = express.Router();
const { check, validationResult } = require('express-validator');

//Root
router.get('/', function (req, res){
    req.session.username = null;
    req.session.usertype = null;
    req.session.userid = null;
    res.redirect('/login');
});

module.exports = router;