import React from 'react'
import { useLocation, useHistory } from 'react-router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userService } from '../Service/User'

function Form({isUpdate, schema, preloadedValues}) {

    const { register, handleSubmit, formState: {errors}, clearErrors } = useForm({
        resolver: yupResolver(schema),
        defaultValues: preloadedValues
    })
    const { state } = useLocation()
    const history = useHistory()
    const [jobs, setJobs] = React.useState([])

    const loadJobs = () => {
        userService.getJobdesc('job', 'ASC').then((response) => {
            setJobs(response.data.jobs)
        })
    }
    React.useEffect(loadJobs, [])

    const submitForm = (data) => {
        if(!isUpdate){
            userService.createUser(data).then((response) => {
                history.replace({pathname: '/users', state: { message: "User "+data.name+" created", success: true, userList: response.data.users }})
            })
        }else{
            userService.updateUser(data).then((response) => {
                history.replace({pathname: '/users', state: { message: "User "+data.name+" updated", success: true, userList: response.data.users }})
            })
        }
    }

    return (
        <form className="mt-6" onSubmit={handleSubmit(submitForm)} action="/users">
            <input {...register('id')} type="hidden" value={state ? state.user.id:''} name="id" />
            
            <label htmlFor="name" className="block text-xs font-semibold text-gray-600 uppercase">Name <span className="text-red-400">*</span></label>
                <input 
                {...register('name')}
                onChange={(e) => clearErrors('name')}
                id="name" type="text" name="name" placeholder="John Doe" autoComplete="name" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.name?.message}</span>
            
            <label htmlFor="email" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">E-mail <span className="text-red-400">*</span></label>
            <input 
                {...register('email')}
                onChange={(e) => clearErrors('email')}
                id="email" type="email" name="email" placeholder="john.doe@company.com" autoComplete="email" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.email?.message}</span>
            
            <label htmlFor="jobdesc" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">Job Desc <span className="text-red-400">*</span></label>
            <select
                {...register('jobdesc')}
                onChange={(e) => clearErrors('jobdesc')} name="jobdesc" id="jobdesc" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400">
                <option value="">----- Select Jobdesc -----</option>
                {
                    jobs.map((val, key) => {
                        return (
                            <option key={key} value={val.id}>{val.job}</option>
                        )
                    })
                }
            </select>
            <span className="text-xs text-red-500">{errors.jobdesc?.message}</span>

            <label htmlFor="password" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">Password <span className="text-red-400">*</span></label>
            <input 
                {...register('password')}
                onChange={(e) => clearErrors('password')}
                id="password" type="password" name="password" placeholder="********" autoComplete="new-password" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.password?.message}</span>

            <label htmlFor="confirmPassword" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">Confirm password</label>
            <input 
                {...register('confirmPassword')}
                onChange={(e) => clearErrors('confirmPassword')}
                id="password-confirm" type="password" name="confirmPassword" placeholder="********" autoComplete="new-password" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.confirmPassword && "Confirm Password not match !"}</span>

            <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                Submit
            </button>
            <p className="flex justify-between inline-block mt-4 text-xs text-red-500">Required fields are marked with an asterisk *</p>
        </form>
    )
}

export default Form