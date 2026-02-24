"use client"

import { useState } from "react"

export default function AvailabilityForm() {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [status, setStatus] = useState("AVAILABLE")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("accessToken")

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        startTime,
        endTime,
        status,
      }),
    })

    alert("Availability created")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border p-2"
      />

      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="border p-2"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2"
      >
        <option value="AVAILABLE">Available</option>
        <option value="BOOKED">Booked</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2">
        Save
      </button>
    </form>
  )
}