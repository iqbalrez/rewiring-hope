// src/components/AddWord.js
import React, { useState } from 'react';
import axios from 'axios';

const AddWord = ({ setIsOpen }) => {
  const [word, setWord] = useState('');
  const [message, setMessage] = useState('');

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${VITE_API_URL}/polling/add-word`, {
        word,
      });
      setMessage(response.data.message);
      setWord('');
      setIsOpen(true);
    } catch (error) {
      setMessage('Terjadi kesalahan, coba lagi!: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex justify-center gap-4'>
        <input
          type='text'
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder='Masukkan kata'
          className='bg-white rounded-xl p-3'
        />
        <button
          className='bg-primary p-3 rounded-xl text-white cursor-pointer hover:bg-primary-dark transition-all duration-150'
          type='submit'
        >
          Tambah
        </button>
      </form>
      {message && <p className='text-center text-red-500 mt-2'>{message}</p>}
    </div>
  );
};

export default AddWord;
