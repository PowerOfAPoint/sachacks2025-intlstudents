"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ViewNextButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer transition">
        <span className="mr-2 text-sm font-medium">{`View Next: ${label}`}</span>
        <ArrowRight size={20} />
      </div>
    </Link>
  );
}
