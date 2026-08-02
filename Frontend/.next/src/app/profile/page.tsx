"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("/co-logo.png");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    gender: "",
    phoneNumber: "",
    country: "",
    dob: "",
    city: "",
    educationalLevel: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (!storedToken) {
      router.push("/login");
      return;
    }

    setToken(storedToken);

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
          withCredentials: true,
        });

        const userData = response.data;
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          role: userData.role || "",
          gender: userData.gender || "",
          phoneNumber: userData.phoneNumber || "",
          country: userData.country || "",
          dob: userData.dob || "",
          city: userData.city || "",
          educationalLevel: userData.educationalLevel || "",
        });

        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await axios.patch(
        "http://localhost:5000/profile/me",
        {
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Error updating profile!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-xl font-semibold text-[#75A957]">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <Image
              src={profileImage}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow-md"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-[#75A957] p-2 rounded-full cursor-pointer shadow-md hover:bg-[#61994c] transition"
            >
              <input
                type="file"
                id="profile-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              📷
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#38303D]">
              {formData.firstName} {formData.lastName}
            </h1>
            <p className="text-md text-[#75A957]">{formData.role}</p>
          </div>
        </div>

        {/* Profile Form */}
        <h2 className="text-xl font-semibold text-[#38303D] mb-4">Edit Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["First Name", "firstName"],
            ["Last Name", "lastName"],
            ["Gender", "gender"],
            ["Date of Birth", "dob"],
            ["Phone Number", "phoneNumber"],
            ["City", "city"],
            ["Country", "country"],
            ["Educational Level", "educationalLevel"],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block text-sm text-gray-700 font-medium mb-1">{label}</label>
              {name === "gender" ? (
                <select
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <input
                  type={name === "dob" ? "date" : "text"}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="bg-[#75A957] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#61994c] transition"
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
