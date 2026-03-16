import React from 'react';
import { Users, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, bg }) => (
  <div
    className={`bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm`}
  >
    <div className={`p-3 rounded-xl ${bg}`}>
      <Icon size={20} className={color} />
    </div>
    <div>
      <p className='text-2xl font-bold text-gray-800'>{value ?? '-'}</p>
      <p className='text-xs text-gray-500 mt-0.5'>{label}</p>
    </div>
  </div>
);

export default function VolunteerStats({ stats }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-6'>
      <StatCard
        label='Total'
        value={stats?.total}
        icon={Users}
        color='text-gray-600'
        bg='bg-gray-100'
      />
      <StatCard
        label='Pending'
        value={stats?.pending}
        icon={Clock}
        color='text-yellow-600'
        bg='bg-yellow-50'
      />
      <StatCard
        label='Interview'
        value={stats?.interview_scheduled}
        icon={Calendar}
        color='text-blue-600'
        bg='bg-blue-50'
      />
      <StatCard
        label='Diterima'
        value={stats?.accepted}
        icon={CheckCircle}
        color='text-green-600'
        bg='bg-green-50'
      />
      <StatCard
        label='Ditolak'
        value={stats?.rejected}
        icon={XCircle}
        color='text-red-600'
        bg='bg-red-50'
      />
    </div>
  );
}
