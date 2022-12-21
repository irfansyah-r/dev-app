const jobModel = require('../models/jobModel');

// get all job list
exports.getJobList = (req, res)=> {
    jobModel.getAllJobs(req.params.attr, req.params.sort, (err, jobs) =>{
        if(err){
            res.send(err);
        }else{
            res.json({auth: true, jobs: jobs})
        }
    })
}
 
// get job by ID  for Update 
exports.getJobByID = (req, res)=>{
    //console.log('get emp by id');
    jobModel.getJobByID(req.params.id, (err, job)=>{
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify({ status: 200, error: null, response: job }));
        }
    })
}
 
// create new job
exports.createNewJob = (req, res) =>{
    
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        const jobReqData = new jobModel(req.body);
        jobModel.createJob(jobReqData, (err, job)=>{
            if(err){
                res.send(err);
            }else{
                res.json({status: true, message: 'Job Created Successfully', data: job.insertId})
            }
        })
    }
}
 
// update job
exports.updateJob = (req, res)=>{
    const jobReqData = new jobModel(req.body);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        jobModel.updateJob(req.body.id, jobReqData, (err, job)=>{
            if(err){
                res.send(err);
            }else{
                res.json({status: true, message: 'Job updated Successfully'})
            }
        })
    }
}
 
// delete job
exports.deleteJob = (req, res)=>{
    jobModel.deleteJob(req.params.id, (err, job)=>{
        if(err){
            res.send(err);
        }else{
            res.json({success:true, message: 'Job deleted successully!'});
        }
    })
}