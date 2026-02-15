import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import LogoImage from '../../assets/images/logo-light.png';
import BackgroudImage from '../../assets/images/bg/auth.jpg';
import Switcher from '../../component/Switcher';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });

      const { token } = response.data;

      // simpan token
      localStorage.setItem('token', token);

      // optional redirect
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Login gagal, cek email/password.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        style={{ backgroundImage: `url(${BackgroudImage})` }}
        className='position-relative bg-center bg-cover'
      >
        <div className='absolute inset-0 bg-slate-900/90'></div>
        <div className='container-fluid relative'>
          <div className='grid grid-cols-1'>
            <div className='lg:col-span-4'>
              <div className='flex flex-col min-h-screen md:px-12 py-12 px-3'>
                <div className='text-center mx-auto'>
                  <Link to='/'>
                    <img src={LogoImage} alt='' />
                  </Link>
                </div>
                <div className=' my-auto'>
                  <div className='mt-5 w-full max-w-sm m-auto px-6 py-8 bg-white dark:bg-slate-900 rounded-md shadow-lg shadow-slate-500 dark:shadow-slate-800'>
                    <div className='grid grid-cols-1'>
                      <h5 className='mb-8 text-xl dark:text-white font-semibold text-center'>
                        Login
                      </h5>
                      <form
                        onSubmit={handleLogin}
                        className='ltr:text-left rtl:text-right'
                      >
                        {error && (
                          <div className='mb-4 text-red-500 text-sm text-center'>
                            {error}
                          </div>
                        )}
                        <div className='grid grid-cols-1'>
                          <div className='mb-4'>
                            <label
                              className='dark:text-white'
                              htmlFor='LoginEmail'
                            >
                              Email Address:
                            </label>
                            <input
                              id='LoginEmail'
                              type='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className='form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none mt-3'
                              placeholder='name@example.com'
                            />
                          </div>

                          <div className='mb-4'>
                            <label
                              className='dark:text-white'
                              htmlFor='LoginPassword'
                            >
                              Password:
                            </label>
                            <input
                              id='LoginPassword'
                              type='password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className='form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none mt-3'
                              placeholder='Password:'
                            />
                          </div>

                          <div className='mb-4'>
                            <button
                              type='submit'
                              disabled={loading}
                              className='py-2 px-5 w-full bg-primary hover:bg-primary-dark text-white rounded-md'
                            >
                              {loading ? 'Loading...' : 'Login / Sign in'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* <!-- Start Footer --> */}
                <div className='text-center'>
                  <p className='text-gray-400'>
                    © {new Date().getFullYear()} Developed with{' '}
                    <i className='mdi mdi-heart text-primary-dark'></i> by{' '}
                    <Link
                      to='https://iqbalrez.my.id/'
                      target='_blank'
                      className='text-reset'
                    >
                      Iqbalrez
                    </Link>
                    .
                  </p>
                </div>
                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
