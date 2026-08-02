"use client";

import Image from "next/image";

interface DashboardCardProps {
  title: string;
  count: string | number;
  icon: string;
  link?: string;
}

export default function DashboardCard({ title, count, icon, link }: DashboardCardProps) {
  const content = (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer flex items-center gap-4">
      <Image src={icon} alt={title} width={50} height={50} />
      <div>
        <h3 className="text-3xl font-bold text-[#38303D]">{count}</h3>
        <p className="text-gray-600 font-medium">{title}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block">
        {content}
      </a>
    );
  }

  return content;
}
