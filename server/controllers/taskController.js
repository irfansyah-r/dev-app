const taskModel = require('../models/taskModel');

// get all task list
exports.getTaskList = (req, res)=> {
    taskModel.getAllTasks(req.params.attr, req.params.sort, (err, tasks) =>{
        if(err){
            res.send(err);
        }else{
            res.json({auth: true, tasks: tasks})
        }
    })
}
 
// get task by ID  for Update 
exports.getTaskByID = (req, res)=>{
    //console.log('get emp by id');
    taskModel.getTaskByID(req.params.id, (err, task)=>{
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify({ status: 200, error: null, response: task }));
        }
    })
}
 
// create new task
exports.createNewTask = (req, res) =>{
    // console.log(req.body)
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        const taskReqData = new taskModel(req.body);
        taskModel.createTask(taskReqData, (err, tasks)=>{
            if(err){
                res.send(err);
            }else{
                res.json({status: true, message: 'Task Created Successfully', tasks: tasks})
            }
        })
    }
}
 
// update task
exports.updateTask = (req, res)=>{
    const taskReqData = new taskModel(req.body);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        taskModel.updateTask(req.body.id, taskReqData, (err, task)=>{
            if(err){
                res.send(err);
            }else{
                res.json({status: true, message: 'Task updated Successfully', tasks: tasks})
            }
        })
    }
}
 
// delete task
exports.deleteTask = (req, res)=>{
    taskModel.deleteTask(req.params.id, (err, task)=>{
        if(err){
            res.send(err);
        }else{
            res.json({success:true, message: 'Task deleted successully!'});
        }
    })
}