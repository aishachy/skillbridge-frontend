"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authProvider";
import { loginUser } from "@/services/authService";
import { toastSuccess } from "@/lib/swal";

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { user, token } = await loginUser({ email, password });

      // Save to localStorage & context
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", token);
      setUser(user);

      toastSuccess("Login successful");
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );

}

