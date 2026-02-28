"use client";

// pages/create-tutor.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { env } from "@/env";
import { useSession } from "next-auth/react";

interface User {
    id: number;
    name: string;
    email: string;
}

interface loginUser {
    currentUser: User;
}

export default function CreateTutor({ currentUser }: loginUser) {
    const router = useRouter();
    const { data: session } = useSession();
    const [bio, setBio] = useState("");
    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    const [perHourRate, setPerHourRate] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState<number | "">("");
    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [userId, setUserId] = useState<number | "">("");
    const [loading, setLoading] = useState(false);

    // Use NEXT_PUBLIC_API_URL for browser access
    const API_URL = env.NEXT_PUBLIC_API_URL || "";


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser?.id) {
            alert("You must be logged in to create a tutor profile");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/tutor`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bio,
                    education,
                    experience,
                    perHourRate,
                    location,
                    rating,
                    isActive,
                    isFeatured,
                    userId: currentUser.id,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to create tutor");
            }
            alert("Tutor profile created successfully!");
            router.push("/tutor");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
            <h1 className="text-xl font-bold mb-4">Create Tutor Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Per Hour Rate"
                    value={perHourRate}
                    onChange={(e) => setPerHourRate(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    min={0}
                    max={5}
                    step={0.1}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                />
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    <label>Featured</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label>Active</label>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {loading ? "Creating..." : "Create Profile"}
                </button>
            </form>
        </div>
    );
}