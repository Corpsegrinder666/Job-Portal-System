'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  FaChartLine,
  FaUsers,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  icon: IconType;
  text: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      localStorage.removeItem("accessToken");
      router.push("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to log out.");
    }
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="w-64 bg-white p-6 shadow-lg min-h-screen flex flex-col font-sans" style={{ fontFamily: '"Barlow", sans-serif' }}>
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/portallogo.png"
          alt="Job Portal Logo"
          width={80}
          height={80}
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#2D6A4F] mt-3 tracking-wide">
          Job Portal
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-5 text-[#38303D]">
        <SidebarLink
          icon={FaChartLine}
          text="Dashboard"
          href="/dashboard"
          active={isActive("/dashboard")}
        />
        <SidebarLink
          icon={FaBriefcase}
          text="Post a Job"
          href="/jobs"
          active={isActive("/jobs")}
        />
        <SidebarLink
          icon={FaUsers}
          text="Applicants"
          href="/applicants"
          active={isActive("/applicants")}
        />
        <SidebarLink
          icon={FaChartLine}
          text="Analytics"
          href="/analytics"
          active={isActive("/analytics")}
        />
        <div className="mt-auto">
          <SidebarLink
            icon={FaSignOutAlt}
            text="Logout"
            onClick={handleLogout}
          />
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({
  icon: Icon,
  text,
  href,
  active = false,
  onClick,
}: SidebarLinkProps) {
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition duration-300 w-full text-left select-none";

  const activeClass = "bg-[#2D6A4F] text-white font-semibold shadow-lg";
  const defaultClass =
    "text-[#38303D] hover:bg-[#E6F2EA] hover:text-[#2D6A4F]";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClass} ${active ? activeClass : defaultClass}`}
        type="button"
        style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
      >
        <Icon
          className={`text-xl ${active ? "text-white" : "text-[#2D6A4F]"}`}
          style={{ minWidth: "24px" }}
        />
        <span className="text-lg">{text}</span>
      </button>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`${baseClass} ${active ? activeClass : defaultClass}`}
      style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
    >
      <Icon
        className={`text-xl ${active ? "text-white" : "text-[#2D6A4F]"}`}
        style={{ minWidth: "24px" }}
      />
      <span className="text-lg">{text}</span>
    </Link>
  );
}
