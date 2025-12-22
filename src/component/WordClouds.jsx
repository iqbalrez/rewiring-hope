// src/components/WordCloud.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactWordcloud } from '@cp949/react-wordcloud';
import AddWord from './AddWord';

export default function WordClouds() {
  const [words, setWords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchWordCloud = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/polling/word-cloud`);
        setWords(response.data);
      } catch (error) {
        console.error('Error fetching word cloud data', error);
      }
    };
    fetchWordCloud();
  }, [isOpen]);

  const options = {
    colors: ['#27ae60', '#0a3d62', '#f39c12'],
    fontFamily: 'Inter',
    fontSizes: [10, 60],
    rotationAngles: [0, 0],
    scale: 'sqrt',
    enableOptimizations: true,
  };

  return (
    <>
      <section
        className='relative py-24 bg-slate-200 dark:bg-slate-800'
        id='about'
      >
        <div className='w-full max-w-4xl px-4 lg:px-0 mx-auto'>
          <h2 className='text-center text-dark text-2xl'>
            Tulis suaramu. Satu kalimat bisa menyalakan harapan banyak anak.
          </h2>
          <h6 className='text-primary text-center my-4 text-2xl font-bold italic'>
            Kami percaya masa depan pendidikan adalah ...
          </h6>
          {isOpen ? (
            <>
              <div className='p-4 justify-center' style={{ height: '400px' }}>
                <ReactWordcloud words={words} options={options} />
              </div>
            </>
          ) : (
            <AddWord setIsOpen={setIsOpen} />
          )}
        </div>
      </section>
    </>
  );
}
