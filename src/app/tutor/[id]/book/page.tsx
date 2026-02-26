"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function BookTutorPage() {
  const params = useParams();
  const router = useRouter();
  const tutorId = params?.id as string;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tutorId: Number(tutorId),
          date,
          startTime: time,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      alert("Booking successful!");
      router.push("/dashboard/student");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Book Tutor
        </h1>

        <form onSubmit={handleBooking} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Select Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Time</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </form>
      </div>
    </div>
  );
}