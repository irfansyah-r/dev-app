import { BehaviorSubject } from 'rxjs'
import Axios from 'axios'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
// const requestOptions = {
//     headers: {
//         "Authorization": localStorage.getItem("token")
//     }
// }

export const authService = {
    checkAuth, login, logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserVal () { return currentUserSubject.value }
}

function checkAuth() {
    return Axios.get('http://localhost:3001/api/user/check-auth', {headers: {"Authorization": localStorage.getItem("token")}})
}

function login(email, password){
    return Axios.post('http://localhost:3001/api/user/login', {
        email: email,
        password: password
    })
}

function logout() {
    return Axios.get('http://localhost:3001/api/user/logout', {headers: {"Authorization": localStorage.getItem("token")}}).then((response) => {
        localStorage.removeItem("token")
    })
}