import React from 'react'
import { useLocation, useHistory, Redirect } from 'react-router'
import Layout from '../../Components/Layout'
import myForm from '../../Components/JobForm'

import { authService } from '../../Service/Authentication'

import * as yup from 'yup'
const schema = yup.object().shape({
    id: yup.string(),
    job: yup.string().required('Job should not be empty !'),
    description: yup.string().required('Description should not be empty !'),
})

function UpdateJob() {
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
            job: state.job.job,
            description: state.job.description,
        } : {}

    const updateForm = React.createElement(myForm, {isUpdate:true, schema:schema, preloadedValues:preloadedValues})

    
    return (
        <Layout>
        <div className="w-full h-screen px-4 md:px-8 px-10 pr-8 overflow-hidden">
            <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                <h1 className="text-xl font-semibold">Update job</h1>
                {state ? updateForm : <Redirect to="/jobs" />}
            </div>
        </div>
        </Layout>
    )
}

export default UpdateJob
