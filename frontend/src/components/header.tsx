"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { authClient } from "@/lib/auth/client";

export default function Header() {
  const session = authClient.useSession();

  return (
    <header className="w-full ">
      <div className="container mx-auto flex items-center justify-between py-4 ">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Flocks Logo" width={40} height={12} />
          <h1 className="text-2xl font-extrabold">flock</h1>
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden md:flex justify-center flex-grow space-x-6">
          <Link href="/" className="hover:text-[#1B768E] transition">
            Home
          </Link>
          <Link href="/chat" className="hover:text-[#1B768E] transition">
            Chat
          </Link>
          <Link href="/roadmap" className="hover:text-[#1B768E] transition">
            Roadmap
          </Link>
          <Link href="/forum" className="hover:text-[#1B768E] transition">
            Forum
          </Link>
        </nav>

        {/* Join Button */}
        {session.data?.user ? (
          <button className={buttonVariants({ variant: "outline" })}>
            <p>Hello, {session.data.user.name}</p>
          </button>
        ) : (
          <Link
            href="/sign-up"
            className="bg-[#1B768E] hover:bg-[#012538] text-white px-4 py-2 rounded-md text-sm font-medium transition "
          >
            Join the Flock
          </Link>
        )}
      </div>
    </header>
  );
}
