import Link from "next/link";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4">
        <ul>
          <li>
            <Link href="/tutor/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/tutor/bookings">Bookings</Link>
            </li>
          <li>Profile</li>
          <li>
            <Link href="/tutor/availability">Availability</Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}