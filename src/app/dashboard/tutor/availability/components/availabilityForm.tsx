
"use client"

import { useState } from "react"
import { TutorAvailability } from "@/services/availability"

interface AvailabilityFormProps {
  setSlots: React.Dispatch<React.SetStateAction<TutorAvailability[]>>
}

export default function AvailabilityForm({ setSlots }: AvailabilityFormProps) {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [status, setStatus] = useState("AVAILABLE")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("accessToken")
    const tutorId = localStorage.getItem("userId")

    console.log("token:", token);
    console.log("tutorId:", tutorId);

    if (!token || !tutorId) {
      alert("You are not logged in.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ startTime, endTime, status, tutorId }),
      })

      if (!res.ok) throw new Error("Failed to create availability")

      const newSlot: TutorAvailability = await res.json()

      // Update the list directly
      setSlots((prev) => [...prev, newSlot])

      // Reset form
      setStartTime("")
      setEndTime("")
      setStatus("AVAILABLE")

      alert("Availability created successfully")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err)
      alert(err.message || "Failed to create availability")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Set Availability</h2>

      <div className="flex flex-col space-y-3">
        <label className="text-gray-700 font-medium">Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-gray-700 font-medium">End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-gray-700 font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        >
          <option value="AVAILABLE">Available</option>
          <option value="BOOKED">Booked</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Availability"}
      </button>
    </form>
  )
}