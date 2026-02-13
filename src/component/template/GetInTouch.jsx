import React from "react";
import { Link } from "react-router-dom";

export default function GetInTouch(){
    return(
        <>
        <div className="container">
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-6 md:text-2xl text-xl font-medium">Have Question ? Get in touch!</h3>

                <p className="text-slate-400 max-w-xl mx-auto">This is just a simple text made for this unique and awesome template, you can replace it with any text.</p>
            
                <div className="mt-6">
                    <Link to="#" className="py-2 px-5 inline-block font-normal tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md"><i className="uil uil-phone align-middle me-2"></i> Contact us</Link>
                </div>
            </div>
        </div>
        </>
    )
}