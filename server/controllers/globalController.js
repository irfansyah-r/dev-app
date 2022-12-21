var dbConn  = require('../config/db.config');

exports.getDataCount = (req, res) => {
    dbConn.query('SELECT ( SELECT COUNT(*) FROM users ) AS user_count, ( SELECT COUNT(*) FROM jobdesc ) AS job_count, ( SELECT COUNT(*) FROM tasks ) AS task_count FROM dual', (error, result)=>{
        if(error){
            res.send(error)
        }else{
            res.json({auth: true, result: result})
        }
    })
}