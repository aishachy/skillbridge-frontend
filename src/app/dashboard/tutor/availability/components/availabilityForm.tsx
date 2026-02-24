
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
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="AVAILABLE">Available</option>
        <option value="BOOKED">Booked</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  )
}