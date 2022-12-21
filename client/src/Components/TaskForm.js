import React from 'react'
import { useLocation, useHistory } from 'react-router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { taskService } from '../Service/Task'

function TaskForm({isUpdate, schema, preloadedValues}) {

    const { register, handleSubmit, formState: {errors}, clearErrors } = useForm({
        resolver: yupResolver(schema),
        defaultValues: preloadedValues
    })
    const { state } = useLocation()
    const history = useHistory()
    const d = new Date()
    const today = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('1' + d.getDate()).slice(-2)
      ].join('-')

    const submitForm = (data) => {
        data.deadline = [
            data.deadline.getFullYear(), 
            ('0' + (data.deadline.getMonth() + 1)).slice(-2), 
            ('0' + data.deadline.getDate()).slice(-2)
        ].join('-')
        if(!isUpdate){
            taskService.createTask(data).then((response) => {
                history.replace({pathname: '/tasks', state: { message: "Task "+data.task+" created", success: true, taskList: response.data.tasks }})
            })
        }else{
            taskService.updateTask(data).then((response) => {
                history.replace({pathname: '/tasks', state: { message: "Task "+data.task+" updated", success: true, taskList: response.data.tasks }})
            })
        }
    }

    return (
        <form className="mt-6" onSubmit={handleSubmit(submitForm)} action="/tasks">
            <input {...register('id')} type="hidden" value={state ? state.task.id:''} name="id" />
            
            <label htmlFor="task" className="block text-xs font-semibold text-gray-600 uppercase">Task <span className="text-red-400">*</span></label>
                <input 
                {...register('task')}
                onChange={(e) => clearErrors('task')}
                id="task" type="text" name="task" placeholder="Task..." autoComplete="task" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.task?.message}</span>
            
            <label htmlFor="status" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">Status <span className="text-red-400">*</span></label>
            <input 
                {...register('status')}
                onChange={(e) => clearErrors('status')}
                id="status" type="text" name="status" placeholder="Task status..." autoComplete="status" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.status?.message}</span>
            
            <label htmlFor="deadline" className="block mt-4 text-xs font-semibold text-gray-600 uppercase">Deadline <span className="text-red-400">*</span></label>
            <input 
                {...register('deadline')}
                onChange={(e) => clearErrors('deadline')}
                min={today}
                id="deadline" type="date" name="deadline" placeholder="Task deadline..." autoComplete="deadline" className="block w-full p-1 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                <span className="text-xs text-red-500">{errors.deadline?.message}</span>

            <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                Submit
            </button>
            <p className="flex justify-between inline-block mt-4 text-xs text-red-500">Required fields are marked with an asterisk *</p>
        </form>
    )
}

export default TaskForm
