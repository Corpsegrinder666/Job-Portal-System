'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { access_token } = res.data;
      localStorage.setItem('accessToken', access_token);  // Use consistent key

      onLogin();
      onClose();

      router.push('/dashboard'); // Redirect to dashboard after login
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = () => document.dispatchEvent(new CustomEvent('open-signup'));
    document.addEventListener('open-login', handler);
    return () => document.removeEventListener('open-login', handler);
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed z-50 top-1/2 left-1/2 w-full max-w-md bg-white rounded-md shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-3xl font-extrabold text-[#75A957] mb-4">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-[#38303D]">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#75A957] text-white py-2 rounded-md hover:bg-[#62914a] transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#38303D]">
          Don’t have an account?
          <button
            onClick={() => {
              onClose();
              document.dispatchEvent(new CustomEvent('open-signup'));
            }}
            className="text-[#75A957] ml-1 underline font-semibold"
          >
            Sign Up
          </button>
        </p>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline block text-center"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
