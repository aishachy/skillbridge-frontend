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

    const data = await res.json();
    console.log(data);

    if (res.status === 403) {
        throw new Error("You are not authorized (Admin only)");
    }

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

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

    if (!res.ok) {
        throw new Error("Delete failed");
    }

    return res.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (id: number, data: any) => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Update failed");
    }

    return res.json();
};