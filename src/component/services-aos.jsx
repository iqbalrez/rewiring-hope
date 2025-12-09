import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import StrategyImage from "../assets/images/svg/design-thinking.svg";
import departmentImage from "../assets/images/svg/coding.svg";
import launchImage from "../assets/images/svg/office-desk.svg";
import Aos from "aos";

export default function ServicesAos() {
  const team = [
    {
      title: 'Grow Your Business',
      icon: 'adjust-circle',
      subtext: 'The phrasal sequence of the is now so that many campaign and benefit'
    },
    {
      title: 'Drive More Sales',
      icon: 'circuit',
      subtext: 'The phrasal sequence of the is now so that many campaign and benefit'
    },
    {
      title: 'Handled By Expert',
      icon: 'fire',
      subtext: 'The phrasal sequence of the is now so that many campaign and benefit'
    },
    {
      title: 'Discussion For Idea',
      icon: 'shopping-basket',
      subtext: 'The phrasal sequence of the is now so that many campaign and benefit'
    },
    {
      title: 'Increase Conversion',
      icon: 'flower',
      subtext: 'The phrasal sequence of the is now so that many campaign and benefit'
    },
    {
      title: 'Sales Growth Idea',
      icon: 'flip-h',
      subtext: 'The phrasal sequence of the is now so that many campaign and benefit'
    }
  ]

  useEffect(()=>{
    Aos.init()
  },[])

  return (
    <>
      {/* Start */}
      <section className="relative md:py-24 py-16 active" id="features">
        <div className="container lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 pb-8 items-center" data-aos="fade-up" data-aos-delay="200">
            <div>
              <h6 className="text-primary text-base font-medium uppercase mb-2">What We Do ?</h6>
              <h3 className="mb-4 md:text-2xl text-xl font-semibold dark:text-white md:mb-0">Perfect Solution For Your <br /> Business</h3>
            </div>

            <div>
              <p className="text-slate-400 dark:text-slate-300 max-w-xl">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="400">

            {team.map((item, key) => (
              <div key={key} className={`features p-6 ${key % 2 === 0 ? "hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-slate-800" : "shadow-xl shadow-slate-100 dark:shadow-slate-800"} transition duration-500 rounded-3xl mt-8`}>
                <div className="w-20 h-20 bg-primary/5 text-primary rounded-xl text-3xl flex align-middle justify-center items-center shadow-xs">
                  <i className={`uil uil-${item.icon}`}></i>
                </div>

                <div className="content mt-7">
                  <Link to="#" className="text-lg hover:text-primary dark:text-white dark:hover:text-primary transition-all duration-500 ease-in-out font-medium">{item.title}</Link>
                  <p className="text-slate-400 mt-3">{item.subtext}</p>

                  <div className="mt-5">
                    <Link to="#" className="inline-block tracking-wide align-middle ease-in-out text-center relative after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto hover:text-primary dark:hover:text-primary after:bg-primary dark:text-white">Read More <i className="uil uil-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center" data-aos="fade-up" data-aos-delay="200">
            <h6 className="text-primary text-base font-medium uppercase mb-2">Work Process</h6>
            <h3 className="mb-4 md:text-2xl text-xl font-medium dark:text-white">Digital System For Our Business</h3>

            <p className="text-slate-400 dark:text-slate-300 max-w-xl mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>
          </div>

          <div className="grid grid-cols-1 mt-8">
            <div className="timeline relative">
              <div className="timeline-item" data-aos="fade-up" data-aos-delay="400">
                <div className="grid sm:grid-cols-2">
                  <div className="">
                    <div className="duration date-label-left ltr:float-right rtl:float-left md:me-7 relative">
                      <img src={StrategyImage} className="h-64 w-64" alt="" />
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="event event-description-right ltr:float-left rtl:float-right ltr:text-left rtl:text-right md:ms-7">
                      <h5 className="text-lg dark:text-white mb-1 font-medium">Strategy</h5>
                      <p className="timeline-subtitle mt-3 mb-0 text-slate-400">The generated injected humour, or non-characteristic words etc. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item mt-5 pt-4" data-aos="fade-up" data-aos-delay="600">
                <div className="grid sm:grid-cols-2">
                  <div className="md:order-1 order-2">
                    <div className="event event-description-left ltr:float-left rtl:float-right ltr:text-right rtl:text-left md:me-7">
                      <h5 className="text-lg dark:text-white mb-1 font-medium">Development</h5>
                      <p className="timeline-subtitle mt-3 mb-0 text-slate-400">The generated injected humour, or non-characteristic words etc. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,</p>
                    </div>
                  </div>
                  <div className="md:order-2 order-1">
                    <div className="duration duration-right md:ms-7 relative">
                      <img src={departmentImage} className="h-64 w-64" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item mt-5 pt-4" data-aos="fade-up" data-aos-delay="800">
                <div className="grid sm:grid-cols-2">
                  <div className="mt-4 mt-sm-0">
                    <div className="duration date-label-left ltr:float-right rtl:float-left md:me-7 relative">
                      <img src={launchImage} className="h-64 w-64" alt="" />
                    </div>
                  </div>
                  <div className="mt-4 mt-sm-0">
                    <div className="event event-description-right ltr:float-left rtl:float-right ltr:text-left rtl:text-right md:ms-7">
                      <h5 className="text-lg dark:text-white mb-1 font-medium">Launch</h5>
                      <p className="timeline-subtitle mt-3 mb-0 text-slate-400">The generated injected humour, or non-characteristic words etc. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

}
