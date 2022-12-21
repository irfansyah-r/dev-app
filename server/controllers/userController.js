const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const saltRounds = 10

// Login
exports.checkAuth = (req, res) => {
    res.json({auth: true, message: "You are authenticated"})
}

exports.login = (req, res) => {
    userModel.getUserByEmail(req.body.email, (err, user) => {
        if(err){
            res.send(err)
        }else{
            if(user.length > 0){
                bcrypt.compare(req.body.password, user[0].password, (err, response) => {
                    if(response){
                        const userSession = {
                            id: user[0].id,
                            name: user[0].name,
                            admin: user[0].admin
                        }
                        const token = jwt.sign(userSession, "DevSecretJWT", {
                            expiresIn: 6000
                        })
                        // req.session.user = user
                        res.json({auth: true, token: token, user: userSession})
                    }else{
                        res.json({auth: false, message: "Wrong Email/Password combination."})
                        // res.send({message: "Wrong Email/Password combination."})
                    }
                })
            }else{
                res.json({auth: false, message: "User with that email doesn't exist."})
                // res.send({message: "User with that email doesn't exist."})
            }
        }
    })
}

// get all user list
exports.getUserList = (req, res)=> {
    userModel.getAllUsers(req.params.attr, req.params.sort, (err, users) =>{
        if(err){
            res.send(err);
        }else{
            res.json({auth: true, users: users})
        }
    })
}
 
// get user by Name for earch by Name 
exports.getUserByName = (req, res)=>{
    //console.log('get emp by id');
    userModel.getUserByName(req.params.name, (err, user)=>{
        if(err){
            res.send(err);
        }else{
            res.send(user)
        }
    })
}
 
// get user by ID  for Update 
exports.getUserByID = (req, res)=>{
    //console.log('get emp by id');
    userModel.getUserByID(req.params.id, (err, user)=>{
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify({ status: 200, error: null, response: user }));
        }
    })
}
 
// create new user
exports.createNewUser = (req, res) =>{
    
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            req.body.password = hash
            const userReqData = new userModel(req.body);
            userModel.createUser(userReqData, (err, users)=>{
                if(err){
                    res.send(err);
                }else{
                    res.json({status: true, message: 'User Created Successfully', users: users})
                }
            })
        })
    }
}
 
// update user
exports.updateUser = (req, res)=>{
    const userReqData = new userModel(req.body);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            userModel.updateUser(req.body.id, userReqData, (err, users)=>{
                if(err){
                    res.send(err);
                }else{
                    res.json({status: true, message: 'User updated Successfully', users: users})
                }
            })
        })
    }
}
 
// delete user
exports.deleteUser = (req, res)=>{
    userModel.deleteUser(req.params.id, (err, user)=>{
        if(err){
            res.send(err);
        }else{
            res.json({success:true, message: 'User deleted successully!'});
        }
    })
}