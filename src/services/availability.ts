export type AvailabilityStatus = "AVAILABLE" | "BOOKED" | "CANCELLED"

export interface TutorAvailability {
  id: string
  startTime: string
  endTime: string
  status: AvailabilityStatus
}