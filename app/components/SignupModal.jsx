// components/SignupModal.jsx
"use client";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";

export default function SignupModal({ isOpen, onClose, onLoginOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.ok) {
      window.location.href = "/feed";
    } else {
      alert(data.error);
    }
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5 w-80">
        <h2 className="text-2xl font-semibold text-center text-[#E0E0E0]">
          Welcome to Neuro
          <span className="text-[#1E88E5]">Pins</span>
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-[#c0bfbf]">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="border border-[#1E88E5] px-3 py-2 rounded-md bg-[#1E1E2F] text-[#E0E0E0] placeholder-[#c0bfbf] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-[#c0bfbf]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border border-[#1E88E5] px-3 py-2 rounded-md bg-[#1E1E2F] text-[#E0E0E0] placeholder-[#c0bfbf] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-[#c0bfbf]">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border border-[#1E88E5] px-3 py-2 rounded-md bg-[#1E1E2F] text-[#E0E0E0] placeholder-[#c0bfbf] focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#1E88E5] cursor-pointer text-[#E0E0E0] py-2 rounded-md hover:bg-[#1565C0] transition-colors font-medium"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm text-[#c0bfbf] mt-2">
          Already have an account?{" "}
          <span
            className="text-[#00C853] hover:underline cursor-pointer"
            onClick={() => {
              onClose(); // Close signup modal
              onLoginOpen(); // Open login modal
            }}
          >
            Login
          </span>
        </p>
      </div>
    </ModalWrapper>
  );
}
