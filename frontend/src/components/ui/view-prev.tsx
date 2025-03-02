"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ViewPreviousButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer transition">
        <ArrowLeft size={20} />
        <span className="ml-2 text-sm font-medium">{`View Previous: ${label}`}</span>
      </div>
    </Link>
  );
}
