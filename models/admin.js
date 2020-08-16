var db      = require('./dbconnection');

module.exports = {

    addEmp: function(name, username, password, phone, gender, callback){
        var sql="INSERT INTO `login` (`username`, `password`, `type`) VALUES ('"+username+"','"+password+"','employee');";
        db.getResults(sql,function(result){
            var sql1="INSERT INTO `employee_details`(`uID`, `name`, `phone`, `gender`) VALUES ('"+result.insertId+"','"+name+"','"+phone+"','"+gender+"');";
            db.getResults(sql1,function(result1){
                callback(result1);
            });
        });
    },

    getEmpList: function(search, callback){
        if(search && search != ''){
            var sql="SELECT * FROM `employee_details` WHERE `uID` LIKE '"+search+"' OR `name` LIKE '%"+search+"%';";
            db.getResults(sql,function(result){
                callback(result);
            });
        } else {
            console.log('not search');
            var sql="SELECT * FROM `employee_details`";
            db.getResults(sql,function(result){
                callback(result);
            });
        }
    },

    getEmp: function(uID, callback){
        var sql="SELECT * FROM `employee_details`, `login` WHERE uID = '"+uID+"'";
        db.getResults(sql,function(result){
            callback(result[0]);
        });
    },

    updEmp: function(uID, username, password, name, phone, gender, designation, picture, callback){
        var sql="UPDATE `employee_details` SET `name`='"+name+"',`phone`='"+phone+"',`gender`='"+gender+"', WHERE `uID`='"+uID+"';";
        db.getResults(sql,function(result){
            var sql1="UPDATE `login` SET `username`='"+username+"',`phone`='"+password+"' WHERE `ID`='"+uID+"';";
            db.getResults(sql,function(result1){
            callback(result1);
            });
        });
    },

    delEmp: function(uID, callback){
        var sql="DELETE FROM `login` WHERE ID = '"+uID+"'";
        db.getResults(sql,function(result){
            callback(result);
        });
    },
}