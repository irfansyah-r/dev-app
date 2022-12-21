import React from 'react'
import Layout from '../../Components/Layout'
import { useLocation, Redirect, useHistory } from 'react-router'

import { authService } from '../../Service/Authentication'

function Details() {
    const history = useHistory()
    const loadPage = () => {
        authService.checkAuth().then((response) => {
            if(!response.data.auth){
                history.replace({pathname: '/', state: { message: "You need to login"}})
            }
        })
    }
    React.useEffect(loadPage, [history])
    const { state } = useLocation()

    const loadDetails = () => {
        if(state !== undefined){
            return (
                <div className="w-96 px-4 md:px-8 px-10 pr-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-xl font-semibold mb-6">User {state.user.name.split(' ')[0]} Details</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="w-2/4 h-16 bg-gray-50 border-8 rounded-2xl pl-4 border-white">Name</td>
                                    <td className="bg-gray-50 border-8 border-white pl-4 ">{state.user.name}</td>
                                </tr>
                                <tr>
                                    <td className="w-2/4 h-16 bg-gray-50 border-8 rounded-2xl pl-4 border-white">Email</td>
                                    <td className="bg-gray-50 border-8 border-white pl-4 ">{state.user.email}</td>
                                </tr>
                                <tr>
                                    <td className="w-2/4 h-16 bg-gray-50 border-8 rounded-2xl pl-4 border-white">Jobdesc</td>
                                    <td className="bg-gray-50 border-8 border-white pl-4 ">{state.user.job}</td>
                                </tr>
                                <tr>
                                    <td className="w-2/4 h-16 bg-gray-50 border-8 rounded-2xl pl-4 border-white">Work Since</td>
                                    <td className="bg-gray-50 border-8 border-white pl-4 ">{state.user.created_at.split('T')[0]}</td>
                                </tr>
                                <tr>
                                    <td className="w-2/4 h-16 bg-gray-50 border-8 rounded-2xl pl-4 border-white">Name</td>
                                    <td className="bg-gray-50 border-8 border-white pl-4 ">{state.user.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }else{
            <Redirect to="/users" />
        }
    }

    return (
        <Layout>
            {loadDetails()}
        </Layout>
    )
}

export default Details