
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { env } from "@/env";
import { Navbar1 } from "@/components/layout/navbar1";


// ----- Types -----
interface User {
    id: number;
    name: string;
    email: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    user: User;
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    tutorCategories?: { category: { id: number; subjectName: string } }[]
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function TutorProfilePage() {
    const params = useParams();
    const id = params?.id as string | undefined; // dynamic ID from URL

    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Tutor ID not found in URL");
            setLoading(false);
            return;
        }

        const fetchTutor = async () => {
            try {
                const response = await fetch(`${API_URL}/api/tutor/${id}`, {
                    cache: "no-store",
                    credentials: "include",
                });

                if (!response.ok) {
                    const text = await response.text();
                    console.error("Fetch failed:", text);
                    setError(`Failed to fetch tutor: ${response.status}`);
                    setTutor(null);
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                setTutor(data.data ?? data ?? null);
            } catch (err) {
                console.error(err);
                setError("Failed to load tutor profile");
                setTutor(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTutor();
    }, [id]);

    // ----- Render -----
    if (loading) return <p className="text-center mt-10">Loading profile...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!tutor) return <p className="text-center mt-10">Tutor not found</p>;

    return (
        <div>
            

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-3xl shadow-lg p-10">
                    {/* Header */}
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                            {tutor.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{tutor.user.name}</h1>
                            <p className="text-gray-500">{tutor.reviews.length} Reviews</p>
                            <p className="text-indigo-600 font-semibold text-xl mt-2">${tutor.perHourRate}/hr</p>
                            <p className="text-gray-500">{tutor.location}</p>
                            <p className="text-yellow-500 mt-1">Rating: {tutor.rating} ⭐</p>
                        </div>
                    </div>

                    {/* About / Bio */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>
                    </div>

                    {/* Education & Experience */}
                    <div className="mt-6 grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold">Education</h3>
                            <p>{tutor.education}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Experience</h3>
                            <p>{tutor.experience}</p>
                        </div>
                    </div>

                    {/* Subjects / Categories */}
                    {tutor.tutorCategories?.length ? (
                        <div className="mt-6">
                            <h3 className="font-semibold">Subjects</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tutor.tutorCategories.map((tc) => (
                                    <span
                                        key={tc.category.id}
                                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {tc.category.subjectName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {/* Bookings */}
                    {tutor.bookings?.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold">Upcoming Bookings</h3>
                            <ul className="list-disc ml-5 mt-2">
                                {tutor.bookings.map((b) => (
                                    <li key={b.id}>
                                        {new Date(b.startTime).toLocaleString()} - ${b.price} ({b.status})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}