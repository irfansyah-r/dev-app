import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import { RiAddLine, RiEdit2Line, RiDeleteBin5Line } from "react-icons/ri"
import { Link, useLocation, useHistory } from 'react-router-dom'
import cx from 'classnames'

import { taskService } from '../../Service/Task'

function Tasks() {

    const { state } = useLocation()
    const history = useHistory()
    const [error, setError] = useState(true)
    const [taskList, setTaskList] = useState(
        state ? state.taskList ? state.taskList : [] : []
    )
    const [message, setMessage] = useState(
        state ? state.message ? state.message : '' : ''
    )
    const [isAlert, setIsAlert] = useState(
        state ? state.success ? true:false : false
    )

    const loadData = () => {
        taskService.getAll('task', 'ASC').then((response) => {
            if(response.data.auth){
                // let data = response.data.tasks
                // data.deadline = [
                //     data.deadline.getFullYear(), 
                //     ('0' + (data.deadline.getMonth() + 1)).slice(-2), 
                //     ('1' + data.deadline.getDate()).slice(-2)
                // ].join('-')
                setError(false)
                setTaskList(response.data.tasks)
            }else{
                history.replace({pathname: '/', state: { message: "You need to login"}})
            }
        }).catch((error) => { 
            setError(error) 
        })
        window.history.replaceState({}, document.title)
    }
    React.useEffect(loadData, [history])

    const deleteTask = (id, name) => {
        var result = window.confirm("Want to delete?");
        if(result){
            taskService.deleteTask(id).then((response) => {
                loadData()
                setMessage("Task "+name+" succesfully deleted")
                triggerAlert()
            })
        }
    }

    const triggerAlert = () => {
        setIsAlert(!isAlert)
        window.history.replaceState({}, document.title)
    }

    const loadTable = () => {
        if(taskList.length === 0 || taskList.length === undefined){
            return (
                <tr className="hover:bg-gray-100 border-b border-gray-200 py-10">
                    <td className="px-4 py-4 font-semibold text-center" colSpan="6">{error ? 'Server is not running - Try restart the server)':'MySQL Connection Failed - Connect to MySQL and restart server'}</td>
                </tr>
            )
        }else{
            return taskList.map((val, key) => {
                let date = new Date(val.deadline)
                val.deadline = [
                    date.getFullYear(), 
                    ('0' + (date.getMonth() + 1)).slice(-2), 
                    ('0' + date.getDate()).slice(-2)
                ].join('-')
                return (
                    <tr key={key} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                        <td className="px-4 py-4">{val.task}</td>
                        <td className="px-4 py-4">{val.status}</td>
                        <td className="px-4 py-4">{val.deadline}</td>
                        <td className="px-4 py-4 flex space-x-2">
                            <Link to={{ pathname: "/task/edit/"+val.id, state: {task: val} }} className="flex items-center justify-center text-black bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full">
                                <RiEdit2Line />
                            </Link>
                            <Link to={"/tasks"} onClick={() => {deleteTask(val.id, val.name)}} className="flex items-center justify-center text-black bg-red-500 hover:bg-red-600 p-2 rounded-full">
                                <RiDeleteBin5Line />
                            </Link>
                        </td>
                    </tr>
                )
            })
        }
    }

    return (
        <Layout>
            <div className="w-full px-4 md:px-8 px-10 pr-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className={cx("bg-green-200 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded relative", {"hidden": !isAlert})} role="alert">
                        <strong className="font-bold">Success ! </strong>
                        <span className="block sm:inline">{(message !== '') ? message:''}</span>
                        <span onClick={() => triggerAlert()} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-black" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>
                    <div className="flex justify-between items-center w-full pb-6">
                        <p className="ml-3"> Tasks Table</p>
                        { (taskList.length > 0 && taskList.length !== undefined) && 
                            <Link to={"/task/add"} className="bg-black hover:bg-gray-800 text-white rounded-lg flex items-center p-1 px-2">
                                <RiAddLine /> Add Task
                            </Link>
                        }
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full">
                            <thead>
                                <tr className="text-sm font-medium text-gray-700 text-left">
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Task</th>
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Status</th>
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Deadline</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-normal text-gray-700">

                                { loadTable() }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Tasks
