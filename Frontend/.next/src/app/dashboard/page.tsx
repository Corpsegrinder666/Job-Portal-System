"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaUsers, FaBriefcase, FaChartLine, FaChartBar } from "react-icons/fa";

import Sidebar from "@/app/components/sidebar";
import Topbar from "@/app/components/topbar";
import Footer from "@/app/components/footer";

interface DashboardStats {
  totalApplicants: number;
  analyticsScore: number;
  recentJobsPosted: number;
  jobTrends: number;
}

interface Applicant {
  id: number;
  name: string;
  jobTitle: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  createdAt: string;
}

const pieData = [
  { name: "Applications", value: 40 },
  { name: "Interviews", value: 25 },
  { name: "Offers", value: 20 },
  { name: "Rejected", value: 15 },
];

const COLORS = ["#3A3D98", "#75A957", "#FFA500", "#D9534F"];

const dummyApplicants: Applicant[] = [
  { id: 1, name: "John Doe", jobTitle: "Frontend Developer" },
  { id: 2, name: "Jane Smith", jobTitle: "Backend Developer" },
  { id: 3, name: "Michael Johnson", jobTitle: "UI/UX Designer" },
];

const dummyJobTrends = [
  "React Developer",
  "Fullstack Engineer",
  "Data Scientist",
  "DevOps Engineer",
];

export default function Dashboard() {
  const router = useRouter();
  const [userFirstName, setUserFirstName] = useState("User");
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);

  const [stats, setStats] = useState<DashboardStats>({
    totalApplicants: dummyApplicants.length,
    analyticsScore: 78,
    recentJobsPosted: 0,
    jobTrends: dummyJobTrends.length,
  });

  useEffect(() => {
    setUserFirstName("Ahnaf");
  }, []);

  // Fetch recent jobs (2 most recent) from backend API
  useEffect(() => {
    async function fetchRecentJobs() {
      try {
        const res = await fetch("http://localhost:5000/job");
        const jobs: Job[] = await res.json();
        // Sort by createdAt descending and take top 2
        const sorted = jobs
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 2);
        setRecentJobs(sorted);
        setStats((prev) => ({ ...prev, recentJobsPosted: sorted.length }));
      } catch (error) {
        console.error("Failed to fetch recent jobs:", error);
      }
    }
    fetchRecentJobs();
  }, []);

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gray-100 text-[#38303D] font-sans">
      <Sidebar />

      <div className="flex flex-col">
        <div className="px-6 pt-6">
          <Topbar
            token={
              typeof window !== "undefined"
                ? localStorage.getItem("accessToken")
                : null
            }
          />
        </div>

        <main className="flex-1 p-6 pt-0">
          <div className="flex justify-between items-center mb-8 mt-4">
            <h1 className="text-4xl font-bold text-[#2D6A4F] tracking-tight">
              Welcome, {userFirstName}
            </h1>
            <button
              onClick={() => router.push("/post-job")}
              className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold py-2 px-6 rounded-md"
            >
              Post Job
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Applicants Card - clickable */}
            <Link href="/applicants" passHref legacyBehavior>
              <a
                className="bg-white rounded-xl p-8 shadow-md h-[340px] flex flex-col cursor-pointer hover:shadow-lg"
                aria-label="Recent Applicants"
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-[#2D6A4F]">
                  <FaUsers />
                  Recent Applicants
                </h2>
                {dummyApplicants.length === 0 ? (
                  <p>No applicants found.</p>
                ) : (
                  <ul className="flex flex-col gap-3 overflow-y-auto">
                    {dummyApplicants.slice(0, 2).map((applicant) => (
                      <li key={applicant.id} className="font-semibold">
                        {applicant.name} — {applicant.jobTitle}
                      </li>
                    ))}
                  </ul>
                )}
              </a>
            </Link>

            {/* Analytics Overview Card */}
            <div className="bg-white rounded-xl p-8 shadow-md h-[340px] flex flex-col">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-[#2D6A4F]">
                <FaChartLine />
                Analytics Overview
              </h2>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={55}
                    innerRadius={30}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <ul className="mt-4 text-sm text-gray-700 space-y-1">
                {pieData.map((item, index) => (
                  <li key={index}>
                    <span
                      className="inline-block w-3 h-3 mr-2 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    {item.name}: {item.value}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Jobs Posted Card with Link */}
            <Link href="/jobs" passHref legacyBehavior>
              <a
                className="bg-white rounded-xl p-8 shadow-md h-[340px] flex flex-col cursor-pointer hover:shadow-lg"
                aria-label="Recent Jobs Posted"
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-[#2D6A4F]">
                  <FaBriefcase />
                  Recent Jobs Posted
                </h2>

                {recentJobs.length === 0 ? (
                  <p>No recent jobs posted.</p>
                ) : (
                  <ul className="flex flex-col gap-3 overflow-y-auto">
                    {recentJobs.map((job) => (
                      <li key={job.id} className="font-semibold">
                        {job.title} — {job.company}
                      </li>
                    ))}
                  </ul>
                )}
              </a>
            </Link>

            {/* Job Trends Card */}
            <div className="bg-white rounded-xl p-8 shadow-md h-[340px] flex flex-col">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-[#2D6A4F]">
                <FaChartBar />
                Job Trends
              </h2>
              <ul className="flex flex-col gap-3 overflow-y-auto font-semibold">
                {dummyJobTrends.map((trend, idx) => (
                  <li key={idx}>{trend}</li>
                ))}
              </ul>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
