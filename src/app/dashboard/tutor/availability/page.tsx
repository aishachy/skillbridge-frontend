"use client"

import { useEffect, useState } from "react"
import AvailabilityForm from "./components/availabilityForm"
import { TutorAvailability } from "@/services/availability"

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<TutorAvailability[]>([])

  const fetchAvailability = async () => {
    const token = localStorage.getItem("accessToken")
    const tutorId = localStorage.getItem("userId")

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/availability/tutor/${tutorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await res.json()
    setSlots(data)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAvailability()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Availability</h1>

      <AvailabilityForm />

      <div className="mt-6 space-y-2">
        {slots.map((slot) => (
          <div key={slot.id} className="border p-3">
            <p>Start: {new Date(slot.startTime).toLocaleString()}</p>
            <p>End: {new Date(slot.endTime).toLocaleString()}</p>
            <p>Status: {slot.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}