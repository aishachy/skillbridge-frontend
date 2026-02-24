"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", href: "/tutor/dashboard" },
    { title: "Bookings", href: "/tutor/bookings" },
    { title: "Profile", href: "/tutor/profile" },
    { title: "Availability", href: "/tutor/availability" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold text-teal-600">Tutor Panel</div>
        <nav className="flex-1 px-2 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block px-4 py-2 rounded-lg transition-colors
                ${pathname === item.href ? "bg-teal-100 text-teal-700 font-semibold" : "text-gray-700 hover:bg-teal-50"}
              `}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}