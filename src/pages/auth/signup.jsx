import React from "react";
import { Link } from "react-router-dom";

import LogoImage from "../../assets/images/logo-light.png";
import BackgroudImage from "../../assets/images/bg/auth.jpg";
import Switcher from "../../component/Switcher";

/**
 * Signup component
 */
export default function Signup() {
    return (
        <>
            <section
                style={{ backgroundImage: `url(${BackgroudImage})` }}
                className="position-relative bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900/90"></div>
                <div className="container-fluid relative">
                    <div className="grid grid-cols-1">
                        <div className="lg:col-span-4">
                            <div className="flex flex-col min-h-screen md:px-12 py-12 px-3">

                                <div className="text-center mx-auto">
                                    <Link to="/"><img src={LogoImage} alt="" /></Link>
                                </div>
                                <div className=" my-auto">
                                    <div className="mt-5 w-full max-w-sm m-auto px-6 py-8 bg-white dark:bg-slate-900 rounded-md shadow-lg shadow-slate-500 dark:shadow-slate-800">
                                        <div className="grid grid-cols-1">
                                            <h5 className="mb-8 text-xl dark:text-white font-semibold text-center">Signup</h5>
                                            <form className="ltr:text-left rtl:text-right">
                                                <div className="grid grid-cols-1">
                                                    <div className="mb-4">
                                                        <label className="dark:text-white" htmlFor="RegisterName">Your Name:</label>
                                                        <input id="RegisterName" type="email" className="form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none mt-3" placeholder="Harry" />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="dark:text-white" htmlFor="LoginEmail">Email Address:</label>
                                                        <input id="LoginEmail" type="email" className="form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none mt-3" placeholder="name@example.com" />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="dark:text-white" htmlFor="LoginPassword">Password:</label>
                                                        <input id="LoginPassword" type="password" className="form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none mt-3" placeholder="Password:" />
                                                    </div>

                                                    <div className="flex justify-between mb-4">
                                                        <div className="inline-flex items-center">
                                                            <input className="form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-primary checked:appearance-auto dark:accent-primary focus:border-primary-300 focus:ring focus:ring-offset-0 focus:ring-primary-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe" />
                                                            <label className="form-check-label text-slate-400" htmlFor="RememberMe">Remember me</label>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <Link to="#" className="py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md w-full">Register</Link>
                                                    </div>

                                                    <div className="text-center">
                                                        <span className="text-slate-400 dark:text-slate-300 me-2">Already have an account ?</span> <Link to="/login" className="text-dark dark:text-white fw-bold">Sign in</Link>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Start Footer --> */}
                                <div className="text-center">
                                    <p className="text-gray-400">© {new Date().getFullYear()} Upwind. Design & Develop with <i className="mdi mdi-heart text-primary-dark"></i> by <Link to="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</Link>.</p>
                                </div>
                                {/* <!-- End Footer --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
         
            {/* <!-- LTR & RTL Mode Code --> */}
            {/* Switcher section */}
            <Switcher />
        </>
    )
}
