import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoDark from '../assets/images/logo-dark.png';
import { LayoutDashboard, Brain, GraduationCap, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    {
      title: 'Dashboard',
      path: '/dashboard/',
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: 'Teaching Healing Brain',
      path: '/dashboard/orders/TTHB',
      icon: <GraduationCap size={20} />,
    },
    {
      title: 'Brain Awareness Week',
      path: '/dashboard/orders/BAW',
      icon: <Brain size={20} />,
    },
  ];

  return (
    <>
      {/* HEADER MOBILE (Hanya muncul di layar kecil) */}
      <div className='lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-30'>
        <img src={LogoDark} alt='Logo' className='h-7' />
        <button
          onClick={() => setIsOpen(true)}
          className='p-2 text-gray-600 hover:bg-gray-100 rounded-md'
        >
          <Menu size={24} />
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 transition-transform duration-300 w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        <div className='p-6 border-b border-gray-100 flex items-center justify-between'>
          <img src={LogoDark} alt='Logo' className='h-9 object-contain' />
          {/* Tombol Close di Mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className='lg:hidden p-1 text-gray-400'
          >
            <X size={24} />
          </button>
        </div>

        <nav className='p-4 space-y-1 mt-2'>
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === '/dashboard/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {menu.icon}
              <span className='font-medium text-sm'>{menu.title}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
