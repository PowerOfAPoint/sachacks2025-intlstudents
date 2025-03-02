"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../../../components/header";

export default function CongratsPage() {
  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex justify-center min-h-[60vh] px-6 py-10 mt-20">
        <div className="w-full max-w-7xl grid grid-cols-12 gap-8">

          {/* Back to Home Button - Top Left */}
          <div className="col-span-12">
            <Link href="/roadmap">
              <div className="flex text-gray-500 hover:text-blue-600 cursor-pointer transition">
                <ArrowLeft size={20} />
                <span className="ml-2 text-sm font-medium">Back to Roadmap</span>
              </div>
            </Link>
          </div>

          {/* Title Area - Centered */}
          <div className="col-span-12 text-center space-y-4">
            <h1 className="text-4xl font-bold text-green-600">🎉 Congratulations!</h1>
            <p className="text-lg text-gray-700">
              You’ve successfully completed all steps in the roadmap.
            </p>
            <p className="text-gray-600">
              From Day 1 CPT to Citizenship, you’ve navigated every milestone like a pro.
            </p>
          </div>


        </div>
      </div>
    </>
  );
}
