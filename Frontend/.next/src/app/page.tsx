"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const poppins = Poppins({ weight: ["400", "800"], subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100 text-[#38303D]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex-1 flex bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Background.jpg"
            alt="Find jobs"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex items-center">
          <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-xl max-w-xl">
            <h1 className="text-5xl font-extrabold text-[#2D6A4F] leading-tight mb-4">
              Hire Talent <br />
              <span className="text-[#75A957] text-6xl block">Faster</span>
            </h1>

            <p className="text-lg font-medium text-[#38303D] mb-8">
              Post jobs, manage applicants, and find the right people in one place.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => router.push("/post-job")}
                className="bg-[#2D6A4F] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#1B4332] transition"
              >
                Post a Job
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="border border-[#2D6A4F] text-[#2D6A4F] px-6 py-3 rounded-md font-semibold hover:bg-[#e8f5e9] transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
