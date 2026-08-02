"use client";

import { useState } from "react";
import jsPDF from "jspdf";

import Sidebar from "@/app/components/sidebar";
import Topbar from "@/app/components/topbar";
import Footer from "@/app/components/footer";
import ApplicantCard from "../components/applicantscard";

interface Applicant {
  id: number;
  name: string;
  jobTitle: string;
  cvFileName: string;
  status: "pending" | "accepted" | "rejected";
}

const dummyApplicants: Applicant[] = [
  {
    id: 1,
    name: "John Doe",
    jobTitle: "Frontend Developer",
    cvFileName: "john-doe-cv.pdf",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    jobTitle: "Backend Developer",
    cvFileName: "jane-smith-cv.pdf",
    status: "pending",
  },
  {
    id: 3,
    name: "Michael Johnson",
    jobTitle: "UI/UX Designer",
    cvFileName: "michael-johnson-cv.pdf",
    status: "pending",
  },
];

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(dummyApplicants);

  const handleAccept = (id: number) => {
    const applicant = applicants.find((app) => app.id === id);
    if (!applicant) return;

    // Update status
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "accepted" } : app
      )
    );

    // Generate a valid PDF using jsPDF
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Curriculum Vitae", 20, 20);
    doc.setFontSize(14);
    doc.text(`Name: ${applicant.name}`, 20, 40);
    doc.text(`Job Title: ${applicant.jobTitle}`, 20, 55);
    doc.text("Thank you for applying to our company.", 20, 75);
    doc.text("We will review your application and contact you soon.", 20, 90);

    const fileName = applicant.cvFileName || `${applicant.name.replace(/\s+/g, "_")}_CV.pdf`;
    doc.save(fileName);
  };

  const handleReject = (id: number) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
  };

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
          <h1 className="text-4xl font-bold text-[#2D6A4F] tracking-tight mb-6">
            Applicants
          </h1>

          {applicants.length === 0 && (
            <p className="text-gray-600">No applicants found.</p>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onAccept={() => handleAccept(applicant.id)}
                onReject={() => handleReject(applicant.id)}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
