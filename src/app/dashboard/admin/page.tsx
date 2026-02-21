"use client";

import { useEffect, useState } from "react";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface CategoryStats {
  categoryId: number;
  _count: {
    id: number;
  };
}

interface AdminStats {
  totalUsers: number;
  totalTutors: number;
  totalStudents: number;
  totalBookings: number;
  totalRevenue: number;
  bookingsByCategory: CategoryStats[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/admin/statistics`, {
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
        console.error("Admin dashboard fetch failed", error);
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
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-6">
        <div className="border p-6 rounded-lg">
          <p>Total Users</p>
          <p className="text-2xl font-bold">{data.totalUsers}</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p>Total Tutors</p>
          <p className="text-2xl font-bold">{data.totalTutors}</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p>Total Students</p>
          <p className="text-2xl font-bold">{data.totalStudents}</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p>Total Bookings</p>
          <p className="text-2xl font-bold">{data.totalBookings}</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p>Total Revenue</p>
          <p className="text-2xl font-bold">
            ${data.totalRevenue}
          </p>
        </div>
      </div>

      {/* Bookings By Category */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Bookings By Category
        </h2>

        {data.bookingsByCategory.length === 0 && (
          <p>No category data</p>
        )}

        {data.bookingsByCategory.map((item) => (
          <div
            key={item.categoryId}
            className="border p-4 rounded mb-3"
          >
            <p>Category ID: {item.categoryId}</p>
            <p>Total Bookings: {item._count.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}