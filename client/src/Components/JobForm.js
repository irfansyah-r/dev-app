import React from 'react'
import { useLocation, useHistory } from 'react-router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { jobService } from '../Service/Job'

function JobForm({isUpdate, schema, preloadedValues}) {

    const { register, handleSubmit, formState: {errors}, clearErrors } = useForm({
        resolver: yupResolver(schema),
        defaultValues: preloadedValues
    })
    const { state } = useLocation()
    const history = useHistory()
    const submitForm = (data) => {
        if(!isUpdate){
            jobService.createJob(data).then((response) => {
                history.replace({pathname: '/jobs', state: { message: "Job "+data.job+" created", success: true, jobList: response.data }})
            })
        }else{
            jobService.updateJob(data).then((response) => {
                history.replace({pathname: '/jobs', state: { message: "Job "+data.job+" updated", success: true, jobList: response.data }})
            })
        }
    }

    return (
        <form className="mt-6" onSubmit={handleSubmit(submitForm)} action="/jobs">
            <input {...register('id')} type="hidden" value={state ? state.job.id:''} name="id" />
            
            <label htmlFor="job" className="block text-xs font-semibold text-gray-600 uppercase">Job <span className="text-red-400">*</span></label>
                <input 
                {...register('job')}
                onChange={(e) => clearErrors('job')}
                id="job" type="text" name="job" placeholder="Job..." autoComplete="job" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.task?.message}</span>
            
            <label htmlFor="description" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">Description <span className="text-red-400">*</span></label>
            <input 
                {...register('description')}
                onChange={(e) => clearErrors('description')}
                id="description" type="text" name="description" placeholder="Job Description..." autoComplete="description" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.description?.message}</span>

            <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                Submit
            </button>
            <p className="flex justify-between inline-block mt-4 text-xs text-red-500">Required fields are marked with an asterisk *</p>
        </form>
    )
}

export default JobForm
