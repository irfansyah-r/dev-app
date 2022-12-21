import Axios from 'axios'

export const jobService = {
    getAll,
    createJob,
    updateJob,
    deleteJob,
}
// const requestOptions = {
//     headers: {
//         "Authorization": localStorage.getItem("token")
//     }
// }

function getAll(attr, sort) {
    return Axios.get('http://localhost:3001/api/job/'+attr+'/'+sort, {headers: {"Authorization": localStorage.getItem("token")}})
}

function createJob(data) {
    console.log(data)
    return Axios.post('http://localhost:3001/api/job', {
        job: data.job,
        description: data.description
    }, {headers: {"Authorization": localStorage.getItem("token")}})
}

function updateJob(data) {
    return Axios.put('http://localhost:3001/api/job/', {
        id: data.id,
        job: data.job,
        description: data.description
    }, {headers: {"Authorization": localStorage.getItem("token")}})
}

function deleteJob(id) {
    return Axios.delete('http://localhost:3001/api/job/'+id, {headers: {"Authorization": localStorage.getItem("token")}})
}