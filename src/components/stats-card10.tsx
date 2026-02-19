"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { env } from "@/env";

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

export default function StatsCard() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minRate, setMinRate] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/tutor`, {
          cache: "no-store",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        const data = await response.json();
        setTutors(data.data);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading tutors...</p>;

  const filteredTutors = tutors.filter((tutor) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      tutor.user.name.toLowerCase().includes(searchLower) ||
      tutor.bio.toLowerCase().includes(searchLower);

    const matchesMinRate = minRate
      ? tutor.perHourRate >= Number(minRate)
      : true;

    return matchesSearch && matchesMinRate;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        Find Your Perfect Tutor
      </h1>
      {/* Search section */}
      <div className="bg-white shadow-md rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by name or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="number"
            placeholder="Minimum Rate"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            className="border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* grid */}
      {filteredTutors.length === 0 ? (
        <p className="text-center text-gray-500">
          No tutors match your filters
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="relative bg-white rounded-[28px] shadow-md border border-gray-100 p-8 hover:shadow-xl transition duration-300"
            >
              {/* Price Top Right */}
              <div className="absolute top-6 right-6 text-right">
                <p className="text-xs tracking-widest text-gray-400 uppercase">
                  Per Hour
                </p>
                <p className="text-2xl font-bold">
                  ${tutor.perHourRate}
                </p>
              </div>

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {tutor.user?.name?.charAt(0)}
              </div>

              {/* Rating Badge */}
              <div className="mt-6 inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
                ⭐ {tutor.reviews.length > 0 ? "4.0" : "New"}
              </div>

              {/* Name */}
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                {tutor.user.name}
              </h2>

              {/* Bio */}
              <p className="text-gray-600 mt-3 line-clamp-3">
                {tutor.bio}
              </p>

              {/* Button */}
              <button
                onClick={() => router.push(`/tutor/${tutor.id}`)}
                className="mt-8 w-full bg-purple-600 text-white py-4 rounded-2xl font-semibold tracking-widest hover:bg-gray-800 transition"
              >
                Explore Profile →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
