import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Send,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  LayoutGrid,
  List,
  CalendarDays,
  Calendar,
  Download,
  Upload,
  UserPlus,
  FileSpreadsheet,
  ChevronDown,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────
const NOTIF_STATUS = {
  not_sent: {
    label: 'Belum Dikirim',
    dot: 'bg-yellow-400',
    textColor: 'text-yellow-700',
    bg: 'bg-yellow-50 border-yellow-200',
    icon: Clock,
  },
  synced: {
    label: 'Terkirim',
    dot: 'bg-green-400',
    textColor: 'text-green-700',
    bg: 'bg-green-50 border-green-200',
    icon: CheckCircle2,
  },
  outdated: {
    label: 'Perlu Ulang',
    dot: 'bg-orange-400',
    textColor: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-200',
    icon: AlertCircle,
  },
};
const SLOT_STATUS_BORDER = {
  scheduled: 'border-l-blue-400',
  done: 'border-l-green-400',
  cancelled: 'border-l-red-300',
};
const SLOT_STATUS_BADGE = {
  scheduled: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};
const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const DAYS_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const VIEW_OPTIONS = [
  { id: 'month', label: 'Bulan', icon: LayoutGrid },
  { id: 'week', label: 'Minggu', icon: CalendarDays },
  { id: 'day', label: 'Hari', icon: Calendar },
  { id: 'list', label: 'List', icon: List },
];

const toDateStr = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const groupByDate = (slots) => {
  const map = {};
  slots.forEach((s) => {
    if (!map[s.date]) map[s.date] = [];
    map[s.date].push(s);
  });
  return map;
};

// ─── Slot Card ────────────────────────────────────────────────
function SlotCard({ slot, onUpdateStatus, compact = false }) {
  const notif = NOTIF_STATUS[slot.notification_status] || NOTIF_STATUS.not_sent;
  const NotifIcon = notif.icon;
  const border = SLOT_STATUS_BORDER[slot.status] || 'border-l-gray-300';
  const opacity = slot.status === 'cancelled' ? 'opacity-50' : '';

  if (compact)
    return (
      <div
        className={`text-[10px] px-1 py-0.5 rounded-sm border-l-2 ${border} bg-white shadow-sm truncate leading-tight flex items-center gap-1 ${opacity}`}
      >
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${notif.dot}`}
        />
        <span className='truncate'>
          {slot.start_time}{' '}
          {slot.volunteer_application?.name?.split(' ')[0] || '?'}
        </span>
      </div>
    );

  return (
    <div
      className={`border-l-4 ${border} bg-white rounded-r-lg px-3 sm:px-4 py-3 shadow-sm ${opacity}`}
    >
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0 flex-1'>
          <p className='font-semibold text-gray-800 text-sm truncate'>
            {slot.volunteer_application?.name || '-'}
          </p>
          <p className='text-xs text-gray-500 truncate mb-2'>
            {slot.volunteer_application?.email || '-'}
          </p>
          <div className='flex flex-wrap gap-1.5'>
            <span className='text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium whitespace-nowrap'>
              {slot.start_time}–{slot.end_time} WIB
            </span>
            <span
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-md border ${notif.bg} ${notif.textColor} whitespace-nowrap`}
            >
              <NotifIcon size={10} /> {notif.label}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-md font-medium ${SLOT_STATUS_BADGE[slot.status]}`}
            >
              {slot.status === 'scheduled'
                ? 'Terjadwal'
                : slot.status === 'done'
                  ? 'Selesai'
                  : 'Dibatalkan'}
            </span>
          </div>
          {slot.meet_link && (
            <a
              href={slot.meet_link}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-1.5 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline'
            >
              <ExternalLink size={10} /> Meet
            </a>
          )}
        </div>
        {slot.status === 'scheduled' && onUpdateStatus && (
          <div className='flex gap-1 flex-shrink-0'>
            <button
              onClick={() => onUpdateStatus(slot.id, 'done')}
              className='px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors font-medium'
            >
              ✓
            </button>
            <button
              onClick={() => onUpdateStatus(slot.id, 'cancelled')}
              className='px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-medium'
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Month View ───────────────────────────────────────────────
function MonthView({ slots, selectedDate, onDayClick, cursor }) {
  const { year, month } = cursor;
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const byDate = groupByDate(slots);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
      <div className='grid grid-cols-7 border-b border-gray-100 bg-gray-50'>
        {DAYS_SHORT.map((d) => (
          <div
            key={d}
            className='py-2 text-center text-[10px] sm:text-xs font-semibold text-gray-400'
          >
            {d}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7'>
        {cells.map((day, idx) => {
          if (!day)
            return (
              <div
                key={`e-${idx}`}
                className='min-h-[60px] sm:min-h-[84px] border-b border-r border-gray-50 bg-gray-50/40'
              />
            );
          const dateStr = toDateStr(new Date(year, month, day));
          const daySlots = byDate[dateStr] || [];
          const isToday = toDateStr(today) === dateStr;
          const isSel = selectedDate === dateStr;
          return (
            <div
              key={dateStr}
              onClick={() => onDayClick(dateStr, daySlots)}
              className={`min-h-[60px] sm:min-h-[84px] border-b border-r border-gray-100 p-1 sm:p-1.5 cursor-pointer transition-all ${
                isSel
                  ? 'bg-primary/5 ring-1 ring-inset ring-primary/20'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-[10px] sm:text-xs font-semibold mb-0.5 sm:mb-1 ${
                  isToday
                    ? 'bg-primary text-white'
                    : isSel
                      ? 'text-primary font-bold'
                      : 'text-gray-600'
                }`}
              >
                {day}
              </div>
              {/* Mobile: dots only */}
              <div className='flex sm:hidden gap-0.5 flex-wrap'>
                {daySlots.slice(0, 4).map((s) => (
                  <span
                    key={s.id}
                    className={`w-1.5 h-1.5 rounded-full ${NOTIF_STATUS[s.notification_status]?.dot || 'bg-gray-300'}`}
                  />
                ))}
              </div>
              {/* Desktop: compact cards */}
              <div className='hidden sm:block space-y-0.5'>
                {daySlots.slice(0, 3).map((s) => (
                  <SlotCard key={s.id} slot={s} compact />
                ))}
                {daySlots.length > 3 && (
                  <div className='text-[10px] text-primary/70 font-medium pl-1'>
                    +{daySlots.length - 3}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Week View ────────────────────────────────────────────────
function WeekView({ slots, cursor, onDayClick }) {
  const { date: cursorDate } = cursor;
  const today = new Date();
  const byDate = groupByDate(slots);
  const startOfWeek = new Date(cursorDate);
  startOfWeek.setDate(cursorDate.getDate() - cursorDate.getDay());
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <>
      {/* Mobile: stacked */}
      <div className='sm:hidden bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100'>
        {weekDays.map((d) => {
          const dateStr = toDateStr(d);
          const isToday = toDateStr(today) === dateStr;
          const daySlots = (byDate[dateStr] || []).sort((a, b) =>
            a.start_time.localeCompare(b.start_time),
          );
          return (
            <div
              key={dateStr}
              onClick={() => onDayClick(dateStr, daySlots)}
              className='cursor-pointer active:bg-gray-50 transition-colors'
            >
              <div
                className={`flex items-center justify-between px-4 py-3 ${isToday ? 'bg-primary/5' : ''}`}
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
                      isToday ? 'bg-primary text-white' : 'text-gray-700'
                    }`}
                  >
                    {d.getDate()}
                  </div>
                  <span
                    className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-gray-700'}`}
                  >
                    {DAYS_SHORT[d.getDay()]}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  {daySlots.length > 0 ? (
                    <>
                      <div className='flex gap-0.5'>
                        {daySlots.slice(0, 4).map((s) => (
                          <span
                            key={s.id}
                            className={`w-2 h-2 rounded-full ${NOTIF_STATUS[s.notification_status]?.dot || 'bg-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className='text-xs text-primary font-medium'>
                        {daySlots.length} slot
                      </span>
                    </>
                  ) : (
                    <span className='text-xs text-gray-300'>Kosong</span>
                  )}
                  <ChevronRight size={14} className='text-gray-300' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Desktop: 7 columns */}
      <div className='hidden sm:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
        <div className='grid grid-cols-7 border-b border-gray-100'>
          {weekDays.map((d) => {
            const dateStr = toDateStr(d);
            const isToday = toDateStr(today) === dateStr;
            const daySlots = byDate[dateStr] || [];
            return (
              <div
                key={dateStr}
                className='border-r border-gray-100 last:border-r-0'
              >
                <div
                  className={`py-3 text-center border-b border-gray-100 ${isToday ? 'bg-primary/5' : 'bg-gray-50'}`}
                >
                  <p className='text-xs text-gray-500'>
                    {DAYS_SHORT[d.getDay()]}
                  </p>
                  <div
                    className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm font-semibold mt-0.5 ${
                      isToday ? 'bg-primary text-white' : 'text-gray-700'
                    }`}
                  >
                    {d.getDate()}
                  </div>
                  {daySlots.length > 0 && (
                    <span className='text-xs text-primary font-medium'>
                      {daySlots.length} slot
                    </span>
                  )}
                </div>
                <div className='p-2 min-h-[180px] space-y-1.5'>
                  {daySlots
                    .sort((a, b) => a.start_time.localeCompare(b.start_time))
                    .map((s) => (
                      <div
                        key={s.id}
                        onClick={() => onDayClick(dateStr, daySlots)}
                        className={`text-[10px] px-1.5 py-1 rounded border-l-2 ${SLOT_STATUS_BORDER[s.status]} bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors`}
                      >
                        <span
                          className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${NOTIF_STATUS[s.notification_status]?.dot || 'bg-gray-300'} align-middle`}
                        />
                        <span className='font-medium'>{s.start_time}</span>
                        <span className='block truncate text-gray-500'>
                          {s.volunteer_application?.name?.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Day View ─────────────────────────────────────────────────
function DayView({ slots, cursor, onUpdateStatus }) {
  const dateStr = toDateStr(cursor.date);
  const isToday = toDateStr(new Date()) === dateStr;
  const daySlots = (groupByDate(slots)[dateStr] || []).sort((a, b) =>
    a.start_time.localeCompare(b.start_time),
  );
  const dateLabel = cursor.date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
      <div
        className={`px-4 sm:px-5 py-4 border-b border-gray-100 ${isToday ? 'bg-primary/5' : 'bg-gray-50'}`}
      >
        <p
          className={`text-base sm:text-lg font-semibold ${isToday ? 'text-primary' : 'text-gray-800'}`}
        >
          {dateLabel}
        </p>
        <p className='text-sm text-gray-500 mt-0.5'>
          {daySlots.length} slot{isToday ? ' · Hari ini' : ''}
        </p>
      </div>
      {daySlots.length === 0 ? (
        <div className='px-5 py-16 text-center text-gray-400 text-sm'>
          Tidak ada slot pada hari ini
        </div>
      ) : (
        <div className='p-3 sm:p-4 space-y-3'>
          {daySlots.map((s) => (
            <SlotCard key={s.id} slot={s} onUpdateStatus={onUpdateStatus} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── List View ────────────────────────────────────────────────
function ListView({ slots, onUpdateStatus }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = slots
    .filter((s) => filter === 'all' || s.notification_status === filter)
    .filter((s) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        s.volunteer_application?.name?.toLowerCase().includes(q) ||
        s.volunteer_application?.email?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) =>
      a.date !== b.date
        ? a.date.localeCompare(b.date)
        : a.start_time.localeCompare(b.start_time),
    );
  const grouped = {};
  filtered.forEach((s) => {
    if (!grouped[s.date]) grouped[s.date] = [];
    grouped[s.date].push(s);
  });

  return (
    <div className='space-y-3'>
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col sm:flex-row gap-2'>
        <div className='relative flex-1'>
          <Search
            size={13}
            className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400'
          />
          <input
            type='text'
            placeholder='Cari nama / email...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30'
          />
        </div>
        <div className='flex gap-1 flex-wrap items-center'>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'not_sent', label: 'Belum' },
            { id: 'outdated', label: 'Perlu Ulang' },
            { id: 'synced', label: 'Terkirim' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-2.5 py-1.5 text-xs rounded-lg font-medium transition-all ${
                filter === f.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className='text-xs text-gray-400 ml-auto'>
            {filtered.length} slot
          </span>
        </div>
      </div>
      {Object.keys(grouped).length === 0 ? (
        <div className='bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm'>
          Tidak ada slot
        </div>
      ) : (
        Object.entries(grouped).map(([date, dateSlots]) => (
          <div
            key={date}
            className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'
          >
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
              <span className='text-xs font-semibold text-gray-700'>
                {new Date(date + 'T00:00:00').toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className='text-xs text-gray-400'>
                ({dateSlots.length})
              </span>
            </div>
            <div className='p-3 space-y-2'>
              {dateSlots.map((s) => (
                <SlotCard key={s.id} slot={s} onUpdateStatus={onUpdateStatus} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ─── Day Detail — bottom sheet on mobile, sidebar on desktop ──
function DayDetailPanel({ date, slots, onUpdateStatus, onClose }) {
  const sorted = [...slots].sort((a, b) =>
    a.start_time.localeCompare(b.start_time),
  );
  const dateLabel = new Date(date + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const content = (
    <>
      <div className='flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-100'>
        <div>
          <p className='text-xs text-primary font-semibold uppercase tracking-wide'>
            Detail Jadwal
          </p>
          <h4 className='font-semibold text-gray-800 mt-0.5 text-sm'>
            {dateLabel}
          </h4>
          <p className='text-xs text-gray-400 mt-0.5'>{slots.length} slot</p>
        </div>
        <button
          onClick={onClose}
          className='p-1.5 rounded-lg hover:bg-gray-100 text-gray-400'
        >
          <X size={15} />
        </button>
      </div>
      {slots.length === 0 ? (
        <div className='px-5 py-10 text-center text-gray-400 text-sm'>
          Tidak ada slot
        </div>
      ) : (
        <div className='divide-y divide-gray-100 overflow-y-auto max-h-[60vh] sm:max-h-[480px]'>
          {sorted.map((s) => (
            <div key={s.id} className='p-3'>
              <SlotCard slot={s} onUpdateStatus={onUpdateStatus} />
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile: bottom sheet */}
      <div className='sm:hidden fixed inset-0 z-40 flex flex-col justify-end'>
        <div className='absolute inset-0 bg-black/30' onClick={onClose} />
        <div className='relative bg-white rounded-t-2xl shadow-2xl z-10'>
          <div className='w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-1' />
          {content}
        </div>
      </div>
      {/* Desktop: sidebar */}
      <div className='hidden sm:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-fit sticky top-4'>
        {content}
      </div>
    </>
  );
}

// ─── Email Combobox ───────────────────────────────────────────
function EmailCombobox({ value, onChange, volunteers }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || '');
  const ref = useRef();
  const filtered = query.trim()
    ? volunteers
        .filter(
          (v) =>
            v.name.toLowerCase().includes(query.toLowerCase()) ||
            v.email.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 8)
    : volunteers.slice(0, 8);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const select = (email) => {
    setQuery(email);
    onChange(email);
    setOpen(false);
  };

  return (
    <div ref={ref} className='relative'>
      <div className='relative'>
        <Search
          size={14}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
        />
        <input
          type='text'
          value={query}
          placeholder='Cari nama atau ketik email...'
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          className='w-full border border-gray-300 rounded-lg pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
        />
        {query && (
          <button
            type='button'
            onClick={() => {
              setQuery('');
              onChange('');
            }}
            className='absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
          >
            <X size={13} />
          </button>
        )}
      </div>
      {open && (
        <div className='absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden'>
          {filtered.length === 0 && !query ? (
            <div className='px-4 py-3 text-sm text-gray-400'>
              Tidak ada volunteer pending.
            </div>
          ) : filtered.length === 0 ? (
            <div className='px-4 py-3 text-sm text-gray-500'>
              Tidak ditemukan.{' '}
              <button
                type='button'
                onMouseDown={() => select(query)}
                className='text-primary font-medium hover:underline'
              >
                Pakai "{query}"
              </button>{' '}
              <span className='text-xs text-gray-400'>
                (overwrite slot lama)
              </span>
            </div>
          ) : (
            <>
              <div className='px-3 py-1.5 bg-gray-50 border-b border-gray-100'>
                <p className='text-xs text-gray-400 font-medium'>
                  Volunteer Pending
                </p>
              </div>
              {filtered.map((v) => (
                <button
                  key={v.id}
                  type='button'
                  onMouseDown={() => select(v.email)}
                  className='w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left'
                >
                  <div className='w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <span className='text-xs font-bold text-primary'>
                      {v.name[0]}
                    </span>
                  </div>
                  <div className='min-w-0'>
                    <p className='text-sm font-medium text-gray-800 truncate'>
                      {v.name}
                    </p>
                    <p className='text-xs text-gray-500 truncate'>{v.email}</p>
                  </div>
                </button>
              ))}
              {query && !volunteers.find((v) => v.email === query) && (
                <button
                  type='button'
                  onMouseDown={() => select(query)}
                  className='w-full flex items-center gap-2 px-4 py-2.5 border-t border-gray-100 hover:bg-blue-50 text-sm text-blue-600 font-medium'
                >
                  <Plus size={13} /> Pakai "{query}" langsung (overwrite)
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Assign Panel ─────────────────────────────────────────────
function AssignPanel({
  mode,
  volunteers,
  selectedDate,
  baseUrl,
  headers,
  fileInputRef,
  onManualSuccess,
  onExcelSuccess,
  onClose,
}) {
  const [form, setForm] = useState({
    email: '',
    slot_date: selectedDate || '',
    start_time: '',
    end_time: '',
    meet_link: '',
  });
  const [dragOver, setDragOver] = useState(false);
  const [excelDone, setExcelDone] = useState(false);

  useEffect(() => {
    if (selectedDate) setForm((f) => ({ ...f, slot_date: selectedDate }));
  }, [selectedDate]);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.email ||
      !form.slot_date ||
      !form.start_time ||
      !form.end_time ||
      !form.meet_link
    )
      return Swal.fire({ icon: 'warning', title: 'Semua field wajib diisi' });
    Swal.fire({
      title: 'Menyimpan...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      const { data } = await axios.post(
        `${baseUrl}/admin/volunteers/interview-slots/assign`,
        form,
        { headers },
      );
      await Swal.fire({
        icon: 'success',
        title: data.overwritten ? 'Jadwal diperbarui' : 'Volunteer dijadwalkan',
        timer: 1500,
        showConfirmButton: false,
      });
      setForm({
        email: '',
        slot_date: selectedDate || '',
        start_time: '',
        end_time: '',
        meet_link: '',
      });
      onManualSuccess();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const handleUploadExcel = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    Swal.fire({
      title: 'Mengupload...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      const { data } = await axios.post(
        `${baseUrl}/admin/volunteers/interview-slots/assign/excel`,
        formData,
        { headers: { ...headers, 'Content-Type': 'multipart/form-data' } },
      );
      setExcelDone(true);
      await Swal.fire({
        icon: 'success',
        title: 'Upload Berhasil',
        html: `<p>${data.message}</p>${
          data.results.failed.length > 0
            ? `<div class="mt-3 text-left text-sm bg-red-50 border border-red-200 rounded-lg p-3 max-h-40 overflow-y-auto">
               <p class="font-semibold text-red-600 mb-1">Gagal (${data.results.failed.length}):</p>
               ${data.results.failed.map((f) => `<p class="text-red-700">• ${f.email}: ${f.reason}</p>`).join('')}
             </div>`
            : ''
        }`,
      });
      onExcelSuccess();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Upload',
        text: err.response?.data?.message || err.message,
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
      {/* Panel header */}
      <div className='flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-gray-100 bg-gray-50'>
        <div className='flex items-center gap-2'>
          {mode === 'manual' ? (
            <>
              <UserPlus size={15} className='text-primary' />
              <span className='text-sm font-semibold text-gray-700'>
                Assign Manual
              </span>
            </>
          ) : (
            <>
              <FileSpreadsheet size={15} className='text-primary' />
              <span className='text-sm font-semibold text-gray-700'>
                Assign via Excel
              </span>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className='p-1 rounded-lg hover:bg-gray-200 text-gray-400 transition-colors'
        >
          <X size={15} />
        </button>
      </div>

      <div className='p-4 sm:p-5'>
        {/* ── Manual Mode ── */}
        {mode === 'manual' && (
          <form onSubmit={handleManualSubmit} className='space-y-4'>
            <div>
              <label className='text-xs font-semibold text-gray-500 block mb-1.5'>
                Volunteer
                <span className='ml-1 font-normal text-gray-400'>
                  — ketik email untuk overwrite slot yang sudah ada
                </span>
              </label>
              <EmailCombobox
                value={form.email}
                onChange={(email) => setForm((f) => ({ ...f, email }))}
                volunteers={volunteers}
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
              <div>
                <label className='text-xs font-semibold text-gray-500 block mb-1.5'>
                  Tanggal
                </label>
                <input
                  type='date'
                  value={form.slot_date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slot_date: e.target.value }))
                  }
                  className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                />
                {selectedDate && form.slot_date === selectedDate && (
                  <p className='text-xs text-primary mt-1 flex items-center gap-1'>
                    <CheckCircle size={10} /> Dari klik kalender
                  </p>
                )}
              </div>
              <div>
                <label className='text-xs font-semibold text-gray-500 block mb-1.5'>
                  Waktu Mulai
                </label>
                <input
                  type='time'
                  value={form.start_time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, start_time: e.target.value }))
                  }
                  className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                />
              </div>
              <div>
                <label className='text-xs font-semibold text-gray-500 block mb-1.5'>
                  Waktu Selesai
                </label>
                <input
                  type='time'
                  value={form.end_time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, end_time: e.target.value }))
                  }
                  className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                />
              </div>
            </div>
            <div>
              <label className='text-xs font-semibold text-gray-500 block mb-1.5'>
                Link Google Meet
              </label>
              <input
                type='url'
                placeholder='https://meet.google.com/xxx-yyy-zzz'
                value={form.meet_link}
                onChange={(e) =>
                  setForm((f) => ({ ...f, meet_link: e.target.value }))
                }
                className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
              />
            </div>
            <div className='flex gap-2 justify-end pt-1'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors'
              >
                Batal
              </button>
              <button
                type='submit'
                className='px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors'
              >
                Simpan Jadwal
              </button>
            </div>
          </form>
        )}

        {/* ── Excel Mode: Step 1 → Step 2 ── */}
        {mode === 'excel' && (
          <div className='space-y-4'>
            {/* Step indicator */}
            <div className='flex items-center gap-2 mb-2'>
              {[
                { n: 1, label: 'Download Template' },
                { n: 2, label: 'Upload & Proses' },
              ].map((step, i) => (
                <React.Fragment key={step.n}>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        excelDone
                          ? 'bg-green-500 text-white'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {excelDone ? <CheckCircle size={13} /> : step.n}
                    </div>
                    <span className='text-xs font-medium text-gray-600 hidden sm:block'>
                      {step.label}
                    </span>
                  </div>
                  {i < 1 && (
                    <ArrowRight
                      size={14}
                      className='text-gray-300 flex-shrink-0'
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step 1: Download */}
            <div className='rounded-xl border border-gray-200 overflow-hidden'>
              <div className='px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
                <div className='w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0'>
                  1
                </div>
                <span className='text-sm font-semibold text-gray-700'>
                  Download Template Excel
                </span>
              </div>
              <div className='px-4 py-4'>
                <p className='text-xs text-gray-500 mb-3'>
                  Template otomatis berisi semua volunteer{' '}
                  <span className='font-medium text-yellow-600'>
                    berstatus pending
                  </span>{' '}
                  beserta nama dan email. Isi kolom{' '}
                  <code className='bg-gray-100 px-1.5 py-0.5 rounded text-[11px]'>
                    slot_date
                  </code>
                  ,{' '}
                  <code className='bg-gray-100 px-1.5 py-0.5 rounded text-[11px]'>
                    start_time
                  </code>
                  ,{' '}
                  <code className='bg-gray-100 px-1.5 py-0.5 rounded text-[11px]'>
                    end_time
                  </code>
                  , dan{' '}
                  <code className='bg-gray-100 px-1.5 py-0.5 rounded text-[11px]'>
                    meet_link
                  </code>
                  . Baris yang dikosongkan akan dilewati.
                </p>
                <button
                  onClick={() =>
                    window.open(
                      `${baseUrl}/admin/volunteers/interview-slots/template`,
                      '_blank',
                    )
                  }
                  className='flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors font-medium'
                >
                  <Download size={15} /> Download Template
                </button>
              </div>
            </div>

            {/* Step 2: Upload */}
            <div className='rounded-xl border border-gray-200 overflow-hidden'>
              <div className='px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
                <div className='w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0'>
                  2
                </div>
                <span className='text-sm font-semibold text-gray-700'>
                  Upload Template yang Sudah Diisi
                </span>
              </div>
              <div className='px-4 py-4'>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                    dragOver
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleUploadExcel(e.dataTransfer.files[0]);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload
                    size={24}
                    className={`mx-auto mb-2 transition-colors ${dragOver ? 'text-primary' : 'text-gray-400'}`}
                  />
                  <p className='text-sm text-gray-600'>
                    <span className='text-primary font-medium'>
                      Klik untuk pilih file
                    </span>{' '}
                    atau drag & drop di sini
                  </p>
                  <p className='text-xs text-gray-400 mt-1'>.xlsx atau .xls</p>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='.xlsx,.xls'
                    className='hidden'
                    onChange={(e) => handleUploadExcel(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────
export default function InterviewSlotSection({ baseUrl, headers, onRefresh }) {
  const [slots, setSlots] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [view, setView] = useState('month');
  const [assignMode, setAssignMode] = useState(null); // null | 'manual' | 'excel'
  const [showAssignMenu, setShowAssignMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDaySlots, setSelectedDaySlots] = useState([]);
  const [cursor, setCursor] = useState({
    date: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const fileInputRef = useRef();
  const assignMenuRef = useRef();

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/admin/volunteers/interview-slots`,
        { headers },
      );
      setSlots(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingVolunteers = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/volunteers`, {
        headers,
        params: { status: 'pending' },
      });
      setVolunteers(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchPendingVolunteers();
  }, []);
  useEffect(() => {
    if (selectedDate)
      setSelectedDaySlots(slots.filter((s) => s.date === selectedDate));
  }, [slots, selectedDate]);
  useEffect(() => {
    const h = (e) => {
      if (assignMenuRef.current && !assignMenuRef.current.contains(e.target))
        setShowAssignMenu(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const navigate = (dir) => {
    setCursor((prev) => {
      const d = new Date(prev.date);
      if (view === 'month') {
        const m = prev.month + dir;
        if (m < 0)
          return {
            ...prev,
            month: 11,
            year: prev.year - 1,
            date: new Date(prev.year - 1, 11, 1),
          };
        if (m > 11)
          return {
            ...prev,
            month: 0,
            year: prev.year + 1,
            date: new Date(prev.year + 1, 0, 1),
          };
        return { ...prev, month: m, date: new Date(prev.year, m, 1) };
      }
      if (view === 'week') d.setDate(d.getDate() + dir * 7);
      if (view === 'day') d.setDate(d.getDate() + dir);
      return { ...prev, date: d, year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const goToday = () => {
    const now = new Date();
    setCursor({ date: now, year: now.getFullYear(), month: now.getMonth() });
  };

  const navLabel = () => {
    if (view === 'month') return `${MONTHS[cursor.month]} ${cursor.year}`;
    if (view === 'week') {
      const s = new Date(cursor.date);
      s.setDate(cursor.date.getDate() - cursor.date.getDay());
      const e = new Date(s);
      e.setDate(s.getDate() + 6);
      return `${s.getDate()}–${e.getDate()} ${MONTHS[e.getMonth()]}`;
    }
    if (view === 'day')
      return cursor.date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    return 'Semua';
  };

  const handleDayClick = (dateStr, daySlots) => {
    if (selectedDate === dateStr) {
      setSelectedDate(null);
      setSelectedDaySlots([]);
      return;
    }
    setSelectedDate(dateStr);
    setSelectedDaySlots(daySlots);
  };

  const handleSendNotifications = async () => {
    const notSent = slots.filter((s) => s.notification_status !== 'synced');
    if (notSent.length === 0)
      return Swal.fire({
        icon: 'info',
        title: 'Semua notifikasi sudah terkirim',
      });
    const result = await Swal.fire({
      icon: 'question',
      title: 'Kirim Notifikasi Interview',
      html: `<p>Akan mengirim email ke <b>${notSent.length} volunteer</b>.</p>`,
      showCancelButton: true,
      confirmButtonText: 'Ya, Kirim',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#1E3A5F',
    });
    if (!result.isConfirmed) return;
    setSending(true);
    Swal.fire({
      title: 'Mengirim...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      const { data } = await axios.post(
        `${baseUrl}/admin/volunteers/interview-slots/send-notifications`,
        {},
        { headers },
      );
      await Swal.fire({
        icon: 'success',
        title: 'Email sedang dikirim',
        html: `<p>Mengirim ke <b>${data.total}</b> volunteer di background.</p>`,
      });
      setTimeout(() => {
        fetchSlots();
        onRefresh();
      }, 3000);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setSending(false);
    }
  };

  const handleUpdateSlotStatus = async (slotId, status) => {
    const result = await Swal.fire({
      icon: 'question',
      title: `Tandai sebagai "${status}"?`,
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
      confirmButtonColor: status === 'done' ? '#16a34a' : '#dc2626',
    });
    if (!result.isConfirmed) return;
    try {
      await axios.patch(
        `${baseUrl}/admin/volunteers/interview-slots/${slotId}/status`,
        { status },
        { headers },
      );
      fetchSlots();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: err.message });
    }
  };

  const openAssign = (mode) => {
    setAssignMode(mode);
    setShowAssignMenu(false);
  };
  const closeAssign = () => setAssignMode(null);
  const handleAssignSuccess = () => {
    fetchSlots();
    fetchPendingVolunteers();
    onRefresh();
  };

  const notSentCount = slots.filter(
    (s) => s.notification_status !== 'synced',
  ).length;
  const showSidebar = selectedDate && (view === 'month' || view === 'week');

  return (
    <div className='space-y-3 sm:space-y-4'>
      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 flex items-center gap-2 flex-wrap'>
        {/* View switcher */}
        <div className='flex gap-0.5 bg-gray-100 rounded-lg p-0.5'>
          {VIEW_OPTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setView(id);
                setSelectedDate(null);
              }}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                view === id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={12} />
              <span className='hidden sm:inline'>{label}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        {view !== 'list' && (
          <div className='flex items-center gap-1'>
            <button
              onClick={() => navigate(-1)}
              className='p-1.5 rounded-lg hover:bg-gray-100 text-gray-600'
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={goToday}
              className='px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg font-medium hidden sm:block'
            >
              Hari Ini
            </button>
            <button
              onClick={() => navigate(1)}
              className='p-1.5 rounded-lg hover:bg-gray-100 text-gray-600'
            >
              <ChevronRight size={15} />
            </button>
            <span className='text-xs sm:text-sm font-semibold text-gray-700 ml-1 whitespace-nowrap'>
              {navLabel()}
            </span>
          </div>
        )}

        {/* Right side actions */}
        <div className='ml-auto flex items-center gap-2'>
          <button
            onClick={() => {
              fetchSlots();
              fetchPendingVolunteers();
            }}
            className='p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-100 transition-colors hidden sm:block'
          >
            <RefreshCw size={13} />
          </button>

          {/* + Assign button with dropdown */}
          <div ref={assignMenuRef} className='relative'>
            <button
              onClick={() => setShowAssignMenu((s) => !s)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg font-medium border transition-all ${
                assignMode
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              <Plus size={14} />
              <span>Assign</span>
              <ChevronDown
                size={12}
                className={`transition-transform ${showAssignMenu ? 'rotate-180' : ''}`}
              />
            </button>

            {showAssignMenu && (
              <div className='absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-30 w-52 overflow-hidden'>
                <button
                  onClick={() => openAssign('manual')}
                  className='w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left'
                >
                  <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <UserPlus size={15} className='text-primary' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-800'>Manual</p>
                    <p className='text-xs text-gray-500'>
                      Assign satu per satu
                    </p>
                  </div>
                </button>
                <div className='border-t border-gray-100' />
                <button
                  onClick={() => openAssign('excel')}
                  className='w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left'
                >
                  <div className='w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0'>
                    <FileSpreadsheet size={15} className='text-green-600' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-800'>
                      Via Excel
                    </p>
                    <p className='text-xs text-gray-500'>
                      Bulk assign dari file
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Kirim Notifikasi */}
          <button
            onClick={handleSendNotifications}
            disabled={sending || notSentCount === 0}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg font-medium transition-all ${
              notSentCount > 0
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={14} />
            <span className='hidden sm:inline'>Kirim Notifikasi</span>
            {notSentCount > 0 && (
              <span className='bg-white/30 text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                {notSentCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Assign Panel ─────────────────────────────────────── */}
      {assignMode && (
        <AssignPanel
          mode={assignMode}
          volunteers={volunteers}
          selectedDate={selectedDate}
          baseUrl={baseUrl}
          headers={headers}
          fileInputRef={fileInputRef}
          onManualSuccess={() => {
            handleAssignSuccess();
            closeAssign();
          }}
          onExcelSuccess={handleAssignSuccess}
          onClose={closeAssign}
        />
      )}

      {/* ── Legend ───────────────────────────────────────────── */}
      {(view === 'month' || view === 'week') && (
        <div className='flex flex-wrap gap-x-3 gap-y-1 px-1'>
          {Object.values(NOTIF_STATUS).map((v) => (
            <span
              key={v.label}
              className='flex items-center gap-1.5 text-xs text-gray-500'
            >
              <span className={`w-2 h-2 rounded-full ${v.dot}`} />
              {v.label}
            </span>
          ))}
        </div>
      )}

      {/* ── Calendar / List ──────────────────────────────────── */}
      {loading ? (
        <div className='bg-white rounded-xl border border-gray-200 p-16 text-center text-gray-400 text-sm'>
          Memuat jadwal...
        </div>
      ) : view === 'list' ? (
        <ListView slots={slots} onUpdateStatus={handleUpdateSlotStatus} />
      ) : (
        <div
          className={`grid gap-4 ${showSidebar ? 'grid-cols-1 lg:grid-cols-5' : 'grid-cols-1'}`}
        >
          <div className={showSidebar ? 'lg:col-span-3' : ''}>
            {view === 'month' && (
              <MonthView
                slots={slots}
                selectedDate={selectedDate}
                onDayClick={handleDayClick}
                cursor={cursor}
              />
            )}
            {view === 'week' && (
              <WeekView
                slots={slots}
                cursor={cursor}
                onDayClick={handleDayClick}
              />
            )}
            {view === 'day' && (
              <DayView
                slots={slots}
                cursor={cursor}
                onUpdateStatus={handleUpdateSlotStatus}
              />
            )}
          </div>
          {showSidebar && (
            <div className='lg:col-span-2'>
              <DayDetailPanel
                date={selectedDate}
                slots={selectedDaySlots}
                onUpdateStatus={handleUpdateSlotStatus}
                onClose={() => {
                  setSelectedDate(null);
                  setSelectedDaySlots([]);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────── */}
      {!loading && slots.length > 0 && (
        <div className='flex flex-wrap gap-2 text-xs text-gray-500 px-1'>
          <span className='font-medium text-gray-700'>
            {slots.length} total
          </span>
          ·
          <span className='text-yellow-600'>
            {slots.filter((s) => s.notification_status === 'not_sent').length}{' '}
            belum
          </span>
          ·
          <span className='text-orange-600'>
            {slots.filter((s) => s.notification_status === 'outdated').length}{' '}
            perlu ulang
          </span>
          ·
          <span className='text-green-600'>
            {slots.filter((s) => s.notification_status === 'synced').length}{' '}
            terkirim
          </span>
        </div>
      )}
    </div>
  );
}
