"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function EditTutorPage() {
  const { id } = useParams();
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [perHourRate, setPerHourRate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTutor() {
      const res = await fetch(`${API_URL}/api/tutor/${id}`);
      const data = await res.json();
      setBio(data.bio || "");
      setPerHourRate(data.perHourRate?.toString() || "");
      setLoading(false);
    }
    fetchTutor();
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`${API_URL}/api/tutor/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, perHourRate }),
    });
    alert("Tutor updated!");
    router.push(`/tutor/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Tutor</h1>

      <input
        type="text"
        value={bio}
        onChange={e => setBio(e.target.value)}
        placeholder="Bio"
        className="w-full border rounded p-2 mb-4"
      />

      <input
        type="number"
        value={perHourRate}
        onChange={e => setPerHourRate(e.target.value)}
        placeholder="Per Hour Rate"
        className="w-full border rounded p-2 mb-4"
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Save
      </button>
    </div>
  );
}