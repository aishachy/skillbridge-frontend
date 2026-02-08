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
        const response = await fetch("http://localhost:5000/tutor", {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        console.log("STATUS:", response.status);
        console.log("HEADERS:", response.headers.get("content-type"));

        const data = await response.json();
        console.log("Tutor data:", data);

        if (!Array.isArray(data)) {
          throw new Error("API did not return an array");
        }

        setTutors(data);
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
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {tutors.length === 0 ? (
        <p>No tutors available</p>
      ) : (
        tutors.map((tutor) => (
          <div
            key={tutor.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "16px",
              width: "220px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "8px" }}>{tutor.user.name}</h2>
            <p><strong>Bio:</strong> {tutor.bio}</p>
            <p><strong>Rate:</strong> ${tutor.perHourRate}/hr</p>
            <p><strong>Reviews:</strong> {tutor.reviews.length}</p>
          </div>
        ))
      )}
    </div>
  );
}
