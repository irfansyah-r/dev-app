import React, { useState } from 'react'
import { IconContext } from 'react-icons/lib'
import { RiDashboardLine, RiUserLine, RiGradienterLine, RiLogoutBoxLine, RiBriefcaseLine, RiTaskLine } from "react-icons/ri"
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import { authService } from '../Service/Authentication'

function Layout({children}) {
    const [isOpen, setIsOpen] = useState(true);

    const logoutAction = () => {
        authService.logout();
    }
    
    return (
        <div className="font-sans antialiased md:overflow-auto">
            <div className="min-h-screen bg-gray-100 flex md:flex-row flex-col">    

                <header className="md:bg-transparent bg-transparent w-full h-16 absolute flex flex-1 items-center">
                    <div className={cx("max-w-7xl mx-6 rounded-full hover:bg-gray-300 transform transition duration-500 ease-in-out md:mx-28", {"md:translate-x-36": isOpen})}>
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 text-gray-800 hover:text-black focus:outline-none transition duration-150 ease-in-out">
                            <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </header>

                <div className={cx("md:translate-x-0 fixed shadow-xl bg-white w-56 h-full text-blue-100 h-screen min-w-max pb-4 md:mt-0 transform transition duration-500 ease-in-out z-20", {"md:-translate-x-full": ! isOpen, "-translate-x-full": isOpen})}>
                                        
                    <a href="/home" className="text-black flex md:justify-start justify-center items-center h-16 space-x-2 px-8">
                        <IconContext.Provider value={{ className: "w-12 h-12" }}>
                            <RiGradienterLine />
                        </IconContext.Provider>
                        <span className="text-xl font-extrabold">DevApps</span>
                    </a>
                    <div className="bg-gray-50 p-16 -ml-2">

                    </div>
                    
                    <nav className="text-gray-700 flex flex-col md:ml-0 space-y-2 m-6">
                        <IconContext.Provider value={{ className: "w-4 h-4 my-auto hover:font-semibold" }}>
                            <NavLink to="/home" 
                            activeClassName="font-bold"
                            className="flex pl-8 space-x-4 hover:text-black hover:font-bold">
                                    <RiDashboardLine />
                                <span className="my-auto">Dashboard</span>
                            </NavLink>
                            <NavLink to="/users" 
                            activeClassName="font-bold"
                            className="flex pl-8 space-x-4 hover:text-black hover:font-bold">
                                    <RiUserLine />
                                <span className="my-auto">Users</span>
                            </NavLink>
                            <NavLink to="/jobs" 
                            activeClassName="font-bold"
                            className="flex pl-8 space-x-4 hover:text-black hover:font-bold">
                                    <RiBriefcaseLine />
                                <span className="my-auto">Jobs</span>
                            </NavLink>
                            <NavLink to="/tasks" 
                            activeClassName="font-bold"
                            className="flex pl-8 space-x-4 hover:text-black hover:font-bold">
                                    <RiTaskLine />
                                <span className="my-auto">Tasks</span>
                            </NavLink>
                            <NavLink onClick={logoutAction} to="/" className="flex pl-8 space-x-4 hover:text-black hover:font-semibold">
                                    <RiLogoutBoxLine />
                                <span className="my-auto">Logout</span>
                            </NavLink>
                        </IconContext.Provider>
                    </nav>       
                    <div className="w-full fixed flex justify-center md:hidden">
                        <div className="rounded-full mx-2">
                            <button onClick={() => setIsOpen(!isOpen)} className="items-center justify-center p-2 text-black hover:bg-red-500 hover:text-white rounded-full focus:outline-none transition duration-150 ease-in-out">
                                <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* <main className={cx("m-4 mt-16 grid md:grid-cols-4 gap-6 h-16 transform transition duration-200 ease-in-out z-10 md:translate-x-0 w-full inset-x-0", {"md:-translate-x-56": ! isOpen, "mx-16" : !isOpen})}> */}
                <main className={cx("mt-20 mb-10 md:ml-56 transform transition duration-500 ease-in-out md:w-full md:-translate-x-0 overflow-hidden", {"md:-translate-x-56": ! isOpen, "md:-mr-56": ! isOpen, "md:px-12": ! isOpen})}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout