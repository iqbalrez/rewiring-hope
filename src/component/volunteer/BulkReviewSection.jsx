import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Download,
  Upload,
  Send,
  Plus,
  X,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
} from 'lucide-react';

const ROLE_OPTIONS = [
  'Volunteer',
  'Participant Support',
  'Speaker & Session Assistance',
  'Logistics & Movement',
  'Science Engagement',
  'Crowd & Direction Control',
  'Medical & Safety Support',
];

export default function BulkReviewSection({ baseUrl, headers, onRefresh }) {
  const [mode, setMode] = useState('manual'); // 'excel' | 'manual'
  const [dragOver, setDragOver] = useState(false);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef();

  // Manual mode state
  const [manualAction, setManualAction] = useState('accept');
  const [manualEmails, setManualEmails] = useState(['']);
  const [manualReason, setManualReason] = useState('');
  const [manualRole, setManualRole] = useState('Volunteer');

  const handleDownloadTemplate = () => {
    window.open(`${baseUrl}/admin/volunteers/bulk-review/template`, '_blank');
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
        `${baseUrl}/admin/volunteers/bulk-review`,
        formData,
        {
          headers: { ...headers, 'Content-Type': 'multipart/form-data' },
        },
      );
      await Swal.fire({
        icon: 'success',
        title: 'Bulk Review Berhasil',
        html: `<p>${data.message}</p>
               <p class="text-sm text-gray-500 mt-2">Status sudah diperbarui di database. Klik <b>"Kirim Notifikasi"</b> untuk blast email.</p>
               ${
                 data.results.failed.length > 0
                   ? `
                 <div class="mt-3 text-left text-sm bg-red-50 border border-red-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                   <p class="font-semibold text-red-600 mb-1">Gagal (${data.results.failed.length}):</p>
                   ${data.results.failed.map((f) => `<p class="text-red-700">• ${f.email}: ${f.reason}</p>`).join('')}
                 </div>`
                   : ''
               }`,
      });
      onRefresh();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Upload',
        text: err.response?.data?.message || err.message,
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleManualSubmit = async () => {
    const validEmails = manualEmails.filter((e) => e.trim());
    if (validEmails.length === 0) {
      return Swal.fire({
        icon: 'warning',
        title: 'Minimal 1 email wajib diisi',
      });
    }
    if (manualAction === 'reject' && !manualReason.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Alasan penolakan wajib diisi',
      });
    }

    const result = await Swal.fire({
      icon: 'question',
      title: `${manualAction === 'accept' ? 'Terima' : 'Tolak'} ${validEmails.length} Volunteer?`,
      html: `<p class="text-sm text-gray-600">
               ${
                 manualAction === 'accept'
                   ? `Akan menerima <b>${validEmails.length}</b> volunteer dengan role <b>${manualRole}</b>.`
                   : `Akan menolak <b>${validEmails.length}</b> volunteer.`
               }
             </p>
             <p class="text-sm text-gray-400 mt-1">Email belum dikirim — gunakan "Kirim Notifikasi" setelahnya.</p>`,
      showCancelButton: true,
      confirmButtonText: 'Ya, Proses',
      cancelButtonText: 'Batal',
      confirmButtonColor: manualAction === 'accept' ? '#16a34a' : '#dc2626',
    });
    if (!result.isConfirmed) return;

    Swal.fire({
      title: 'Memproses...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      const payload = {
        action: manualAction,
        emails: validEmails,
        ...(manualAction === 'accept'
          ? { assigned_role: manualRole }
          : { reason: manualReason }),
      };
      const { data } = await axios.post(
        `${baseUrl}/admin/volunteers/bulk-review`,
        payload,
        { headers },
      );
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil Diproses',
        html: `<p>${data.message}</p>
               <p class="text-sm text-gray-500 mt-1">Klik <b>"Kirim Notifikasi"</b> untuk blast email.</p>`,
      });
      setManualEmails(['']);
      setManualReason('');
      onRefresh();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const handleSendNotifications = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Kirim Notifikasi Hasil Seleksi',
      html: `<p class="text-sm">Akan mengirim email ke semua volunteer yang statusnya sudah <b>diterima/ditolak</b> dan <b>belum mendapat notifikasi</b>.</p>`,
      showCancelButton: true,
      confirmButtonText: 'Ya, Kirim',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#1E3A5F',
    });
    if (!result.isConfirmed) return;

    setSending(true);
    Swal.fire({
      title: 'Mengirim email...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      const { data } = await axios.post(
        `${baseUrl}/admin/volunteers/bulk-review/send-notifications`,
        {},
        { headers },
      );
      await Swal.fire({
        icon: 'success',
        title: 'Email sedang dikirim',
        html: `<p>Mengirim ke <b>${data.total}</b> volunteer di background.</p>`,
      });
      onRefresh();
    } catch (err) {
      Swal.fire({
        icon: err.response?.status === 400 ? 'info' : 'error',
        title:
          err.response?.status === 400
            ? 'Tidak ada yang perlu dinotifikasi'
            : 'Gagal',
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setSending(false);
    }
  };

  const addEmailRow = () => setManualEmails((prev) => [...prev, '']);
  const removeEmailRow = (idx) =>
    setManualEmails((prev) => prev.filter((_, i) => i !== idx));
  const updateEmail = (idx, val) =>
    setManualEmails((prev) => prev.map((e, i) => (i === idx ? val : e)));

  return (
    <div className='space-y-4'>
      {/* Top Action Bar */}
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3'>
        <div className='flex gap-2'>
          <button
            onClick={() => setMode('manual')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
              mode === 'manual'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Input Manual
          </button>
          <button
            onClick={() => setMode('excel')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
              mode === 'excel'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Upload Excel
          </button>
        </div>
        <button
          onClick={handleSendNotifications}
          disabled={sending}
          className='flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50'
        >
          <Send size={15} /> Kirim Notifikasi Email
        </button>
      </div>

      {/* Excel Mode */}
      {mode === 'excel' && (
        <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6'>
          <h3 className='text-sm font-semibold text-gray-700 mb-1'>
            Bulk Review via Excel
          </h3>
          <p className='text-xs text-gray-500 mb-5'>
            Download template, isi kolom{' '}
            <code className='bg-gray-100 px-1 rounded'>decision</code>{' '}
            (accept/reject) dan{' '}
            <code className='bg-gray-100 px-1 rounded'>reason</code>, lalu
            upload kembali. Email <b>tidak</b> langsung terkirim — gunakan
            tombol "Kirim Notifikasi" setelah upload.
          </p>

          {/* Step 1: Download */}
          <div className='flex items-start gap-4 mb-5 p-4 bg-gray-50 rounded-xl border border-gray-100'>
            <div className='w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5'>
              1
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold text-gray-700 mb-1'>
                Download Template
              </p>
              <p className='text-xs text-gray-500 mb-3'>
                Template berisi semua volunteer + status saat ini. Kolom name,
                email, status sudah terkunci (referensi saja).
              </p>
              <button
                onClick={handleDownloadTemplate}
                className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:border-primary transition-all shadow-sm'
              >
                <Download size={15} className='text-primary' /> Download
                Template Excel
              </button>
            </div>
          </div>

          {/* Step 2: Upload */}
          <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100'>
            <div className='w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5'>
              2
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold text-gray-700 mb-1'>
                Upload Excel yang Sudah Diisi
              </p>
              <p className='text-xs text-gray-500 mb-3'>
                Baris dengan kolom{' '}
                <code className='bg-gray-100 px-1 rounded'>decision</code>{' '}
                kosong akan dilewati otomatis.
              </p>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-primary bg-blue-50'
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
                  size={28}
                  className={`mx-auto mb-2 ${dragOver ? 'text-primary' : 'text-gray-400'}`}
                />
                <p className='text-sm text-gray-600'>
                  Drag & drop file Excel di sini, atau{' '}
                  <span className='text-primary font-medium'>
                    klik untuk pilih file
                  </span>
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

      {/* Manual Mode */}
      {mode === 'manual' && (
        <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6'>
          <h3 className='text-sm font-semibold text-gray-700 mb-1'>
            Input Manual (List Email)
          </h3>
          <p className='text-xs text-gray-500 mb-5'>
            Masukkan satu atau beberapa email volunteer, pilih keputusan, lalu
            proses. Email <b>tidak</b> langsung terkirim.
          </p>

          {/* Action Toggle */}
          <div className='flex gap-2 mb-5'>
            <button
              onClick={() => setManualAction('accept')}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg font-medium border-2 transition-all ${
                manualAction === 'accept'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <CheckCircle2 size={15} /> Terima
            </button>
            <button
              onClick={() => setManualAction('reject')}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg font-medium border-2 transition-all ${
                manualAction === 'reject'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <XCircle size={15} /> Tolak
            </button>
          </div>

          {/* Role (accept only) */}
          {manualAction === 'accept' && (
            <div className='mb-4'>
              <label className='text-xs font-semibold text-gray-500 block mb-1'>
                Assigned Role
              </label>
              <select
                value={manualRole}
                onChange={(e) => setManualRole(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reason (reject only) */}
          {manualAction === 'reject' && (
            <div className='mb-4'>
              <label className='text-xs font-semibold text-gray-500 block mb-1'>
                Alasan Penolakan <span className='text-red-500'>*</span>
              </label>
              <textarea
                value={manualReason}
                onChange={(e) => setManualReason(e.target.value)}
                rows={2}
                placeholder='Contoh: Tidak memenuhi kriteria ketersediaan waktu...'
                className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none'
              />
            </div>
          )}

          {/* Email List */}
          <div className='mb-4'>
            <div className='flex items-center justify-between mb-2'>
              <label className='text-xs font-semibold text-gray-500'>
                Daftar Email <span className='text-red-500'>*</span>
              </label>
              <span className='text-xs text-gray-400'>
                {manualEmails.filter((e) => e.trim()).length} email
              </span>
            </div>
            <div className='space-y-2'>
              {manualEmails.map((email, idx) => (
                <div key={idx} className='flex gap-2'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => updateEmail(idx, e.target.value)}
                    placeholder={`Email volunteer ${idx + 1}...`}
                    className='flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'
                  />
                  {manualEmails.length > 1 && (
                    <button
                      onClick={() => removeEmailRow(idx)}
                      className='p-2 text-gray-400 hover:text-red-500 transition-colors'
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addEmailRow}
              className='mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium'
            >
              <Plus size={13} /> Tambah email
            </button>
          </div>

          {/* Submit */}
          <div className='flex justify-end'>
            <button
              onClick={handleManualSubmit}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm text-white rounded-lg font-medium transition-colors ${
                manualAction === 'accept'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              <Users size={15} />
              {manualAction === 'accept'
                ? `Terima ${manualEmails.filter((e) => e.trim()).length} Volunteer`
                : `Tolak ${manualEmails.filter((e) => e.trim()).length} Volunteer`}
            </button>
          </div>
        </div>
      )}

      {/* Send Notification Info Box */}
      <div className='bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3'>
        <AlertCircle size={16} className='text-blue-500 flex-shrink-0 mt-0.5' />
        <div>
          <p className='text-sm font-semibold text-blue-700'>
            Penting: Email Tidak Otomatis Terkirim
          </p>
          <p className='text-xs text-blue-600 mt-0.5'>
            Setelah upload Excel atau input manual, status volunteer sudah
            berubah di database, tapi email belum dikirim. Klik tombol{' '}
            <b>"Kirim Notifikasi Email"</b> di atas untuk blast email ke semua
            yang belum mendapat notifikasi. Ini berlaku juga jika ada data yang
            dioverwrite — sistem hanya mengirim ke yang{' '}
            <code className='bg-blue-100 px-1 rounded'>review_notified_at</code>
            -nya null.
          </p>
        </div>
      </div>
    </div>
  );
}
