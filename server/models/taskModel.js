// var stablishedConnection  = require('../config/db.config');
var dbConn  = require('../config/db.config');
 
var Task = function(task){
    this.task       =   task.task;
    this.status     =   task.status;
    this.deadline     =   task.deadline;
}
 
// get all tasks
Task.getAllTasks = (attr, sort, result) =>{
    dbConn.query('SELECT * FROM `tasks` ORDER BY '+attr+' '+sort, (err, res)=>{
        result(err, res)
    })
}
 
// get task by ID for update
Task.getTaskByID = (id, result)=>{
    dbConn.query('SELECT * FROM tasks WHERE id=?', id, (err, res)=>{
        result(err, res)
    })
}
 
// create new task
Task.createTask = (taskReqData, result) =>{
    dbConn.query('INSERT INTO `tasks`(`task`, `status`, `deadline` ) VALUES (?,?,?)', Object.values(taskReqData), (err, res)=>{
        if(err){
            result(err);
        }else{
            dbConn.query('SELECT * FROM `tasks`', (err, res)=>{
                result(err, res)
            })
        }
    })
}
 
// update task
Task.updateTask = (id, taskReqData, result)=>{
    const data = [ taskReqData.task, taskReqData.status, taskReqData.deadline, id ]
    // console.log(data, id)

    dbConn.query("UPDATE `tasks` SET `task` = ?, `status` = ?, `deadline` = ? WHERE id = ?", data, (err, res) => {
        if(err){
            result(err, res)
        }else{
            dbConn.query('SELECT * FROM `task`', (err, res)=>{
                result(err, res)
            })
        }
    });
}
 
// delete task
Task.deleteTask = (id, result)=>{
    dbConn.query('DELETE FROM tasks WHERE id=?', [id], (err, res)=>{
        result(err, res)
    })
}
 
module.exports = Task;