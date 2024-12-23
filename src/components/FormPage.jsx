import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import 'tailwindcss/tailwind.css';
import '../styles/styles.css';

const FormPage = () => {
  const [nim, setNim] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [dateTime, setDateTime] = useState(moment().tz('Asia/Jakarta'));

  // Update datetime every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(moment().tz('Asia/Jakarta'));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format datetime
  const formatDateTime = (date) => {
    return date.format('dddd, MMMM Do YYYY, h:mm:ss A');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Mengirimkan formulir dengan data:', { name, nim, reason });
    try {
      const response = await axios.post('http://localhost:3000/api/tamu', {
        name,
        nim,
        reason,
      });
      console.log('Data respons:', response.data);
      
      // Enhanced SweetAlert
      Swal.fire({
        title: 'Selamat Datang di LDKOM!',
        text: `${name}`,
        icon: 'success',
        confirmButtonText: 'OK',
        background: 'rgba(255, 255, 255, 1)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        customClass: {
          confirmButton: 'bg-customRed hover:bg-customRedLight text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200',
          popup: 'shadow-lg rounded-lg'
        },
        buttonsStyling: false
      });

      // Reset form fields
      setName('');
      setNim('');
      setReason('');
    } catch (error) {
      console.error('Kesalahan:', error);
      
      // Enhanced error alert
      Swal.fire({
        title: 'Oops...',
        text: 'Terjadi kesalahan saat mengirimkan data Anda',
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
        background: 'rgba(255, 255, 255, 1)',
        customClass: {
          confirmButton: 'bg-customRed hover:bg-customRedLight text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200',
          popup: 'shadow-lg rounded-lg'
        },
        buttonsStyling: false
      });
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden fixed inset-0 bg-gradient-to-br from-customRed via-customRedLight to-gray-900">
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>

      {/* DateTime display - Added at the top */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-lg">
        <p className="text-white/90 font-medium text-center">
          {formatDateTime(dateTime)}
        </p>
      </div>

      <div className="w-full max-w-md p-8 mx-4 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl relative z-10 border border-white/20">
        <h1 className="text-4xl font-bold mb-4 text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-customRed to-customRedLight">
          Selamat Datang di LDKOM
        </h1>
        <p className="mb-6 text-white/80 text-center">Jangan lupa untuk mengisi buku tamu</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">Nama</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 text-gray-900 bg-white/90 border border-white/20 rounded-lg focus:ring-customRed focus:border-customRed transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="nim" className="block text-sm font-medium text-white/90 mb-2">NIM</label>
            <input
              type="text"
              id="nim"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="block w-full px-4 py-2 text-gray-900 bg-white/90 border border-white/20 rounded-lg focus:ring-customRed focus:border-customRed transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-white/90 mb-2">Alasan</label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-customRed text-gray-900"
              required
            >
              <option value="" disabled>Pilih alasan</option>
              <option value="Belajar">Belajar</option>
              <option value="Bimbingan">Bimbingan</option>
              <option value="Ngeprint">Ngeprint</option>
              <option value="Hosting">Hosting</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-customRed hover:bg-customRedLight text-white font-medium py-3 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
          >
            Kirim
          </button>
        </form>
      </div>

      <div className="absolute bottom-0 w-screen text-white py-2 text-center">
        © 2024 LDKOM All Rights Reserved 
      </div>
    </div>
  );
};

export default FormPage;