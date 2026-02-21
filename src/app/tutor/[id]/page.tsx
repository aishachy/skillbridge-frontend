// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { env } from "@/env";
// import { Star } from "lucide-react";
// import AvailabilitySection from "./availabilitySection";

// interface User {
//     id: number;
//     name: string;
//     email: string;
// }

// interface Review {
//     id: number;
//     rating: number;
//     comment: string;
//     student: User;
// }

// interface Booking {
//     id: number;
//     startTime: string;
//     price: number;
//     status: string;
//     user: User;
// }

// interface Category {
//     id: number;
//     subjectName: string;
// }

// interface Tutor {
//     id: number;
//     bio: string;
//     education: string;
//     experience: string;
//     perHourRate: string;
//     location: string;
//     rating: number;
//     user: User;
//     reviews: Review[];
//     bookings: Booking[];
//     tutorCategories?: { category: Category }[];
// }

// interface Availability {
//     id: number;
//     startTime: string;
//     endTime: string;
//     status: string;
//     categoryId: number;
// }

// const API_URL = env.NEXT_PUBLIC_API_URL;

// export default function TutorProfilePage() {
//     const params = useParams();
//     const router = useRouter();
//     const id = params?.id as string | undefined;

//     const [tutor, setTutor] = useState<Tutor | null>(null);
//     const [availability, setAvailability] = useState<Availability[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Fetch tutor data
//     const fetchTutor = async () => {
//         if (!id) return;
//         try {
//             const response = await fetch(`${API_URL}/api/tutor/${id}`, {
//                 cache: "no-store",
//                 credentials: "include",
//             });
//             if (!response.ok) throw new Error(`Failed to fetch tutor: ${response.status}`);
//             const data = await response.json();
//             setTutor(data);
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (err: any) {
//             console.error("Failed to fetch tutor", err);
//             setError(err.message || "Something went wrong while fetching tutor.");
//         }
//     };

//     // Fetch availability
//     const fetchAvailability = async () => {
//         if (!id) return;
//         try {
//             const res = await fetch(`${API_URL}/api/availability/tutor/${id}`, {
//                 credentials: "include",
//             });
//             if (!res.ok) throw new Error(`Failed to fetch availability: ${res.status}`);
//             const data = await res.json();
//             setAvailability(data.data || []);
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (err: any) {
//             console.error("Failed to fetch availability", err);
//             setError(err.message || "Something went wrong while fetching availability.");
//         }
//     };

//     useEffect(() => {
//         if (!id) return;
//         setLoading(true);
//         Promise.all([fetchTutor(), fetchAvailability()]).finally(() => setLoading(false));
//     }, [id]);

//     if (loading) return <p className="text-center mt-20">Loading...</p>;
//     if (error) return <p className="text-center mt-20 text-red-600">Error: {error}</p>;
//     if (!tutor) return <p className="text-center mt-20">No tutor found</p>;

//     return (
//         <div className="min-h-screen bg-gray-50">

//             {/* HEADER */}
//             <div className="bg-white border-b">
//                 <div className="max-w-6xl mx-auto px-6 py-10 flex justify-between items-center flex-wrap gap-8">

//                     {/* LEFT */}
//                     <div className="flex items-center gap-6">
//                         <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold bg-purple-600 text-white">
//                             {tutor.user?.name?.charAt(0).toUpperCase()}
//                         </div>

//                         <div>
//                             <div className="flex items-center gap-3 flex-wrap">
//                                 <h1 className="text-3xl font-bold">{tutor.user?.name}</h1>
//                                 <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full">
//                                     ✓ Verified Tutor
//                                 </span>
//                             </div>

//                             <p className="text-gray-500 mt-1">{tutor.bio}</p>

//                             <div className="flex flex-wrap items-center gap-6 mt-3 text-sm text-gray-600">
//                                 <div className="flex items-center gap-1">
//                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                                     <span className="font-bold">
//                                         {tutor.rating || 0} ({tutor.reviews?.length || 0} Reviews)
//                                     </span>
//                                 </div>

//                                 {tutor.tutorCategories?.length ? (
//                                     <span className="font-bold">
//                                         📘 {tutor.tutorCategories.map((c) => c.category.subjectName).join(", ")}
//                                     </span>
//                                 ) : null}

//                                 <span className="text-purple-600 font-extrabold">
//                                     ${tutor.perHourRate} / Hr
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     <button
//                         className="bg-purple-600 text-white px-6 py-3 rounded-full"
//                         onClick={() => router.push(`/book-tutor/${tutor.id}`)}
//                     >
//                         Book Appointment →
//                     </button>
//                 </div>
//             </div>

//             {/* BODY */}
//             <div className="max-w-5xl mx-auto px-6 py-14 space-y-10">

//                 {/* ABOUT */}
//                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
//                     <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
//                     <p className="text-gray-600 leading-relaxed text-lg">{tutor.bio || "No bio available."}</p>
//                 </div>

//                 {/* EDUCATION & EXPERIENCE */}
//                 <div className="grid md:grid-cols-2 gap-8">
//                     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
//                         <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">🎓 Education</h3>
//                         <p className="text-gray-600 text-lg">{tutor.education || "Not specified"}</p>
//                     </div>

//                     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
//                         <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">💼 Experience</h3>
//                         <p className="text-gray-600 text-lg">{tutor.experience || "Not specified"}</p>
//                     </div>
//                 </div>

//                 {/* LOCATION */}
//                 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">📍 Location</h3>
//                     <p className="text-gray-600 text-lg">{tutor.location || "Location not provided"}</p>
//                 </div>

//                 {/* REVIEWS */}
//                 {tutor.reviews?.length > 0 && (
//                     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
//                         <h2 className="text-2xl font-semibold mb-6">Reviews ({tutor.reviews.length})</h2>
//                         <div className="space-y-6">
//                             {tutor.reviews.map((review) => (
//                                 <div key={review.id} className="border-b pb-4 last:border-none">
//                                     <div className="flex justify-between items-center mb-2">
//                                         <p className="font-medium text-gray-800">{review.student?.name || "Student"}</p>
//                                         <div className="flex items-center gap-1 text-yellow-500">⭐ {review.rating}</div>
//                                     </div>
//                                     <p className="text-gray-600">{review.comment}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* AVAILABILITY */}
//                 <AvailabilitySection availability={availability} />

//                 {/* BOOKINGS */}
//                 {tutor.bookings?.length > 0 && (
//                     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
//                         <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Bookings</h3>
//                         <div className="space-y-4">
//                             {tutor.bookings.map((booking) => (
//                                 <div key={booking.id} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex justify-between items-center">
//                                     <div>
//                                         <p className="text-gray-800 font-medium">{new Date(booking.startTime).toLocaleString()}</p>
//                                         <p className="text-gray-500 text-sm mt-1">
//                                             {booking.user?.name || "Student"} —{" "}
//                                             <span className={`ml-1 font-semibold ${booking.status === "CONFIRMED"
//                                                     ? "text-green-600"
//                                                     : booking.status === "PENDING"
//                                                         ? "text-yellow-600"
//                                                         : "text-red-600"
//                                                 }`}>
//                                                 {booking.status}
//                                             </span>
//                                         </p>
//                                     </div>
//                                     <div className="text-indigo-600 font-semibold text-lg">${booking.price}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { env } from "@/env";
import { Navbar1 } from "@/components/layout/navbar1";
import { Star } from "lucide-react";
import router from "next/router";


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
                                        📘 {tutor.tutorCategories.map((c) => c.category.subjectName).join(", ")}
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

            </div>
        </div>
    );
}