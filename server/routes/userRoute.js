const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if(token){
        jwt.verify(token, "DevSecretJWT", (err, decoded) => {
            if(err){
                res.json({auth: false, message : "Failed to authenticated"})
            }else{
                req.userId = decoded.id
                next()
            }
        })
    }else{
        res.json({auth: false, message : "You need to Login"})
    }
}

const userController = require('../controllers/userController');

// get Login
router.get('/check-auth', verifyJWT, userController.checkAuth)
router.post('/login', userController.login)

// get all users
router.get('/:attr/:sort', verifyJWT, userController.getUserList);
 
// get user by ID
router.get('/:id', verifyJWT,userController.getUserByID);
 
 
// get ID for Update 
router.get('/searchRecord/:first_name', verifyJWT,userController.getUserByName);
 
// create new user
router.post('/', verifyJWT, userController.createNewUser);
 
// update user
router.put('/', verifyJWT, userController.updateUser);

//Logout
router.post('/logout', verifyJWT, userController.updateUser);
 
// delete user
router.delete('/:id', verifyJWT,userController.deleteUser);
 
module.exports = router;