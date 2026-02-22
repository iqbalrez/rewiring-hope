import { useNavigate } from 'react-router-dom';

export default function EventProgressCard({
  title,
  stats,
  icon,
  colorClass,
  path,
}) {
  const navigate = useNavigate();

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col'>
      {/* Header & Total Utama */}
      <div className={`p-5 ${colorClass} text-white`}>
        <div className='flex justify-between items-start mb-4'>
          <div className='p-2 bg-white/20 rounded-lg'>{icon}</div>
          <button
            onClick={() => navigate(path)}
            className='text-[10px] bg-white text-gray-800 font-bold py-1 px-3 rounded-full hover:bg-gray-100 transition-all uppercase tracking-wider'
          >
            Detail →
          </button>
        </div>
        <div>
          <p className='text-white/80 text-xs font-medium uppercase tracking-widest'>
            Total Pendaftaran
          </p>
          <h3 className='text-3xl font-black'>{stats?.total || 0}</h3>
          <p className='text-sm mt-1 font-medium'>{title}</p>
        </div>
      </div>

      {/* Detail Status */}
      <div className='p-5 grid grid-cols-3 gap-2 bg-gray-50/50'>
        <div className='text-center'>
          <p className='text-xs text-gray-400 font-bold uppercase'>
            Menunggu Verifikasi
          </p>
          <p className='text-lg font-bold text-amber-500'>
            {stats?.pending || 0}
          </p>
        </div>
        <div className='text-center border-x border-gray-200'>
          <p className='text-xs text-gray-400 font-bold uppercase'>Disetujui</p>
          <p className='text-lg font-bold text-green-600'>
            {stats?.approved || 0}
          </p>
        </div>
        <div className='text-center'>
          <p className='text-xs text-gray-400 font-bold uppercase'>Ditolak</p>
          <p className='text-lg font-bold text-red-400'>
            {stats?.rejected || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
