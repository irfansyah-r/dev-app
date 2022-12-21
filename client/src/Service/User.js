import Axios from 'axios'

export const userService = {
    getAll,
    createUser,
    updateUser,
    deleteUser,
    getJobdesc
}
// const requestOptions = {
//     headers: {
//         "Authorization": localStorage.getItem("token")
//     }
// }

function getAll(attr, sort) {
    return Axios.get('http://localhost:3001/api/user/'+attr+'/'+sort, {headers: {"Authorization": localStorage.getItem("token")}})
}

function getJobdesc(attr, sort){
    return Axios.get('http://localhost:3001/api/job/'+attr+'/'+sort, {headers: {"Authorization": localStorage.getItem("token")}})
}

function createUser(data) {
    return Axios.post('http://localhost:3001/api/user', {
        name: data.name,
        email: data.email,
        jobdesc: data.jobdesc,
        password: data.password
    }, {headers: {"Authorization": localStorage.getItem("token")}})
}

function updateUser(data) {
    return Axios.put('http://localhost:3001/api/user/', {
        id: data.id,
        name: data.name,
        email: data.email,
        jobdesc: data.jobdesc,
        password: data.password
    }, {headers: {"Authorization": localStorage.getItem("token")}})
}

function deleteUser(id) {
    return Axios.delete('http://localhost:3001/api/user/'+id, {headers: {"Authorization": localStorage.getItem("token")}})
}