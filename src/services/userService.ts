"use client";

import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

// Helper to get Authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token found");
  return { Authorization: `Bearer ${token}` };
};

// Fetch all users
export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/admin/users`, {
    headers: getAuthHeader(),
  });

  const data = await res.json();

  if (res.status === 403) throw new Error("You are not authorized (Admin only)");
  if (!res.ok) throw new Error(data.message || "Failed to fetch users");

  return data;
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Delete failed");

  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (id: number, userData: any) => {
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Update failed");

  return data;
};