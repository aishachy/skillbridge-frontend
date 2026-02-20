"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authProvider"; 

export default function DashboardRouter() {
  const router = useRouter();
  const { user } = useAuth(); 

  useEffect(() => {
    if (!user) return;

    if (user.role === "STUDENT") {
      router.replace("/dashboard/student");
    } else if (user.role === "TUTOR") {
      router.replace("/dashboard/tutor");
    } else if (user.role === "ADMIN") {
      router.replace("/dashboard/admin");
    }
  }, [user]);

  return <p>Loading dashboard...</p>;
}