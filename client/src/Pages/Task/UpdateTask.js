import React from 'react'
import { useLocation, useHistory, Redirect } from 'react-router'
import Layout from '../../Components/Layout'
import myForm from '../../Components/TaskForm'

import { authService } from '../../Service/Authentication'

import * as yup from 'yup'
const schema = yup.object().shape({
    id: yup.string(),
    task: yup.string().required('Task should not be empty !'),
    status: yup.string().required('Status should not be empty !'),
    deadline: yup.date().required('Deadline should not be empty !'),
})

function UpdateTask() {
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
            task: state.task.task,
            status: state.task.status,
            deadline: state.task.deadline
        } : {}

    const updateForm = React.createElement(myForm, {isUpdate:true, schema:schema, preloadedValues:preloadedValues})

    
    return (
        <Layout>
        <div className="w-full h-screen px-4 md:px-8 px-10 pr-8 overflow-hidden">
            <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                <h1 className="text-xl font-semibold">Update task</h1>
                {state ? updateForm : <Redirect to="/tasks" />}
            </div>
        </div>
        </Layout>
    )
}

export default UpdateTask
