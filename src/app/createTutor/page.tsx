// pages/create-tutor.tsx
import { env } from "@/env";
import React, { useState } from "react";

export default function CreateTutor() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const API_URL = env.NEXT_PUBLIC_API_URL;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/tutor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating, isFeatured, isActive }),
    });

    if (res.ok) {
      alert("Tutor created successfully!");
      setName("");
      setRating("");
      setIsFeatured(false);
      setIsActive(true);
    } else {
      alert("Error creating tutor");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Create Tutor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}