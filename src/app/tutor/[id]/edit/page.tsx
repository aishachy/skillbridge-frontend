"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface Category {
  id: number;
  subjectName: string;
}

export default function EditTutorPage() {
  const { id } = useParams();
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState(""); 
  const [perHourRate, setPerHourRate] = useState("");
  const [location, setLocation] = useState("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const tutorRes = await fetch(`${API_URL}/api/tutor/${id}`);
        const tutorData = await tutorRes.json();

        setBio(tutorData.bio || "");
        setEducation(tutorData.education || "");
        setExperience(tutorData.experience || "");
        setPerHourRate(tutorData.perHourRate?.toString() || "");
        setLocation(tutorData.location || "");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCategoryIds(tutorData.tutorCategories?.map((c: any) => c.category.id) || []);


        const catRes = await fetch(`${API_URL}/api/categories`);
        const catData = await catRes.json();
        setAllCategories(catData || []);
      } catch (err) {
        console.error("Failed to fetch tutor data:", err);
        alert("Failed to load tutor data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // --- Toggle category selection ---
  const handleCategoryToggle = (catId: number) => {
    setCategoryIds(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };


  const handleUpdate = async () => {
    try {
      setUpdating(true);

      const data = { bio, education, experience, perHourRate, location, categoryIds };

      const res = await fetch(`${API_URL}/api/tutor/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update tutor");

      alert("Tutor updated!");
      router.push(`/tutor/${id}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Update failed:", err);
      alert(err.message || "Failed to update tutor");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tutor data...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Tutor Profile</h1>

      {/* Bio */}
      <input
        type="text"
        value={bio}
        onChange={e => setBio(e.target.value)}
        placeholder="Bio"
        className="w-full border rounded p-2"
      />

      {/* Education */}
      <input
        type="text"
        value={education}
        onChange={e => setEducation(e.target.value)}
        placeholder="Education"
        className="w-full border rounded p-2"
      />

      {/* Experience */}
      <input
        type="text"
        value={experience}
        onChange={e => setExperience(e.target.value)}
        placeholder="Experience"
        className="w-full border rounded p-2"
      />

      {/* Per Hour Rate */}
      <input
        type="number"
        value={perHourRate}
        onChange={e => setPerHourRate(e.target.value)}
        placeholder="Per Hour Rate"
        className="w-full border rounded p-2"
      />

      {/* Location */}
      <input
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Location"
        className="w-full border rounded p-2"
      />

      {/* Categories */}
      <div>
        <h2 className="font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {allCategories.map(cat => (
            <label
              key={cat.id}
              className="inline-flex items-center gap-1 bg-gray-200 px-3 py-1 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={categoryIds.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
              />
              {cat.subjectName}
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleUpdate}
        disabled={updating}
        className={`w-full py-2 rounded text-white transition ${
          updating ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {updating ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}