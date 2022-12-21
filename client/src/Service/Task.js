import Axios from 'axios'

export const taskService = {
    getAll,
    createTask,
    updateTask,
    deleteTask,
}
// const requestOptions = {
//     headers: {
//         "Authorization": localStorage.getItem("token")
//     }
// }

function getAll(attr, sort) {
    return Axios.get('http://localhost:3001/api/task/'+attr+'/'+sort, {headers: {"Authorization": localStorage.getItem("token")}})
}

function createTask(data) {
    return Axios.post('http://localhost:3001/api/task', {
        task: data.task,
        status: data.status,
        deadline: data.deadline
    }, {headers: {"Authorization": localStorage.getItem("token")}})
}

function updateTask(data) {
    return Axios.put('http://localhost:3001/api/task/', {
        id: data.id,
        task: data.task,
        status: data.status,
        deadline: data.deadline
    }, {headers: {"Authorization": localStorage.getItem("token")}})
}

function deleteTask(id) {
    return Axios.delete('http://localhost:3001/api/task/'+id, {headers: {"Authorization": localStorage.getItem("token")}})
}