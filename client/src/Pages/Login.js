import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Axios from 'axios'

import { authService } from '../Service/Authentication'

const loginSchema = yup.object().shape({
    email: yup.string().email().required('Email should not be empty !'),
    password: yup.string().required('Password should not be empty !'),
})

function Login() {

    Axios.defaults.withCredentials = true
    const { state } = useLocation()

    const { register, handleSubmit, formState: {errors}, clearErrors } = useForm({
        resolver: yupResolver(loginSchema)
    })
    const history = useHistory()
    const [loginStatus, setLoginStatus] = React.useState(
        state ? state.message ? state.message : '' : ''
    );

    const loginAction = (data) => {
        authService.login(data.email, data.password).then((response) => {
            if(!response.data.auth){
                setLoginStatus(response.data.message)
            }else{
                localStorage.setItem("token", "Bearer " + response.data.token);
                history.push('/home')
            }
        })
    }

    const clearErrorMessages = (tagName) => {
        clearErrors(tagName)
        setLoginStatus('')
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            <header className="max-w-lg mx-auto pt-8">
                <a href="/">
                    <h1 className="text-4xl font-bold text-black text-center">DevApps</h1>
                </a>
            </header>

            <main className="bg-white max-w-md m-auto p-6 md:p-6 my-12 rounded-lg shadow-2xl">
                <section>
                    <p className="text-gray-600">Sign in to your account.</p>
                </section>
        
                <section className="mt-6">
                    <form onSubmit={handleSubmit(loginAction)} className="mt-6">                        
                        <label htmlFor="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail <span className="text-red-400">*</span></label>
                        <input 
                        {...register('email')}
                        onChange={() => clearErrorMessages('email')}
                        id="email" type="email" name="email" placeholder="john.doe@company.com" autoComplete="email" className="block w-full p-3 mt-2 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                        <span className="text-xs text-red-500">{errors.email?.message}</span>

                        <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password <span className="text-red-400">*</span></label>
                        <input 
                        {...register('password')}
                        onChange={() => clearErrorMessages('password')}
                        id="password" type="password" name="password" placeholder="********" autoComplete="password" className="block w-full p-3 mt-2 text-gray-700 appearance-none focus:outline-none bg-white border-b-2 border-gray-200 focus:border-blue-400" />
                        <span className="text-xs text-red-500">{errors.password?.message}</span>

                        <h3 className="mt-4 mb-4 text-red-500 text-center">{loginStatus}</h3>
                        <button type="submit" className="w-full py-3 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            Login
                        </button>
                        <p className="flex justify-between inline-block mt-4 text-xs text-red-500">Required fields are marked with an asterisk *</p>
                    </form>
                </section>
            </main>
        
            <div className="max-w-lg mx-auto text-center mt-8">
                <p className="text-black">Don't have an account? <a href="/register" className="font-bold hover:underline text-black">Sign up</a>.</p>
            </div>
        
            <footer className="max-w-lg top-1/2 mx-auto flex justify-center text-black">
                <a href="#0" className="hover:underline">Contact</a>
                <span className="mx-3">•</span>
                <a href="#0" className="hover:underline">Privacy</a>
            </footer>
        </div>
    )
}

export default Login
