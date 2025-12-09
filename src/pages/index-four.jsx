import { useEffect, useState } from 'react';

import Services from "../component/Services";
import About from "../component/About";
import Pricing from "../component/Pricing";
import Blog from "../component/Blog";
import Contact from "../component/Contact";
import Footer from "../component/Footer";
import Portfolio from "../component/Portfolio";
import Review from "../component/Testimonial";
import Switcher from "../component/Switcher";
import Navbar from "../component/navbar";
import bg1 from '../assets/images/bg/01.png'
import bg2 from '../assets/images/bg/02.png'
import bg3 from '../assets/images/bg/03.png'
import { Link } from 'react-router-dom';

export default function IndexFour() {
    const [isOpen, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);

const images = [
  bg1,
  bg2,
  bg3,
];

 useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 300); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

    return (
        <>
            <div>
                <Navbar navdark={true}/>

                <section className="py-36 md:py-64 w-full table relative bg-primary/5 dark:bg-primary/10" id="home">
                <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${images[current]})` }}></div>
                    <div className="container relative">
                        <div className="grid grid-cols-1 mt-12">
                            <h4 className="lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative dark:text-white">Business Growth <br/> Makes Your Company</h4>
                        
                            <p className="text-slate-400 dark:text-white/70 mb-0 max-w-2xl text-lg">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>
                        
                            <div className="relative mt-10">
                                <Link to="" className="py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full me-1">Get Started</Link>
                                <Link to="" onClick={()=>setOpen(!isOpen)} className="size-12 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 bg-primary/5 hover:bg-primary border-primary/10 hover:border-primary text-primary hover:text-white rounded-full lightbox"><i className="mdi mdi-play text-xl align-middle"></i></Link><small className="font-medium text-sm uppercase align-middle ms-2 dark:text-white/70">Watch Now</small>
                            </div>
                        </div>
                    </div>
                </section>

                {isOpen && 
                    <div className="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-1 w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <button type="button" onClick={()=>setOpen(!isOpen)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="p-1 md:p-1 space-y-4">
                                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                

                {/* About section */}
                <About />

                {/* Service section */}
                <Services />

                {/* Portfolio section */}
                <Portfolio />

                {/* Review section */}
                <Review />

                {/* Pricing section */}
                <Pricing />

                {/* Blog section */}
                <Blog />

                {/* Contact section */}
                <Contact />

                {/* Footer section */}
                <Footer />

                {/* Switcher section */}
                <Switcher />
            </div>

        </>
    );

}
