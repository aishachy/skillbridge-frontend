import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4">
        <ul>
          <li>Dashboard</li>
          <Link href="/dashboard/admin/users">
            Users
          </Link>
          <li>Bookings</li>
          <li>Profile</li>
        </ul>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}