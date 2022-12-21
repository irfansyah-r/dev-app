import React from 'react'
import Layout from '../Components/Layout'
import { useHistory } from 'react-router-dom'

import { globalService } from '../Service/Global'

function Home() {
    const history = useHistory()
    const [dataCount, setDataCount] = React.useState([])
    const loadPage = () => {
        globalService.getDataCount().then((response) => {
            if(!response.data.auth){
                history.replace({pathname: '/', state: { message: response.data.message}})
            }else{
                // console.log(response.data.result[0])
                setDataCount(response.data.result[0])
            }
        })
    }
    React.useEffect(loadPage, [history])

    return (
        <Layout>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 md:px-8 px-10 pr-8 overflow-hidden">
                <div className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                    <div className="p-3 mr-4 bg-blue-500 text-white rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-900">Tasks</p>
                        <p className="text-sm font-normal text-gray-800">{dataCount.task_count} Tasks</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                    <div className="p-3 mr-4 bg-blue-500 text-white rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-900">Developer</p>
                        <p className="text-sm font-normal text-gray-800">{dataCount.user_count} Developers</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                    <div className="p-3 mr-4 bg-blue-500 text-white rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-900">Jobdesc</p>
                        <p className="text-sm font-normal text-gray-800">{dataCount.job_count} Jobdesc</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                    <div className="p-3 mr-4 bg-blue-500 text-white rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-900">Analytics</p>
                        <p className="text-sm font-normal text-gray-800">User and customer analytics</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home