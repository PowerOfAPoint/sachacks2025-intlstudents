"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full  border-neutral-800">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-3">
        <Image src="/logo.png" alt="Flocks Logo" width={40} height={12} />
            <h1 className="text-2xl font-extrabold">flock</h1>
          </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-400 hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/Chat" className="text-gray-400 hover:text-blue-400 transition">
            Chat
          </Link>
          <Link href="/Roadmap" className="text-gray-400 hover:text-blue-400 transition">
            Roadmap
          </Link>
          <Link href="/Forum" className="text-gray-400 hover:text-blue-400 transition">
            Forum
          </Link>
        </nav>

        {/* Auth / CTA + Theme Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            href="/SignUp"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Join the Flock
          </Link>
        </div>
      </div>
    </header>
  );
}
