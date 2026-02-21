"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Availability {
  id: number;
  startTime: string;
  endTime: string;
  status: string;
  categoryId: number;
}

interface AvailabilitySectionProps {
  availability: Availability[];
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ availability }) => {
  const router = useRouter();

  const handleBookSlot = (slotId: number) => {
    router.push(`/book-slot/${slotId}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
      <h2 className="text-2xl font-semibold mb-4">Availability</h2>
      {availability.length > 0 ? (
        <div className="space-y-2">
          {availability.map((slot) => (
            <div
              key={slot.id}
              className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
            >
              <span>
                {new Date(slot.startTime).toLocaleString()} -{" "}
                {new Date(slot.endTime).toLocaleString()}
              </span>

              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold ${
                    slot.status === "AVAILABLE"
                      ? "text-green-600"
                      : slot.status === "BOOKED"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {slot.status}
                </span>

                {/* Show Book button only if slot is available */}
                {slot.status === "AVAILABLE" && (
                  <button
                    className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-700 transition"
                    onClick={() => handleBookSlot(slot.id)}
                  >
                    Book
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No availability slots</p>
      )}
    </div>
  );
};

export default AvailabilitySection;