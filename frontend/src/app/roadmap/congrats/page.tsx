"use client";

import Link from "next/link";
import Header from "../../../components/header";
import { ArrowLeft } from "lucide-react";

export default function CongratsPage() {
  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center min-h-[60vh] px-6 py-10 mt-20">
        <div className="w-full max-w-7xl grid grid-cols-12 gap-8">
          {/* Back to Roadmap Button */}
          <div className="col-span-12">
            <Link href="/roadmap">
              <div className="flex items-center text-gray-500 hover:text-blue-600 cursor-pointer transition">
                <ArrowLeft size={20} />
                <span className="ml-2 text-sm font-medium">Back to Roadmap Overview</span>
              </div>
            </Link>
          </div>

          {/* Congratulations Content */}
          <div className="col-span-12 text-center space-y-6">
            <img
              src="/congrats.gif"
              alt="Congratulations Animation"
              className="mx-auto w-64 h-64 object-contain"
            />

            <h1 className="text-4xl font-bold text-green-600">🎉 Congratulations!</h1>
            <p className="text-lg text-gray-700">
              You’ve successfully completed every milestone on your visa journey!
            </p>
            <p className="text-gray-600">
              From your first internship offer to securing your Green Card, you've done it all.
            </p>
            <p className="text-gray-600 font-medium italic">
              Now, let’s pay it forward—help fellow students in the forum and build a community where we all succeed together. 💬
            </p>

            {/* Back to Forum Button */}
            <div className="flex justify-center">
              <Link href="/forum">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition">
                  Go to Forum & Help Others
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
