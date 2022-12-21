import React from 'react'

function Register() {

    return (
        <div class="bg-gray-200 min-h-screen">
            <header class="max-w-lg mx-auto pt-6">
                <a href="#">
                    <h1 class="text-4xl font-bold text-blue-500 text-center">DigiAds</h1>
                </a>
            </header>

            <main class="bg-white max-w-md m-auto p-6 md:p-6 my-6 rounded-lg shadow-2xl">
                <section>
                    <h2 class="text-gray-600">Create your new account.</h2>
                </section>
        
                <section class="mt-6">
                    <form class="flex flex-col" method="POST" action="#">
                        <div class="mb-4 rounded bg-white">
                            <label class="block text-gray-700 text-sm font-bold ml-3" for="name">Name</label>
                            <input type="text" id="name" class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-2 border-gray-200 focus:border-blue-600 transition duration-500 px-3 pb-1" />
                        </div>
                        <div class="mb-4 rounded bg-white">
                            <label class="block text-gray-700 text-sm font-bold ml-3" for="phone">Phone Number</label>
                            <input type="text" id="phone" class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-2 border-gray-200 focus:border-blue-600 transition duration-500 px-3 pb-1" />
                        </div>
                        <div class="mb-4 rounded bg-white">
                            <label class="block text-gray-700 text-sm font-bold ml-3" for="email">Email</label>
                            <input type="text" id="email" class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-2 border-gray-200 focus:border-blue-600 transition duration-500 px-3 pb-1" />
                        </div>
                        <div class="mb-4 rounded bg-white">
                            <label class="block text-gray-700 text-sm font-bold ml-3" for="password">Password</label>
                            <input type="password" id="password" class="bg-white rounded w-full text-gray-700 focus:outline-none border-b-2 border-gray-200 focus:border-blue-600 transition duration-500 px-3 pb-1" />
                        </div>
                        <div class="flex justify-end">
                            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 hover:underline mb-6">Forgot your password?</a>
                        </div>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
                    </form>
                </section>
            </main>
        
            <div class="max-w-lg mx-auto text-center mt-8">
                <p class="text-black">Already have an account? <a href="/login" class="font-bold hover:underline text-blue-700">Login</a>.</p>
            </div>
        
            <footer class="max-w-lg mx-auto flex justify-center text-black">
                <a href="#" class="hover:underline">Contact</a>
                <span class="mx-3">•</span>
                <a href="#" class="hover:underline">Privacy</a>
            </footer>
        </div>
    )
}

export default Login
