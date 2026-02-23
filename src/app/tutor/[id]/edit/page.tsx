"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface TutorResponse {
  bio: string;
  education: string;
  experience: string;
  perHourRate: number | string;
  location: string;
}

export default function EditTutorPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [bio, setBio] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [perHourRate, setPerHourRate] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("You must be logged in to edit your profile.");
      router.push("/login");
      return;
    }

    async function fetchTutor() {
      try {
        const res = await fetch(`${API_URL}/api/tutor/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tutor");

        const data: TutorResponse = await res.json();

        setBio(data.bio ?? "");
        setEducation(data.education ?? "");
        setExperience(data.experience ?? "");
        setPerHourRate(data.perHourRate ? String(data.perHourRate) : "");
        setLocation(data.location ?? "");
      } catch (error) {
        console.error("Failed to load tutor:", error);
        alert("Failed to load tutor data");
      } finally {
        setLoading(false);
      }
    }

    fetchTutor();
  }, [id, router]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update your profile.");
      return;
    }

    try {
      setUpdating(true);

      const res = await fetch(`${API_URL}/api/tutor/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio,
          education,
          experience,
          perHourRate,
          location,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || "Failed to update tutor");
      }

      alert("Tutor updated successfully!");
      router.push(`/tutor/${id}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Update failed:", error);
      alert(error.message || "Failed to update tutor");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading tutor data...
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Tutor Profile</h1>

      <input
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        placeholder="Education"
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        placeholder="Experience"
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        value={perHourRate}
        onChange={(e) => setPerHourRate(e.target.value)}
        placeholder="Per Hour Rate"
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="w-full border rounded p-2"
      />

      {/* Buttons */}
      <div className="mt-8 flex justify-between gap-4">
        <Link
          href={`/tutor/${id}`}
          className="flex-1 bg-purple-600 text-white py-3 rounded-2xl text-center font-semibold hover:bg-purple-700 transition"
        >
          Explore Profile →
        </Link>

        <button
          onClick={handleUpdate}
          disabled={updating}
          className={`flex-1 ${
            updating ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
          } text-white py-3 rounded-2xl font-semibold transition`}
        >
          {updating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}