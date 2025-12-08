"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.ok) {
      window.location.href = "/feed";
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212]">
      <form className="p-8 shadow-lg rounded-xl border border-[#1E1E2F] w-96" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-6 text-[#E0E0E0]">Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border border-[#1E88E5] py-2 px-4 w-full mb-4 rounded-md bg-[#1E1E2F] text-[#E0E0E0] text-sm placeholder-[#cac8c8] focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-[#1E88E5] py-2 px-4 w-full mb-4 rounded-md bg-[#1E1E2F] text-[#E0E0E0] text-sm placeholder-[#cac8c8] focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-[#1E88E5] text-[#E0E0E0] px-4 py-2 cursor-pointer w-full rounded-lg hover:bg-[#1565C0] transition-colors">
          Login
        </button>

        <p></p>
      </form>
    </div>
  );
}
