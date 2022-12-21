const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

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
        res.json({auth: false, message : "You need to Login first"})
    }
}

const globalController = require('../controllers/globalController');

router.get('/', verifyJWT, globalController.getDataCount);

// router.get('/', verifyJWT, (err, res) => {
//     dbConn.query('SELECT ( SELECT COUNT(*) FROM users ) AS user_count, ( SELECT COUNT(*) FROM jobdesc ) AS job_count, ( SELECT COUNT(*) FROM tasks ) AS task_count FROM dual', (error, result)=>{
//         if(error){
//             res.send(error)
//         }else{
//             console.log(result)
//             res.send(result)
//         }
//     })
// })

module.exports = router;