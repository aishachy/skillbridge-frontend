"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { env } from "@/env";
import Link from "next/link";

interface Tutor {
  id: number;
  bio: string;
  perHourRate: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookings: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function TutorList() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minRate, setMinRate] = useState("");

  const router = useRouter();

  // Fetch all tutors
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tutor`, {
          cache: "no-store",
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        setTutors(data.data || data); // handle backend format
      } catch (err) {
        console.error("Fetch tutors failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading tutors...</p>;

  // Filter tutors by search and min rate
  const filteredTutor = tutors.filter(tutor => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      tutor.user.name.toLowerCase().includes(searchLower) ||
      tutor.bio.toLowerCase().includes(searchLower);
    const matchesMinRate = minRate ? tutor.perHourRate >= Number(minRate) : true;
    return matchesSearch && matchesMinRate;
  });

  // Delete tutor
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tutor?")) return;

    try {
      await fetch(`${API_URL}/api/tutor/${id}`,
        { method: "DELETE" });
      alert("Tutor deleted!");
      setTutors(value => value.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete tutor");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">Find Your Perfect Tutor</h1>

      {/* Search Section */}
      <div className="bg-white shadow-md rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by name or subject..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Minimum Rate"
            value={minRate}
            onChange={e => setMinRate(e.target.value)}
            className="border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Tutors Grid */}
      {filteredTutor.length === 0 ? (
        <p className="text-center text-gray-500">No tutors match your filters</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTutor.map(tutor => (
            <div
              key={tutor.id}
              className="relative bg-white rounded-[28px] shadow-md border border-gray-100 p-8 hover:shadow-xl transition duration-300"
            >
              {/* Price */}
              <div className="absolute top-6 right-6 text-right">
                <p className="text-xs tracking-widest text-gray-400 uppercase">Per Hour</p>
                <p className="text-2xl font-bold">${tutor.perHourRate}</p>
              </div>

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {tutor.user.name.charAt(0)}
              </div>

              {/* Rating */}
              <div className="mt-6 inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
                ⭐ {tutor.reviews.length > 0 ? "4.0" : "New"}
              </div>

              {/* Name */}
              <h2 className="mt-6 text-2xl font-bold text-gray-900">{tutor.user.name}</h2>

              {/* Bio */}
              <p className="text-gray-600 mt-3 line-clamp-3">{tutor.bio}</p>

              {/* Buttons */}
              <Link
                href={`/tutor/${tutor.id}`}
                className="w-full block bg-purple-600 text-white py-3 rounded-2xl text-center font-semibold hover:bg-gray-800 transition"
              >
                Explore Profile →
              </Link>
              <div className="flex justify-between items-center">
                <Link
                  href={`/tutor/${tutor.id}/edit`}
                  className="flex-1 bg-green-700 text-white py-2 rounded-2xl text-center hover:bg-green-500 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(tutor.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-2xl hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}