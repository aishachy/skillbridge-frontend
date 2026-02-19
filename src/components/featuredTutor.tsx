/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { env } from "@/env";


// interface Tutor {
//   id: number;
//   bio: string;
//   perHourRate: number;
//   user: {
//     id: number;
//     name: string;
//     email: string;
//   };
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   bookings: any[];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   reviews: any[];
// }

// const API_URL = env.NEXT_PUBLIC_API_URL

// export default function FeaturedTutor() {
//   const [tutors, setTutors] = useState<Tutor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter()

//   useEffect(() => {
//       console.log("Fetching tutors...")
//     const fetchTutors = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/tutor`, {
//           cache: "no-store",
//           credentials: "include",
//           headers: {
//             Accept: "application/json",
//           },
//         });

//         const data = await response.json();
//         console.log("Tutor data:", data);

//         const tutorList = data.data;

//         if (!Array.isArray(tutorList)) {
//           throw new Error("Tutor list is not an array");
//         }

//         setTutors(tutorList);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTutors();
//   }, []);


//   if (loading) return <p>Loading tutors...</p>;
//   if (tutors.length === 0) return <p>No tutors available</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {tutors.slice(0, 3).map((tutor) => (
//         <div
//           key={tutor.id}
//           className="flex flex-col gap-3 p-6 border rounded-xl shadow-sm bg-white transition-transform transform hover:-translate-y-2 hover:shadow-lg"
//         >
//           <h2 className="text-lg font-semibold">
//             Name: {tutor.user?.name || "No name"}
//           </h2>
//           <p><strong>Bio:</strong> {tutor.bio}</p>
//           <p><strong>Rate:</strong> ${tutor.perHourRate}/hr</p>
//           <p><strong>Reviews:</strong> {tutor.reviews.length}</p>
//           <button
//             className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
//             onClick={() => router.push(`/tutor/${tutor.id}`)} // navigate to profile page
//           >
//             View Profile
//           </button>
//         </div>
//       ))}
//     </div>
//   );

// }

/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { env } from "@/env";
import Link from "next/link";
import StatsCard from "./stats-card10";

interface Tutor {
  id: number;
  bio: string;
  perHourRate: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  bookings: any[];
  reviews: any[];
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function FeaturedTutor() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Fetching tutors...");
    const fetchTutors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/tutor`, {
          cache: "no-store",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();
        console.log("Tutor data:", data);

        const tutorList = data.data;

        if (!Array.isArray(tutorList)) {
          throw new Error("Tutor list is not an array");
        }

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
  if (tutors.length === 0) return <p>No tutors available</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Featured Tutors</h1>
        <p className="mt-2 text-lg text-gray-500">
          Meet our top tutors carefully selected to help you succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutors.slice(0, 3).map((tutor) => (
          <div
            key={tutor.id}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Featured badge */}
            <span className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              Featured
            </span>


            <div className="flex items-center p-6 border-b">
              <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
                {tutor.user?.name?.charAt(0) || "T"}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{tutor.user?.name || "No Name"}</h2>
                <p className="text-gray-500 text-sm">{tutor.reviews.length} Reviews</p>
              </div>
            </div>

            {/* Bio */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 line-clamp-3">{tutor.bio}</p>

              {/* Rate + Button */}
              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-semibold text-lg">${tutor.perHourRate}/hr</span>
                <button
                  onClick={() => router.push(`/tutor/${tutor.id}`)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        <div className="mt-10 flex justify-center">
          <button
            className="px-32 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View All Tutors
          </button>
        </div>
    </div>

  )
}