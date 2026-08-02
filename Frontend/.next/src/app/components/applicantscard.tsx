"use client";

interface Applicant {
  id: number;
  name: string;
  jobTitle: string;
  cvFileName: string;
  status: "pending" | "accepted" | "rejected";
}

interface ApplicantCardProps {
  applicant: Applicant;
  onAccept: () => void;
  onReject: () => void;
}

export default function ApplicantCard({
  applicant,
  onAccept,
  onReject,
}: ApplicantCardProps) {
  const statusColors = {
    pending: "bg-yellow-200 text-yellow-800",
    accepted: "bg-green-200 text-green-800",
    rejected: "bg-red-200 text-red-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-[#2D6A4F] mb-1">
          {applicant.name}
        </h2>
        <p className="text-gray-600 mb-2">{applicant.jobTitle}</p>
        <p className="text-gray-700 font-mono mb-3">{applicant.cvFileName}</p>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[applicant.status]}`}
        >
          {applicant.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          disabled={applicant.status !== "pending"}
          onClick={onAccept}
          className={`flex-1 py-2 rounded-md text-white font-semibold transition ${
            applicant.status === "pending"
              ? "bg-[#2D6A4F] hover:bg-[#1B4332]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Accept
        </button>
        <button
          disabled={applicant.status !== "pending"}
          onClick={onReject}
          className={`flex-1 py-2 rounded-md font-semibold transition ${
            applicant.status === "pending"
              ? "bg-[#D9534F] text-white hover:bg-[#b3383a]"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
