// app/page.jsx
"use client";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div className="bg-[#121212] text-[#E0E0E0]">
      {/* Hero Section */}
      <section className="max-h-screen py-40 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to Neuropins</h1>
        <p className="text-lg max-w-xl mb-8">
          Discover, share, and organize your favorite ideas visually. Neuropins is your personal pinboard for inspiration, learning, and creativity.
        </p>
        <div className="space-x-4">
          <button
            className="bg-[#1E88E5] px-6 py-3 cursor-pointer rounded-lg hover:bg-[#1565C0] transition"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </button>
          <button
            className="bg-[#1ea160] px-6 py-3 cursor-pointer rounded-lg hover:bg-[#19814d] transition"
            onClick={() => setSignupOpen(true)}
          >
            Signup
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#1A1A1A]">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-[#222222] rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Visual Pinboards</h3>
            <p>Create and organize pins with images, notes, and links easily.</p>
          </div>
          <div className="p-6 bg-[#222222] rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>
            <p>Get personalized content recommendations to boost your creativity.</p>
          </div>
          <div className="p-6 bg-[#222222] rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
            <p>Share boards with friends or team members for better collaboration.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">About Neuropins</h2>
        <p className="text-lg mb-6">
          Neuropins is built to help creatives, students, and professionals store ideas visually. Whether it's design inspiration, tutorials, or project references, you can organize everything in one place.
        </p>
        <p className="text-lg">
          Start building your personal knowledge hub today and keep your ideas organized like never before.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[#1A1A1A]">
        <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-[#222222] rounded-xl">
            <p>"Neuropins has revolutionized the way I organize my ideas. It's so visual and intuitive!"</p>
            <h4 className="mt-4 font-semibold">— Alice J.</h4>
          </div>
          <div className="p-6 bg-[#222222] rounded-xl">
            <p>"I love the AI suggestions! It always gives me relevant pins and ideas for my projects."</p>
            <h4 className="mt-4 font-semibold">— Raj P.</h4>
          </div>
          <div className="p-6 bg-[#222222] rounded-xl">
            <p>"Sharing boards with my team has never been easier. Collaboration is smooth and fun!"</p>
            <h4 className="mt-4 font-semibold">— Sophia L.</h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to start your journey?</h2>
        <p className="mb-8">Join Neuropins today and organize your ideas like a pro.</p>
        <div className="space-x-4">
          <button
            className="bg-[#1E88E5] px-6 py-3 cursor-pointer rounded-lg hover:bg-[#1565C0] transition"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </button>
          <button
            className="bg-[#1ea160] px-6 py-3 cursor-pointer rounded-lg hover:bg-[#19814d] transition"
            onClick={() => setSignupOpen(true)}
          >
            Signup
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#111111] text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Neuropins. All rights reserved.
      </footer>

      {/* Modals */}
        <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSignupOpen={() => setSignupOpen(true)}
        />
        <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onLoginOpen={() => setLoginOpen(true)}
        />
    </div>
  );
}
