import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Instagram,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Link,
} from 'lucide-react';

const InfoItem = ({ label, value, icon: Icon }) => (
  <div className='flex flex-col gap-1 p-3 bg-gray-50 rounded-lg border border-gray-100'>
    <div className='flex items-center gap-1.5'>
      {Icon && <Icon size={13} className='text-primary' />}
      <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>
        {label}
      </span>
    </div>
    <span className='text-gray-800 font-medium text-sm'>{value || '-'}</span>
  </div>
);

const QAItem = ({ number, question, answer }) => (
  <div className='mb-4 last:mb-0'>
    <div className='flex gap-2 mb-1.5'>
      <span className='flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5'>
        {number}
      </span>
      <p className='text-sm font-semibold text-gray-700 leading-relaxed'>
        {question}
      </p>
    </div>
    <div className='ml-8 bg-blue-50/60 border-l-4 border-primary p-3 rounded-r-lg text-gray-800 text-sm leading-relaxed whitespace-pre-wrap'>
      {answer || <span className='text-gray-400 italic'>Tidak diisi</span>}
    </div>
  </div>
);

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className='bg-white rounded-xl border border-gray-200 overflow-hidden mb-4'>
      <button
        onClick={() => setOpen((o) => !o)}
        className='w-full flex items-center justify-between px-5 py-4 bg-primary text-white hover:bg-primary/90 transition-colors'
      >
        <span className='font-semibold text-sm'>{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className='p-5'>{children}</div>}
    </div>
  );
};

const STATUS_LABELS = {
  pending: 'Pending',
  interview_scheduled: 'Interview',
  accepted: 'Diterima',
  rejected: 'Ditolak',
};
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  interview_scheduled: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const ROLE_OPTIONS = [
  'Participant Support',
  'Speaker & Session Assistance',
  'Logistics & Movement',
  'Science Engagement',
  'Crowd & Direction Control',
  'Medical & Safety Support',
];

// Maps short keys saved by the registration form to human-readable labels
const EVENT_LABELS = {
  BAW: 'Brain Awareness Week',
  TTHB: 'Teaching the Healing Brain',
};

function formatEvents(events) {
  if (!events) return '-';
  const arr = Array.isArray(events) ? events : [events];
  if (arr.length === 0) return '-';
  return arr.map((e) => EVENT_LABELS[e] || e).join(', ');
}

function formatBool(val) {
  if (val === true) return 'Ya';
  if (val === false) return 'Tidak';
  return '-';
}

export default function VolunteerDetailModal({
  volunteer,
  baseUrl,
  onClose,
  onRefresh,
}) {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  const [loading, setLoading] = useState(false);

  const submission = (() => {
    try {
      return JSON.parse(volunteer.submission_data || '{}');
    } catch {
      return {};
    }
  })();

  const availability = submission.availability || {};
  const motivation = submission.motivation || {};
  const role = submission.role || {};
  const situational = submission.situational || {};
  const commitment = submission.commitment || {};
  const additional = submission.additional || {};

  const handleQuickDecision = async (decision) => {
    const isAccept = decision === 'accept';

    if (!isAccept) {
      const result = await Swal.fire({
        title: 'Tolak Volunteer',
        html: `<p class="text-sm text-gray-600 mb-3">Masukkan alasan penolakan untuk <b>${volunteer.name}</b></p>
               <textarea id="reason" class="swal2-textarea w-full" placeholder="Contoh: Tidak memenuhi kriteria waktu..." style="margin:0;width:100%;box-sizing:border-box"></textarea>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Tolak',
        cancelButtonText: 'Batal',
        preConfirm: () => {
          const reason = Swal.getPopup().querySelector('#reason').value;
          if (!reason) Swal.showValidationMessage('Alasan wajib diisi');
          return { reason };
        },
      });
      if (!result.isConfirmed) return;

      Swal.fire({
        title: 'Memproses...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        setLoading(true);
        await axios.post(
          `${baseUrl}/admin/volunteers/bulk-review`,
          {
            action: 'reject',
            emails: [volunteer.email],
            reason: result.value.reason,
          },
          { headers },
        );
        await Swal.fire({
          icon: 'success',
          title: 'Berhasil ditolak',
          timer: 1500,
          showConfirmButton: false,
        });
        onRefresh();
        onClose();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: err.response?.data?.message || err.message,
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    // Accept
    const result = await Swal.fire({
      title: 'Terima Volunteer',
      html: `<p class="text-sm text-gray-600 mb-3">Terima <b>${volunteer.name}</b> sebagai volunteer?</p>
             <label class="text-xs font-semibold text-gray-500 block mb-1 text-left">Assigned Role (opsional)</label>
             <select id="assigned_role" class="swal2-input" style="margin:0;width:100%;box-sizing:border-box">
               <option value="">-- Default: Volunteer --</option>
               ${ROLE_OPTIONS.map((r) => `<option value="${r}">${r}</option>`).join('')}
             </select>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Terima',
      cancelButtonText: 'Batal',
      preConfirm: () => ({
        assigned_role:
          Swal.getPopup().querySelector('#assigned_role').value || 'Volunteer',
      }),
    });
    if (!result.isConfirmed) return;

    Swal.fire({
      title: 'Memproses...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      setLoading(true);
      await axios.post(
        `${baseUrl}/admin/volunteers/bulk-review`,
        {
          action: 'accept',
          emails: [volunteer.email],
          assigned_role: result.value.assigned_role,
        },
        { headers },
      );
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil diterima',
        timer: 1500,
        showConfirmButton: false,
      });
      onRefresh();
      onClose();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={onClose} className='fixed inset-0 bg-black/30 z-40' />
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div className='bg-gray-50 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden'>
          {/* Header */}
          <div className='bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0'>
            <div>
              <h2 className='text-lg font-bold text-gray-800'>
                {volunteer.name}
              </h2>
              <div className='flex items-center gap-2 mt-1'>
                <span className='text-xs text-gray-500'>
                  {volunteer.application_id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[volunteer.status]}`}
                >
                  {STATUS_LABELS[volunteer.status]}
                </span>
                {volunteer.assigned_role && (
                  <span className='px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700'>
                    {volunteer.assigned_role}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors'
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className='overflow-y-auto flex-1 p-5 space-y-0'>
            {/* A. Data Pribadi */}
            <Section title='Data Pribadi'>
              <div className='grid md:grid-cols-2 gap-3'>
                <InfoItem label='Nama' value={volunteer.name} icon={User} />
                <InfoItem label='Email' value={volunteer.email} icon={Mail} />
                <InfoItem
                  label='Telepon'
                  value={volunteer.phone}
                  icon={Phone}
                />
                <InfoItem label='Kota' value={volunteer.city} icon={MapPin} />
                <InfoItem
                  label='Alamat'
                  value={volunteer.address}
                  icon={MapPin}
                />
                <InfoItem
                  label='Usia'
                  value={volunteer.age ? `${volunteer.age} tahun` : '-'}
                  icon={User}
                />
                <InfoItem
                  label='Status'
                  value={volunteer.occupation}
                  icon={Briefcase}
                />
                <InfoItem
                  label='Institusi'
                  value={volunteer.organization}
                  icon={Building2}
                />
              </div>

              {/* Attachments: 3 columns */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-3'>
                {/* Bukti Follow IG */}
                <div className='p-3 bg-gray-50 rounded-lg border border-gray-100'>
                  <div className='flex items-center gap-1.5 mb-2'>
                    <Instagram size={13} className='text-primary' />
                    <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>
                      Bukti Follow IG
                    </span>
                  </div>
                  {volunteer.instagram_proof ? (
                    <img
                      src={`${baseUrl}/${volunteer.instagram_proof}`}
                      alt='Bukti Instagram'
                      className='w-36 h-auto rounded-lg border cursor-zoom-in hover:scale-105 transition-transform'
                      onClick={() =>
                        window.open(
                          `${baseUrl}/${volunteer.instagram_proof}`,
                          '_blank',
                        )
                      }
                    />
                  ) : (
                    <span className='text-xs text-gray-400 italic'>
                      Tidak ada
                    </span>
                  )}
                </div>

                {/* Twibbon Link — from additional.twibbon_link */}
                <div className='p-3 bg-gray-50 rounded-lg border border-gray-100'>
                  <div className='flex items-center gap-1.5 mb-2'>
                    <Link size={13} className='text-primary' />
                    <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>
                      Link Twibbon
                    </span>
                  </div>
                  {additional.twibbon_link ? (
                    <a
                      href={additional.twibbon_link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-start gap-1.5 text-sm text-blue-600 hover:underline font-medium'
                    >
                      <ExternalLink
                        size={13}
                        className='flex-shrink-0 mt-0.5'
                      />
                      <span className='break-all line-clamp-3'>
                        {additional.twibbon_link}
                      </span>
                    </a>
                  ) : (
                    <span className='text-xs text-gray-400 italic'>
                      Tidak ada
                    </span>
                  )}
                </div>

                {/* CV / Portofolio */}
                <div className='p-3 bg-gray-50 rounded-lg border border-gray-100'>
                  <div className='flex items-center gap-1.5 mb-2'>
                    <FileText size={13} className='text-primary' />
                    <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>
                      CV / Portofolio
                    </span>
                  </div>
                  {volunteer.cv_portfolio ? (
                    <a
                      href={`${baseUrl}/${volunteer.cv_portfolio}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline font-medium'
                    >
                      <ExternalLink size={13} /> Lihat File
                    </a>
                  ) : (
                    <span className='text-xs text-gray-400 italic'>
                      Tidak dilampirkan
                    </span>
                  )}
                </div>
              </div>
            </Section>

            {/* A. Ketersediaan Waktu */}
            <Section title='A. Ketersediaan Waktu'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <InfoItem
                  label='1. Tersedia pada'
                  value={formatEvents(availability.events)}
                />
                <InfoItem
                  label='2. Bersedia briefing'
                  value={formatBool(availability.willing_briefing)}
                />
                <InfoItem
                  label='3. Hadir 06.30–17.00'
                  value={formatBool(availability.full_day)}
                />
              </div>
            </Section>

            {/* C. Motivasi & Kompetensi */}
            <Section title='C. Motivasi & Kompetensi'>
              <QAItem
                number={4}
                question='Mengapa Anda ingin menjadi volunteer untuk Brain Awareness Week & Teaching the Healing Brain?'
                answer={motivation.why_volunteer}
              />
              <QAItem
                number={5}
                question='Apa ketertarikan Anda terhadap neurosains, pendidikan, kesehatan mental, atau kegiatan berbasis komunitas?'
                answer={motivation.interest}
              />
              <QAItem
                number={6}
                question='Ceritakan pengalaman Anda sebelumnya dalam kegiatan volunteer, event organizing, edukasi publik, atau komunitas.'
                answer={motivation.experience}
              />
            </Section>

            {/* D. Kesesuaian Peran */}
            <Section title='D. Kesesuaian dengan Peran'>
              <div className='mb-4'>
                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>
                  Peran yang dipilih
                </p>
                <div className='flex flex-wrap gap-2'>
                  {Array.isArray(role.preferred_roles) &&
                  role.preferred_roles.length > 0 ? (
                    role.preferred_roles.map((r) => (
                      <span
                        key={r}
                        className='px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full'
                      >
                        {r}
                      </span>
                    ))
                  ) : (
                    <span className='text-xs text-gray-400 italic'>
                      Tidak diisi
                    </span>
                  )}
                </div>
              </div>
              <QAItem
                number={7}
                question='Jelaskan mengapa Anda cocok untuk peran tersebut.'
                answer={role.why_suitable}
              />
              <QAItem
                number={8}
                question='Bagaimana Anda menjelaskan konsep yang sulit kepada audiens awam?'
                answer={role.explain_difficult}
              />
              <QAItem
                number={9}
                question='Ceritakan pengalaman berinteraksi dengan audiens yang beragam.'
                answer={role.diverse_audience}
              />
              <QAItem
                number={10}
                question='Bagaimana Anda bersikap jika ada peserta yang bingung atau salah ruangan?'
                answer={role.handle_confused}
              />
              <QAItem
                number={11}
                question='Apa yang akan Anda lakukan jika melihat peserta yang membutuhkan bantuan khusus (DEI)?'
                answer={role.dei_response}
              />
            </Section>

            {/* E. Situational Judgment */}
            <Section title='E. Situational Judgment'>
              <QAItem
                number={12}
                question='Jika terjadi antrean panjang di registrasi, apa langkah pertama yang Anda lakukan?'
                answer={situational.long_queue}
              />
              <QAItem
                number={13}
                question='Jika narasumber membutuhkan sesuatu secara mendadak, apa tindakan Anda?'
                answer={situational.speaker_need}
              />
              <QAItem
                number={14}
                question='Bagaimana jika ada peserta yang merasa tidak enak badan?'
                answer={situational.unwell_participant}
              />
              <QAItem
                number={15}
                question='Jika terjadi perubahan agenda tiba-tiba, bagaimana Anda menyesuaikan diri?'
                answer={situational.agenda_change}
              />
              <QAItem
                number={16}
                question='Jika ruangan mulai penuh dan arus peserta padat, bagaimana Anda mengatur arah pergerakan peserta?'
                answer={situational.crowd_control}
              />
            </Section>

            {/* F. Komitmen & Profesionalisme */}
            <Section title='F. Komitmen & Profesionalisme'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mb-4'>
                <InfoItem
                  label='17. Siap suasana dinamis'
                  value={formatBool(commitment.dynamic_env)}
                />
                <InfoItem
                  label='18. Bersedia all-hands'
                  value={formatBool(commitment.all_hands)}
                />
                <InfoItem
                  label='19. Kondisi kesehatan'
                  value={commitment.health_condition || 'Tidak ada'}
                />
              </div>
              <QAItem
                number={20}
                question='Bagaimana Anda memastikan diri tetap profesional dan helpful di bawah tekanan?'
                answer={commitment.professionalism}
              />
            </Section>

            {/* G. Informasi Tambahan */}
            <Section title='G. Informasi Tambahan' defaultOpen={true}>
              <QAItem
                number={21}
                question='Apakah Anda memiliki pertanyaan, masukan, atau hal lain yang ingin disampaikan?'
                answer={additional.notes}
              />
            </Section>

            {/* Interview Slot */}
            {volunteer.interview_slot && (
              <Section title='Jadwal Interview'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                  <InfoItem
                    label='Tanggal'
                    value={new Date(
                      volunteer.interview_slot.date,
                    ).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                    icon={Calendar}
                  />
                  <InfoItem
                    label='Waktu'
                    value={`${volunteer.interview_slot.start_time} – ${volunteer.interview_slot.end_time} WIB`}
                  />
                  <InfoItem
                    label='Status Slot'
                    value={volunteer.interview_slot.status}
                  />
                  <div className='p-3 bg-gray-50 rounded-lg border border-gray-100'>
                    <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1'>
                      Meet Link
                    </span>
                    <a
                      href={volunteer.interview_slot.meet_link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:underline text-xs flex items-center gap-1'
                    >
                      <ExternalLink size={11} /> Buka Link
                    </a>
                  </div>
                </div>
              </Section>
            )}

            {volunteer.rejection_reason && (
              <div className='bg-red-50 border border-red-200 rounded-xl p-4 mb-4'>
                <p className='text-xs font-semibold text-red-600 uppercase mb-1'>
                  Alasan Penolakan
                </p>
                <p className='text-sm text-red-700'>
                  {volunteer.rejection_reason}
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className='bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors'
            >
              Tutup
            </button>
            {['pending', 'interview_scheduled'].includes(volunteer.status) && (
              <div className='flex gap-2'>
                <button
                  onClick={() => handleQuickDecision('reject')}
                  disabled={loading}
                  className='flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50'
                >
                  <XCircle size={15} /> Tolak
                </button>
                <button
                  onClick={() => handleQuickDecision('accept')}
                  disabled={loading}
                  className='flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50'
                >
                  <CheckCircle size={15} /> Terima
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
