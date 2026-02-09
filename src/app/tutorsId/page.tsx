/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";


interface Category {
  id: number;
  subjectName: string;
  description: string
}

interface TutorCategory {
  category: Category;
}
interface Tutor {
  id: number;
  bio?: string;
  education?: string;
  experience?: string;
  perHourRate?: string;
  location?: string;
  rating?: number;
  isFeatured: boolean;
  user: {
    name: string;
    email: string;
  };
  tutorCategories: TutorCategory[];
  reviews: any[];
  bookings: any[];
}

export default function TutorProfiles() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/tutor")
      .then(res => res.json())
      .then(data => {
        setTutors(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading tutors...</p>;
  if (tutors.length === 0) return <p className="p-6">No tutors found</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutors.map(tutor => (
        <div
          key={tutor.id}
          className="border rounded-xl p-5 shadow bg-white"
        >
          <h2 className="text-xl font-bold mb-1">
            {tutor.user.name}
          </h2>

          <p className="text-sm text-gray-500 mb-2">
            {tutor.user.email}
          </p>

          <p><strong>Bio:</strong> {tutor.bio || "N/A"}</p>
          <p><strong>Education:</strong> {tutor.education || "N/A"}</p>
          <p><strong>Experience:</strong> {tutor.experience || "N/A"}</p>
          <p><strong>Location:</strong> {tutor.location || "N/A"}</p>

          <p className="mt-2 font-semibold text-blue-600">
            {tutor.perHourRate || "N/A"} / hour
          </p>

          <p className="text-sm">
            ⭐ Rating: {tutor.rating ?? 0}
          </p>

          <p className="text-sm">
            Reviews: {tutor.reviews.length}
          </p>
          {/* Categories */}
          {/* Categories */}
          <div className="mt-3">
            <p className="font-semibold text-sm mb-1">Subjects:</p>

            {tutor.tutorCategories.length === 0 ? (
              <span className="text-xs text-gray-500">No subjects</span>
            ) : (
              <div className="space-y-2">
                {tutor.tutorCategories.map((tc) => (
                  <div
                    key={tc.category.id}
                    className="p-2 rounded-md bg-blue-50"
                  >
                    <p className="text-sm font-semibold text-blue-700">
                      {tc.category.subjectName}
                    </p>

                    {tc.category.description && (
                      <p className="text-xs text-gray-600">
                        {tc.category.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

  );
}
