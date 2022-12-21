import React from 'react'
import { useLocation, Redirect } from 'react-router'
import Layout from '../../Components/Layout'
import myForm from '../../Components/UserForm'
import { useHistory } from 'react-router-dom'

import { authService } from '../../Service/Authentication'

import * as yup from 'yup'
const schema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required('Name should not be empty !'),
    email: yup.string().email().required('Email should not be empty !'),
    jobdesc: yup.string().required('Jobdesc should not be empty !'),
    password: yup.string(),
    confirmPassword: yup.string()
})

function UpdateUser() {
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
    const preloadedValues = 
        (state) ? 
        {
            name: state.user.name,
            email: state.user.email,
            jobdesc: state.user.jobdesc_id,
            password: state.user.password,
            confirmPassword: state.user.password,
        } : {}

    const updateForm = React.createElement(myForm, {isUpdate:true, schema:schema, preloadedValues:preloadedValues})

    
    return (
        <Layout>
        <div className="w-full h-screen px-4 md:px-8 px-10 pr-8 overflow-hidden">
            <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                <h1 className="text-xl font-semibold">Update user</h1>
                {state ? updateForm : <Redirect to="/users" />}
            </div>
        </div>
        </Layout>
    )
}

export default UpdateUser
