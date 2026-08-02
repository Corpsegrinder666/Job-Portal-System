'use client';

import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaBell, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

interface TopbarProps {
  token: string | null;
}

export default function Topbar({ token }: TopbarProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { firstName, lastName } = res.data;
        setUserName(`${firstName} ${lastName}`);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <header
      className="bg-[#F8F9FA] shadow-md p-4 flex justify-between items-center mb-8 rounded-xl font-sans"
      style={{ fontFamily: '"Barlow", sans-serif' }}
    >
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <input
          type="search"
          placeholder="Search jobs or applicants..."
          aria-label="Search jobs or applicants"
          className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] font-medium text-sm text-[#38303D] placeholder:text-gray-500"
        />
        <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2D6A4F] text-lg" />
      </div>

      {/* Icons + User Info */}
      <div className="flex items-center gap-6 ml-6">
        <FaBell
          className="text-[#2D6A4F] text-xl cursor-pointer hover:text-[#1B4332] transition"
          title="Notifications"
          aria-label="Notifications"
        />
        <FaRegCommentDots
          className="text-[#2D6A4F] text-xl cursor-pointer hover:text-[#1B4332] transition"
          title="Messages"
          aria-label="Messages"
        />

        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => router.push("/profile")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") router.push("/profile"); }}
        >
          <div className="text-right leading-5">
            <p className="text-[#2D6A4F] font-bold text-sm">{userName}</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <Image
            src="/proficon.png"
            alt="User avatar"
            width={42}
            height={42}
            className="rounded-full border-2 border-[#2D6A4F]"
          />
        </div>
      </div>
    </header>
  );
}
