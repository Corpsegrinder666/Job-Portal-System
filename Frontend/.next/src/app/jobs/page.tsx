'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/app/components/sidebar';
import Topbar from '@/app/components/topbar';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  company: string;
  createdAt: string;
  updatedAt: string;
}

export default function JobPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState<Partial<Job>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/job');
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company) {
      alert('Title and Company are required');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/job/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/job', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({});
      setEditingId(null);
      fetchJobs();
    } catch (err) {
      console.error('Error submitting job', err);
    }
  };

  const handleEdit = (job: Job) => {
    setForm(job);
    setEditingId(job.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job', err);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 text-[#38303D] font-sans">
      <Sidebar />
      <div className="flex-1 p-6">
        <Topbar token={token} />

        <h1 className="text-4xl font-bold mb-8 text-[#2D6A4F] tracking-tight">Manage Job Listings</h1>

        {/* Job Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md mb-10 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={form.title || ''}
              onChange={handleChange}
              placeholder="Job Title"
              className="border border-gray-700 p-3 rounded-md font-semibold placeholder-gray-700"
            />
            <input
              name="company"
              value={form.company || ''}
              onChange={handleChange}
              placeholder="Company"
              className="border border-gray-700 p-3 rounded-md font-semibold placeholder-gray-700"
            />
            <input
              name="location"
              value={form.location || ''}
              onChange={handleChange}
              placeholder="Location"
              className="border border-gray-700 p-3 rounded-md font-semibold placeholder-gray-700"
            />
            <input
              name="salary"
              type="number"
              value={form.salary || ''}
              onChange={handleChange}
              placeholder="Salary"
              className="border border-gray-700 p-3 rounded-md font-semibold placeholder-gray-700"
            />
          </div>
          <textarea
            name="description"
            value={form.description || ''}
            onChange={handleChange}
            placeholder="Job Description"
            className="border border-gray-700 p-3 rounded-md w-full resize-none font-semibold placeholder-gray-700"
            rows={4}
          />

          <button
            type="submit"
            className="w-full md:w-auto bg-[#2D6A4F] text-white py-2 px-6 rounded-md hover:bg-[#1B4332] transition"
          >
            {editingId ? 'Update Job' : 'Post Job'}
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 w-full p-3 border border-gray-700 rounded-md placeholder-gray-700 font-semibold"
        />

        {/* Job Cards */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-[#2D6A4F]">{job.title}</h3>
                <p className="text-gray-600">{job.company} — {job.location}</p>
                <p className="text-sm text-gray-500 font-semibold">
                  ${job.salary.toLocaleString()} / <span className="uppercase">month</span>
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

