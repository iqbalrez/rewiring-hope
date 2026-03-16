import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Calendar, CheckSquare, BarChart2 } from 'lucide-react';
import VolunteerStats from '../../component/volunteer/VolunteerStats';
import VolunteerList from '../../component/volunteer/VolunteerList';
import InterviewSlotSection from '../../component/volunteer/InterviewSlotSection';
import BulkReviewSection from '../../component/volunteer/BulkReviewSection';

const TABS = [
  { id: 'list', label: 'Volunteer', icon: Users },
  { id: 'interview', label: 'Interview Slots', icon: Calendar },
  { id: 'review', label: 'Bulk Review', icon: CheckSquare },
];

export default function AdminVolunteerPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [stats, setStats] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const baseUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/admin/volunteers/stats/summary`,
        { headers },
      );
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      if (err.response && err.response.status === 401)
        window.location.href = '/login';
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const triggerRefresh = () => setRefreshTrigger((p) => p + 1);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-primary'>
            Manajemen Volunteer
          </h1>
          <p className='text-gray-500 mt-1 text-sm'>
            Brain Awareness Week & Teaching the Healing Brain 2026
          </p>
        </div>

        {/* Stats */}
        <VolunteerStats stats={stats} />

        {/* Tabs */}
        <div className='flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit shadow-sm'>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'list' && (
            <VolunteerList
              baseUrl={baseUrl}
              headers={headers}
              onRefresh={triggerRefresh}
            />
          )}
          {activeTab === 'interview' && (
            <InterviewSlotSection
              baseUrl={baseUrl}
              headers={headers}
              onRefresh={triggerRefresh}
            />
          )}
          {activeTab === 'review' && (
            <BulkReviewSection
              baseUrl={baseUrl}
              headers={headers}
              onRefresh={triggerRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
}
