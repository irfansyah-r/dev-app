// var stablishedConnection  = require('../config/db.config');
var dbConn  = require('../config/db.config');
 
var Job = function(job){
    this.job            =   job.job;
    this.description    =   job.description;
}
 
// get all jobs
Job.getAllJobs = (attr, sort, result) =>{
    dbConn.query('SELECT * FROM `jobdesc` ORDER BY '+attr+' '+sort, (err, res)=>{
        result(err, res)
    })
}
 
// get job by ID for update
Job.getJobByID = (id, result)=>{
    dbConn.query('SELECT * FROM jobdesc WHERE id=?', id, (err, res)=>{
        result(err, res)
    })
}
 
// create new job
Job.createJob = (jobReqData, result) =>{
    dbConn.query('INSERT INTO `jobdesc`(`job`, `description` ) VALUES (?,?)', Object.values(jobReqData), (err, res)=>{
        if(err){
            result(err);
        }else{
            dbConn.query('SELECT * FROM `jobdesc`', (err, res)=>{
                result(err, res)
            })
        }
    })
}
 
// update job
Job.updateJob = (id, jobReqData, result)=>{
    let data = [ jobReqData.job, jobReqData.description, id ]

    dbConn.query("UPDATE `jobdesc` SET `job` = ?, `description` = ? WHERE id = ?", data, (err, res) => {
        if(err){
            result(err, res)
        }else{
            dbConn.query('SELECT * FROM `jobdesc`', (err, res)=>{
                result(err, res)
            })
        }
    });
}
 
// delete job
Job.deleteJob = (id, result)=>{
    dbConn.query('DELETE FROM jobdesc WHERE id=?', [id], (err, res)=>{
        result(err, res)
    })
}
 
module.exports = Job;