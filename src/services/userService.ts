"use client"

import { env } from "@/env";


const API_URL = env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const deleteUser = async (id: number) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};