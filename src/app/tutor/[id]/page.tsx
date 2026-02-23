"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { env } from "@/env";
import { Star } from "lucide-react";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  student: User;
}

interface Booking {
  id: number;
  date: string;
  startTime: Date;
  price: number;
  status: string;
  user: User;
}

interface Category { id: number; subjectName: string; }

interface TutorCategory { category: Category }

interface Tutor {
  id: number;
  bio: string;
  education: string;
  experience: string;
  perHourRate: string;
  location: string;
  rating: number;
  user: User;
  reviews: Review[];
  bookings: Booking[];
  tutorCategories?: TutorCategory[];
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function TutorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        // Fetch tutor
        const tutorRes = await fetch(`${API_URL}/api/tutor/${id}`, { cache: "no-store" });
        if (!tutorRes.ok) throw new Error("Failed to fetch tutor");
        const tutorData = await tutorRes.json();
        setTutor(tutorData.data ?? tutorData ?? null);

        // Fetch current logged-in user using JWT from localStorage
        const token = localStorage.getItem("token"); // <-- store your JWT here after login
        if (token) {
          const userRes = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userRes.ok) {
            const json = await userRes.json();
            console.log("Current user API response:", json);
            setUser(json.user ?? json.data ?? null);
          } else {
            console.warn("Failed to fetch current user:", userRes.status);
            setUser(null);
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load tutor profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!tutor) return;
    if (!confirm("Are you sure you want to delete this tutor?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/tutor/${tutor.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete tutor");
      alert("Tutor deleted successfully!");
      router.push("/tutor");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!tutor) return <p className="text-center mt-10">Tutor not found</p>;


  const canEditOrDelete = user?.role === "TUTOR" || user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-10 flex justify-between items-center flex-wrap gap-8">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold bg-purple-600 text-white">
              {tutor.user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold">{tutor.user?.name}</h1>
                <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full">
                  ✓ Verified Tutor
                </span>
              </div>

              <p className="text-gray-500 mt-1">{tutor.bio}</p>

              <div className="flex flex-wrap items-center gap-6 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">
                    {tutor.rating || 0} ({tutor.reviews?.length || 0} Reviews)
                  </span>
                </div>

                {tutor.tutorCategories?.length ? (
                  <span className="font-bold">
                    📘 {tutor.tutorCategories.map(c => c.category.subjectName).join(", ")}
                  </span>
                ) : null}

                <span className="text-purple-600 font-extrabold">
                  ${tutor.perHourRate} / Hr
                </span>
              </div>
            </div>
          </div>

          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-full"
            onClick={() => router.push(`/book-tutor/${tutor.id}`)}
          >
            Book Appointment →
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-5xl mx-auto px-6 py-14 space-y-10">

        {/* ABOUT */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{tutor.bio || "No bio available."}</p>
        </div>

        {/* EDUCATION & EXPERIENCE */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">🎓 Education</h3>
            <p className="text-gray-600 text-lg">{tutor.education || "Not specified"}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">💼 Experience</h3>
            <p className="text-gray-600 text-lg">{tutor.experience || "Not specified"}</p>
          </div>
        </div>

        {/* LOCATION */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">📍 Location</h3>
          <p className="text-gray-600 text-lg">{tutor.location || "Location not provided"}</p>
        </div>

        {/* REVIEWS */}
        {tutor.reviews?.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold mb-6">Reviews ({tutor.reviews.length})</h2>
            <div className="space-y-6">
              {tutor.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-none">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-gray-800">{review.student?.name || "Student"}</p>
                    <div className="flex items-center gap-1 text-yellow-500">⭐ {review.rating}</div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {tutor.bookings?.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Bookings</h3>
            <div className="space-y-4">
              {tutor.bookings.map((booking) => (
                <div key={booking.id} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 font-medium">{new Date(booking.startTime).toLocaleString()}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {booking.user?.name || "Student"} —{" "}
                      <span className={`ml-1 font-semibold ${booking.status === "CONFIRMED"
                        ? "text-green-600"
                        : booking.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-red-600"
                        }`}>
                        {booking.status}
                      </span>
                    </p>
                  </div>
                  <div className="text-indigo-600 font-semibold text-lg">${booking.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDIT/DELETE buttons for TUTOR & ADMIN */}
        {canEditOrDelete && (
          <div className="flex justify-between gap-4">
            <Link
              href={`/tutor/${tutor.id}/edit`}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-2xl font-semibold transition text-center"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-2xl font-semibold transition"
            >
              Delete
            </button>
          </div>

        )}

      </div>
    </div>
  );
}