import React, { useEffect } from "react";
import { Link as Link2 } from 'react-router-dom';
import { blogData } from "../data/data";
import Aos from "aos";


export default function BlogAos() {
    useEffect(()=>{
        Aos.init()
    },[])

  return (
    <>
      <section className="relative md:py-24 py-16" id="blog">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center" data-aos="fade-up" data-aos-delay="200">
            <h6 className="text-primary text-base font-medium uppercase mb-2">Blogs</h6>
            <h3 className="mb-4 md:text-2xl text-xl font-medium dark:text-white">Latest News</h3>

            <p className="text-slate-400 dark:text-slate-300 max-w-xl mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-8">
            {blogData.map((item, key) => (
              <div key={key} className="blog relative rounded-md shadow-sm shadow-slate-200 dark:shadow-slate-800 overflow-hidden" data-aos="fade-up" data-aos-delay={item.delay}>
                <img src={item.image} alt="" />
                <div className="content p-6">
                  <Link2 to={`/blog-detail/${item.id}`} className="text-lg hover:text-primary dark:text-white dark:hover:text-primary transition-all duration-500 ease-in-out font-medium">{item.title}</Link2>
                  <p className="text-slate-400 mt-3">{item.description}</p>

                  <div className="mt-5">
                    <Link2 to={`/blog-detail/${item.id}`} className="inline-block tracking-wide align-middle ease-in-out text-center relative after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto hover:text-primary dark:hover:text-primary after:bg-primary dark:text-white">Read More <i className="uil uil-arrow-right"></i></Link2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

}

