import React from 'react'
import Layout from '../../Components/Layout'
import myForm from '../../Components/JobForm'
import { useHistory } from 'react-router'

import { authService } from '../../Service/Authentication'

import * as yup from 'yup'
const schema = yup.object().shape({
    id: yup.string(),
    job: yup.string().required('Job should not be empty !'),
    description: yup.string().required('Description should not be empty !'),
})

function CreateJob() {
    const history = useHistory()
    const loadPage = () => {
        authService.checkAuth().then((response) => {
            if(!response.data.auth){
                history.replace({pathname: '/', state: { message: "You need to login"}})
            }
        })
    }
    React.useEffect(loadPage, [history])

    const createForm = React.createElement(myForm, {isUpdate:false, schema:schema, preloadedValues: {}})    
    return (
        <Layout>
            <div className="w-full h-screen px-4 md:px-8 px-10 pr-8 overflow-hidden">
                <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                    <h1 className="text-xl font-semibold">Create new job</h1>
                        {createForm}
                </div>
            </div>
        </Layout>
    )
}

export default CreateJob
