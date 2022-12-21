import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import { RiAddLine, RiEdit2Line, RiDeleteBin5Line, RiInformationLine } from "react-icons/ri"
import { Link, useLocation, useHistory } from 'react-router-dom'
import cx from 'classnames'

import { userService } from '../../Service/User'

function Users() {

    const { state } = useLocation()
    const history = useHistory()
    const [error, setError] = useState(true)
    const [userList, setUserList] = useState(
        state ? state.userList ? state.userList : [] : []
    )
    const [message, setMessage] = useState(
        state ? state.message ? state.message : '' : ''
    )
    const [isAlert, setIsAlert] = useState(
        state ? state.success ? true:false : false
    )

    const loadData = () => {
        userService.getAll('name', 'ASC').then((response) => {
            if(response.data.auth){
                setError(false)
                setUserList(response.data.users)
            }else{
                history.replace({pathname: '/', state: { message: "You need to login"}})
            }
        }).catch((error) => { 
            setError(error) 
        })
        window.history.replaceState({}, document.title)
    }
    React.useEffect(loadData, [history])

    const deleteUser = (id, name) => {
        var result = window.confirm("Want to delete?");
        if(result){
            userService.deleteUser(id).then((response) => {
                loadData()
                // setUserList(userList.filter((val) => {
                //     return val.id !== id
                // }))
                setMessage("User "+name+" succesfully deleted")
                triggerAlert()
            })
        }
    }

    const triggerAlert = () => {
        setIsAlert(!isAlert)
        window.history.replaceState({}, document.title)
    }

    const loadTable = () => {
        if(userList === undefined){
            return (
                <tr className="hover:bg-gray-100 border-b border-gray-200 py-10">
                    <td className="px-4 py-4 font-semibold text-center" colSpan="6">{error ? 'Server is not running - Try restart the server)':'MySQL Connection Failed - Connect to MySQL and restart server'}</td>
                </tr>
            )
        }else{
            return userList.map((val, key) => {
                return (
                    <tr key={key} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                        <td className="px-4 py-4">{val.name}</td>
                        <td className="px-4 py-4">{val.email}</td>
                        <td className="px-4 py-4">{val.job}</td>
                        <td className="px-4 py-4">858</td>
                        <td className="px-4 py-4">{val.created_at.split('-')[0]}</td>
                        <td className="px-4 py-4 flex space-x-2">
                            <Link to={{ pathname: "/user/details/"+val.id, state: {user: val} }} className="flex items-center justify-center text-black bg-blue-400 hover:bg-blue-500 p-2 rounded-full">
                                <RiInformationLine />
                            </Link>
                            <Link to={{ pathname: "/user/edit/"+val.id, state: {user: val, userList: userList} }} className="flex items-center justify-center text-black bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full">
                                <RiEdit2Line />
                            </Link>
                            <Link to={"/users"} onClick={() => {deleteUser(val.id, val.name)}} className="flex items-center justify-center text-black bg-red-500 hover:bg-red-600 p-2 rounded-full">
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
                        <p className="ml-3"> Users Table</p>
                        { (userList !== undefined) && 
                            <Link to={"/user/add"} className="bg-black hover:bg-gray-800 text-white rounded-lg flex items-center p-1 px-2">
                                <RiAddLine /> Add User
                            </Link>
                        }
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full">
                            <thead>
                                <tr className="text-sm font-medium text-gray-700 text-left">
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Name </th>
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Email</th>
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Job Desc</th>
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Task Handled</th>
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Hired Since</th>
                                    <th className="px-4 py-2 rounded-lg bg-gray-50">Action</th>
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

export default Users