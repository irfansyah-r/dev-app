import Axios from 'axios'

export const globalService = {
    getDataCount
}
// const requestOptions = {
//     headers: {
//         "Authorization": localStorage.getItem("token")
//     }
// }

function getDataCount() {  
    return Axios.get('http://localhost:3001/api/data', {headers: {"Authorization": localStorage.getItem("token")}})
}