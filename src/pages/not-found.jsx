import Navbar from '../component/navbar';

export default function NotFound() {
  return (
    <>
      <div>
        <Navbar navdark={true} />

        <section
          className='py-36 md:py-64 w-full table relative bg-primary/5 dark:bg-primary/10'
          id='home'
        >
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 `}
          ></div>
          <div className='container relative'>
            <div className='grid grid-cols-1 mt-12 '>
              <h4 className='text-center lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium  position-relative dark:text-white'>
                404 Not Found
              </h4>

              <p className='text-center text-slate-400 dark:text-white/70 mb-0 max-w-2xl mx-auto text-lg'>
                Sorry, the page you are looking for does not exist.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
