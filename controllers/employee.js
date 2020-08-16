var express = require('express');
var employee = require.main.require('./models/employee');
var router = express.Router();
const { check, validationResult } = require('express-validator');


//root
router.get('/', function(req, res){
    res.render('employee');
});

//myprofile
router.get('/myprofile', function (req, res){
    employee.getEmp(req.session.userid, function(results){
        console.log(results);
        res.render('myprofile',{employee: results});
    });
});

//allprodlist
router.get('/allprodlist', function(req, res){
    var search = req.query.search;

    //console.log(search);
    employee.getProdList(search, function (result){
        res.render('allProdList',{products: result});
    }) 
});

//addProd
router.get('/addProd', function(req, res){
    var form = {
        name: req.body.name,
        quantity: 0,
        price: 0,
    };
    var valError = [];

    res.render('addProd',{form:form, valError:valError});
});

router.post('/addProd', [
    check('name','Name required!').notEmpty(),
    check('quantity').notEmpty().withMessage('Quantity required!').isNumeric().withMessage('Quantity must be numeric!'),
    check('price').notEmpty().withMessage('Price required!').isNumeric().withMessage('Price must be numeric!'),
], function(req, res){
    
    var form = {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
    };
    
    var valError = [];

    validationResult(req).errors.forEach(error => {
        valError.push(error.msg);
    });

    if(valError.length > 0){
        res.render('addProd',{form, valError});
    } else {
        employee.addProd(req.body.name, req.body.quantity, req.body.price, function(result){
            res.redirect('/employee/allprodlist');
        });
    }
});

//updateprod
router.get('/updateprod/:id', function (req, res){
    
    ID = req.params.id;

    employee.getProd(ID, function (result){
        var form = {
            name: result.name,
            quantity: result.quantity,
            price: result.price,
        };
        
        var valError = [];

        res.render('updateProd',{form, valError, product: result});
    });    
});

router.post('/updateprod/:id',[
    check('name','Name required!').notEmpty(),
    check('quantity').notEmpty().withMessage('Quantity required!').isNumeric().withMessage('Quantity must be numeric!'),
    check('price').notEmpty().withMessage('Price required!').isNumeric().withMessage('Price must be numeric!'),
], function (req, res){
    
    ID = req.params.id;

    employee.getProd(ID, function (result){
        var form = {
            name: result.name,
            quantity: result.quantity,
            price: result.price,
        };

        var valError = [];
    
        validationResult(req).errors.forEach(error => {
            valError.push(error.msg);
        });
        //console.log(req);

        console
        if (valError.length > 0){
            res.render('updateProd',{form, valError, product: result});
        } else {
            employee.updProd(ID, req.body.name, req.body.quantity, req.body.price, function(result1){
                res.redirect('/employee/allprodlist');
            });
        }
    });    
});

module.exports = router;