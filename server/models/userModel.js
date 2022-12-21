// var stablishedConnection  = require('../config/db.config');
var dbConn  = require('../config/db.config');
 
var User = function(user){
    this.name       =   user.name;
    this.email      =   user.email;
    this.jobdesc    =   user.jobdesc;
    this.password   =   user.password;
}

 
// get all users
User.getAllUsers = (attr, sort, result) =>{
    dbConn.query('SELECT u.id, u.name, u.email, u.jobdesc_id, u.created_at, j.job FROM `users` u INNER JOIN jobdesc j ON u.jobdesc_id = j.id ORDER BY '+attr+' '+sort, (err, res)=>{
        result(err, res)
    })
}
 
// get user by email
User.getUserByEmail = (email, result)=>{
    dbConn.query('SELECT * FROM users WHERE email=?', email, (err, res)=>{
        result(err, res)
    })
}

// get user by Name for Search Data by name 
User.getUserByName = (name, result)=>{
    dbConn.query('SELECT * FROM users WHERE name=?', name, (err, res)=>{
        result(err, res)
    })
}
 
// get user by ID for update
User.getUserByID = (id, result)=>{
    dbConn.query('SELECT * FROM users WHERE id=?', id, (err, res)=>{
        result(err, res)
    })
}
 
// create new user
User.createUser = (userReqData, result) =>{
    dbConn.query('INSERT INTO `users`(`name`, `email`, `jobdesc_id`, `password` ) VALUES (?,?,?,?)', Object.values(userReqData), (err, res)=>{
        if(err){
            result(err);
        }else{
            dbConn.query('SELECT u.id, u.name, u.email, u.jobdesc_id, u.created_at, j.job FROM `users` u INNER JOIN jobdesc j ON u.jobdesc_id = j.id', (err, res)=>{
                result(err, res)
            })
        }
    })
}
 
// update user
User.updateUser = (id, userReqData, result)=>{
    let data = [ userReqData.name, userReqData.email, userReqData.password, userReqData.jobdesc, id ]
    let sql = "UPDATE `users` SET `name` = ?, `email` = ?, `jobdesc_id` = ?, `password` = ? WHERE id = ?" ;

    if(userReqData.password === ''){
        sql = "UPDATE `users` SET `name` = ?, `email` = ?, `jobdesc_id` = ? WHERE id = ?"
        data = [ userReqData.name, userReqData.email, userReqData.jobdesc, id ]
    }
    dbConn.query(sql, data, (err, res) => {
        if(err){
            result(err, res)
        }else{
            dbConn.query('SELECT u.id, u.name, u.email, u.jobdesc_id, u.created_at, j.job FROM `users` u INNER JOIN jobdesc j ON u.jobdesc_id = j.id', (err, res)=>{
                result(err, res)
            })
        }
    });
}
 
// delete user
User.deleteUser = (id, result)=>{
    dbConn.query('DELETE FROM users WHERE id=?', [id], (err, res)=>{
        result(err, res)
    })
}
 
module.exports = User;