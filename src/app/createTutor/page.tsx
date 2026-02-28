"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authProvider";
import { env } from "@/env";

export default function CreateTutor() {
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  const [bio, setBio] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [perHourRate, setPerHourRate] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const API_URL = env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!currentUser?.id) return;

    const checkProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tutor/check/${currentUser.id}`);
        const data = await res.json();
        setHasProfile(data.exists);
      } catch (err) {
        console.error(err);
      }
    };

    checkProfile();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.id || hasProfile) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/tutor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio,
          education,
          experience,
          perHourRate,
          location,
          rating,
          isActive,
          isFeatured,
          userId: currentUser.id,
        }),
      });
      if (!res.ok) throw new Error("Failed to create profile");
      alert("Profile created!");
      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return <p>Loading user...</p>;
  if (hasProfile) return <p>You already have a tutor profile.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Create Tutor Profile</h2>
      <input type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Per Hour Rate" value={perHourRate} onChange={(e) => setPerHourRate(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Rating" value={rating} min={0} max={5} step={0.1} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-2 border rounded" />
      <div>
        <label><input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} /> Featured</label>
      </div>
      <div>
        <label><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Active</label>
      </div>
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
        {loading ? "Creating..." : "Create Profile"}
      </button>
    </form>
  );
}