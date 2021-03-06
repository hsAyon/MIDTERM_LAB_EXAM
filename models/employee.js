var db      = require('./dbconnection');

module.exports = {

    getEmp: function(uID, callback){
        var sql="SELECT * FROM `employee_details` as emp, `login` as log WHERE emp.uID = log.ID AND emp.uID = '"+uID+"'";
        db.getResults(sql,function(result){
            callback(result[0]);
        });
    },

    addProd: function(name, quantity, price, callback){
        var sql="INSERT INTO `products`(`name`, `quantity`, `price`) VALUES ('"+name+"','"+quantity+"','"+price+"');";
        db.getResults(sql,function(result){
            callback(result);
        });
    },

    updProd: function(prodID, name, quantity, price, callback){
        var sql="UPDATE `products` SET `name`='"+name+"',`quantity`='"+quantity+"',`price`='"+price+"' WHERE ID = '"+prodID+"';";
        db.getResults(sql,function(result){
            callback(result);
        });
    },

    getProdList: function(search, callback){
        if(search && search != ''){
            var sql="SELECT * FROM `products` WHERE `ID` LIKE '"+search+"' OR `name` LIKE '%"+search+"%';";
            db.getResults(sql,function(result){
                callback(result);
            });
        } else {
            var sql="SELECT * FROM `products`";
            db.getResults(sql,function(result){
                callback(result);
            });
        }
    },

    getProd: function(ID, callback){
        var sql="SELECT * FROM `products` WHERE `ID` LIKE '"+ID+"';";
        db.getResults(sql,function(result){
            callback(result[0]);
        });
    },
}