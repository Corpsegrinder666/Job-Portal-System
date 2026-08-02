'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface SignupModalProps {
  onClose: () => void;
}

export default function SignupModal({ onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    email: '',
    dob: '',
    educationalQualification: '',
    role: 'hr',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isAdult = (dobStr: string) => {
    if (!dobStr) return false;
    const birthDate = new Date(dobStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const validateForm = () => {
    setError(null);

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First and Last name are required.");
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Invalid email.");
      return false;
    }

    if (!formData.dob || !isAdult(formData.dob)) {
      setError("You must be at least 18 years old to register.");
      return false;
    }

    const qualifications = ['bachelors', 'masters', 'phd'];
    if (!qualifications.includes(formData.educationalQualification.toLowerCase())) {
      setError("Education must be bachelors, masters, or phd.");
      return false;
    }

    if (!['hr', 'admin'].includes(formData.role)) {
      setError("Invalid role.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (!/[0-9]/.test(formData.password)) {
      setError("Password must contain at least one number.");
      return false;
    }

    if (!/[!@#$%^&*-]/.test(formData.password)) {
      setError("Password must contain at least one special character (!@#$%^&*-).");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/auth/signup', formData);
      setSuccessMsg("Signup successful! Please verify email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed z-50 top-1/2 left-1/2 w-full max-w-lg bg-white rounded-md shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2 overflow-auto max-h-[90vh]">
        <h2 className="text-3xl font-extrabold text-[#75A957] mb-4">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-[#38303D]">
          <div className="flex space-x-4">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded-md"
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded-md"
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <div className="flex space-x-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded-md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded-md"
              required
            />
          </div>

          <select
            name="educationalQualification"
            value={formData.educationalQualification}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Education</option>
            <option value="bachelors">Bachelors</option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
          </select>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          {error && <p className="text-red-600">{error}</p>}
          {successMsg && <p className="text-green-600">{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#75A957] text-white py-2 rounded-md hover:bg-[#62914a] transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#38303D]">
          Already have an account?
          <button
            onClick={() => {
              onClose();
              document.dispatchEvent(new CustomEvent('open-login'));
            }}
            className="text-[#75A957] ml-1 underline font-semibold"
          >
            Login
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
