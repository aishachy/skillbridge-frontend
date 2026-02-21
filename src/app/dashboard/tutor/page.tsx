"use client";

import { useEffect, useState } from "react";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface Stats {
  tutorName: string;
  totalBookings: number;
  totalStudents: number;
  totalEarnings: number;
}

export default function TutorDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/tutor/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();

        if (result.success) {
          setStats(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Dashboard fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>No dashboard data</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {stats.tutorName}
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="border p-6 rounded-lg">
          <p>Total Bookings</p>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p>Total Students</p>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p>Total Earnings</p>
          <p className="text-2xl font-bold">
            ${stats.totalEarnings}
          </p>
        </div>
      </div>
    </div>
  );
}