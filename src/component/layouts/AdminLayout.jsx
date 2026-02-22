import React from 'react';
import Sidebar from '../Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Sidebar />
      {/* pt-20 di mobile buat ngasih space gara-gara ada Mobile Header (h-16).
        lg:pt-8 di desktop balik normal.
      */}
      <main className='lg:ml-64 pt-16 md:pt-8 md:p-12'>
        <div className='max-w-7xl mx-auto'>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
