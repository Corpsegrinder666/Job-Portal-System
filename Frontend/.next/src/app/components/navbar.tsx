"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      <nav
        className="bg-[#F8F9FA] shadow-md px-6 py-4 flex justify-between items-center rounded-b-xl"
        style={{ fontFamily: '"Barlow", sans-serif' }}
      >
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
          <Image src="/portallogo.png" width={48} height={48} alt="Job Portal Logo" />
          <span className="text-2xl font-extrabold text-[#2D6A4F] tracking-wide">
            Job Portal
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <a href="/" className="text-[#2D6A4F] font-semibold hover:text-[#1B4332]">
            Home
          </a>
          <a href="#about" className="text-[#2D6A4F] font-semibold hover:text-[#1B4332]">
            About
          </a>
          <a href="#contact" className="text-[#2D6A4F] font-semibold hover:text-[#1B4332]">
            Contact
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => router.push("/employer/dashboard")}
                className="bg-[#2D6A4F] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#1B4332] transition"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="border border-[#2D6A4F] text-[#2D6A4F] px-4 py-2 rounded-md font-semibold hover:bg-[#e9f5e9] transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-[#2D6A4F] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#1B4332] transition"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={() => setIsLoggedIn(true)}
        />
      )}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
};

export default Navbar;
