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

const jobController = require('../controllers/jobController');

// get all jobs
router.get('/:attr/:sort', verifyJWT, jobController.getJobList);
 
// get job by ID
router.get('/:id', verifyJWT, jobController.getJobByID);
 
// create new job
router.post('/', verifyJWT, jobController.createNewJob);
 
// update job
router.put('/', verifyJWT, jobController.updateJob);
 
// delete job
router.delete('/:id', verifyJWT,jobController.deleteJob);
 
module.exports = router;