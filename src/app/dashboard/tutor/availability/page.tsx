
"use client"

import { useEffect, useState } from "react"
import { TutorAvailability } from "@/services/availability"
import AvailabilityForm from "./components/availabilityForm"

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<TutorAvailability[]>([])
  const [loading, setLoading] = useState(false)

  const fetchAvailability = async () => {
    const token = localStorage.getItem("accessToken")
    const tutorId = localStorage.getItem("userId")

    if (!token || !tutorId) return

    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/availability/tutor/${tutorId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) throw new Error("Failed to fetch availability")
      const data = await res.json()
      if (!Array.isArray(data)) throw new Error("API did not return an array")
      setSlots(data)
    } catch (err) {
      console.error(err)
      setSlots([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAvailability()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Availability</h1>

      <AvailabilityForm setSlots={setSlots} />

      <div className="mt-6 space-y-2">
        {loading && <p>Loading slots...</p>}
        {!loading && slots.length === 0 && <p>No availability yet.</p>}
        {slots.map((slot) => (
          <div key={slot.id} className="border p-3 rounded">
            <p>Start: {new Date(slot.startTime).toLocaleString()}</p>
            <p>End: {new Date(slot.endTime).toLocaleString()}</p>
            <p>Status: {slot.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}