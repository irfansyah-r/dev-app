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

const taskController = require('../controllers/taskController');

// get all tasks
router.get('/:attr/:sort', verifyJWT, taskController.getTaskList);
 
// get task by ID
router.get('/:id', verifyJWT, taskController.getTaskByID);
 
// create new task
router.post('/', verifyJWT, taskController.createNewTask);
 
// update task
router.put('/', verifyJWT, taskController.updateTask);
 
// delete task
router.delete('/:id', verifyJWT,taskController.deleteTask);
 
module.exports = router;