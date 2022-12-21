import React from 'react'
import Layout from '../../Components/Layout'
import myForm from '../../Components/UserForm'
import { useHistory } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

import { authService } from '../../Service/Authentication'

import * as yup from 'yup'
const schema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required('Name should not be empty !'),
    email: yup.string().email().required('Email should not be empty !'),
    jobdesc: yup.string().required('Jobdesc should not be empty !'),
    password: yup.string().min(6).required('Password should not be empty !'),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})

// const uploadSchema = yup.object().shape({
//     photo: yup.mixed().test("fileSize", "The file is too large (Max 2 MB)", (value) => {
//         return value && value[0].size <= 2000000
//     })
// })

function CreateUser() {
    const history = useHistory()
    const loadPage = () => {
        authService.checkAuth().then((response) => {
            if(!response.data.auth){
                history.replace({pathname: '/', state: { message: "You need to login"}})
            }
        })
    }
    React.useEffect(loadPage, [history])

    // const { register, handleSubmit, formState: {errors} } = useForm({
    //     resolver: yupResolver(uploadSchema)
    // })

    // const imageSubmit = (data) => {
    //     var imageHandler = new FormData()
    //     imageHandler.append('image', data.photo[0], 'name')
    //     for (var key of imageHandler.entries()) {
    //         console.log(key[0] + ', ' + key[1]);
    //     }
    // }

    const createForm = React.createElement(myForm, {isUpdate:false, schema:schema, preloadedValues: {}})    
    return (
        <Layout>
            <div className="w-full grid lg:grid-flow-col gap-3 h-full px-4 md:px-8 px-10 pr-8 overflow-hidden">
                <div className="bg-white p-6 rounded-lg shadow-lg text-left min-w-120">
                    <h1 className="text-xl font-semibold">Create new user</h1>
                        {createForm}
                </div>
                {/* <div className="bg-white p-6 rounded-lg shadow-lg text-left">
                    <h1 className="text-xl font-semibold">Add a photo</h1>
                    <form onSubmit={handleSubmit(imageSubmit)}>
                        <div className="h-80 flex flex-col justify-center items-center">
                            <img alt="profile" className="object-contain max-h-48 w-auto" src="https://icons-for-free.com/iconfiles/png/512/person-1324760545186718018.png" />
                            <input {...register('photo')} type="file" name="photo" className="bg-gray-200 rounded-lg" accept="image/*" />
                            <span className="text-xs text-red-500">{errors.photo?.message}</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="p-3 mt-0 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                                Upload Photo
                            </button>
                        </div>
                    </form>
                </div> */}
            </div>
        </Layout>
    )
}

export default CreateUser
