"use client";

import { useEffect, useState } from "react";

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

export default function StatsCard() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tutor", {
          cache: "no-store",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        console.log("STATUS:", response.status);
        console.log("HEADERS:", response.headers.get("content-type"));

        const data = await response.json();
        console.log("Tutor data:", data);

        const tutorList = data.data;

        if (!Array.isArray(tutorList)) {
          throw new Error("Tutor list is not an array");
        }

        console.log("Is tutors array?", Array.isArray(tutorList));
        console.log("TutorList value:", tutorList);

        setTutors(tutorList);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);


  if (loading) return <p>Loading tutors...</p>;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
      {tutors.map((tutor) => (
        <div
          key={tutor.id}
          className="flex flex-col gap-3 p-6 border rounded-xl shadow-sm bg-white transition-transform transform hover:-translate-y-2 hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold">
            Name: {tutor.user?.name || "No name"}
          </h2>
          <p><strong>Bio:</strong> {tutor.bio}</p>
          <p><strong>Rate:</strong> ${tutor.perHourRate}/hr</p>
          <p><strong>Reviews:</strong> {tutor.reviews.length}</p>
          <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
            View Profile
          </button>
        </div>
      ))}
    </div>
  );

}
