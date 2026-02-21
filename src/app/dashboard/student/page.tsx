"use client";

import { useEffect, useState } from "react";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface Session {
  id: number;
  startTime: string;
  price: number;
  tutor: {
    user: {
      name: string;
      email: string;
    };
  };
  category: {
    subjectName: string;
  };
}

interface Stats {
  totalBookings: number;
  completedSessions: number;
  totalSpent: number;
  upcomingSessions: Session[];
  pastSessions: Session[];
}

export default function StudentDashboard() {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (result.success) {
          setData(result.data);
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
  if (!data) return <p>No dashboard data</p>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="border p-6 rounded-lg">
          <p>Total Bookings</p>
          <p className="text-2xl font-bold">{data.totalBookings}</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p>Completed Sessions</p>
          <p className="text-2xl font-bold">{data.completedSessions}</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p>Total Spent</p>
          <p className="text-2xl font-bold">${data.totalSpent}</p>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
        {data.upcomingSessions.length === 0 && <p>No upcoming sessions</p>}

        {data.upcomingSessions.map((session) => (
          <div key={session.id} className="border p-4 rounded mb-3">
            <p>
              Tutor: {session.tutor.user.name}
            </p>
            <p>
              Subject: {session.category.subjectName}
            </p>
            <p>
              Date: {new Date(session.startTime).toLocaleString()}
            </p>
            <p>Price: ${session.price}</p>
          </div>
        ))}
      </div>

      {/* Past Sessions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Sessions</h2>
        {data.pastSessions.length === 0 && <p>No past sessions</p>}

        {data.pastSessions.map((session) => (
          <div key={session.id} className="border p-4 rounded mb-3">
            <p>
              Tutor: {session.tutor.user.name}
            </p>
            <p>
              Subject: {session.category.subjectName}
            </p>
            <p>
              Date: {new Date(session.startTime).toLocaleString()}
            </p>
            <p>Price: ${session.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}