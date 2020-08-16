var express = require('express');
var employee = require.main.require('./models/employee');
var router = express.Router();
const { check, validationResult } = require('express-validator');


//root
/* router.get('/', function(req, res){

}); */

module.exports = router;