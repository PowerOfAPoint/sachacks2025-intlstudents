"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import Header from "../../../components/header";
import ViewPreviousButton from "../../../components/ui/view-prev";
import ViewNextButton from "../../../components/ui/view-next";

export default function Step1Page() {
  const tasks = [
    {
      title: "Contact Your DSO",
      description: [
        "Please schedule a meeting with your DSO and relevant parties to confirm your program allows CPT.",
      ],
    },
    {
      title: "Check Eligibility Requirement",
      description: [
        "Verify you meet the eligibility criteria for Day 1 CPT, including full-time enrollment and program type.",
      ],
    },
    {
      title: "Enroll in CPT-Eligible Course",
      description: [
        "Ensure the course you choose is directly linked to your practical training experience.",
      ],
    },
    {
      title: "Submit CPT Application to School",
      description: [
        "Complete and submit all CPT application documents to your DSO for review and approval.",
      ],
    },
    {
      title: "Receive CPT Authorization",
      description: [
        "Once approved, your new I-20 will include CPT authorization, which allows you to start working.",
      ],
    },
  ];

  const [completedTasks, setCompletedTasks] = useState<boolean[]>(
    Array(tasks.length).fill(false)
  );

  const toggleTask = (index: number) => {
    const updated = [...completedTasks];
    updated[index] = !updated[index];
    setCompletedTasks(updated);
  };

  const completionPercentage = Math.round(
    (completedTasks.filter((t) => t).length / tasks.length) * 100
  );

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center px-6 py-10 mt-20">
        <div className="w-full max-w-7xl grid grid-cols-12 gap-8">
          {/* Back to Roadmap */}
          <div className="col-span-12">
            <ViewPreviousButton href="/roadmap" label="Roadmap Overview" />
          </div>

          {/* Progress Circle - Left Column */}
          <div className="col-span-6 flex flex-col justify-center items-center space-y-6">
            <h2 className="text-3xl font-bold">My Progress</h2>
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="8"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                />
                <circle
                  className="text-blue-600 stroke-current"
                  strokeWidth="8"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * completionPercentage) / 100}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-800">
                {completionPercentage}%
              </div>
            </div>
            <span className="text-lg text-gray-600">Day 1 CPT Checklist</span>
          </div>

          {/* Checklist - Right Column */}
          <div className="col-span-6 space-y-4 self-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Step 1 Tasks</h3>
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`flex justify-between items-start p-4 rounded-lg shadow-sm border cursor-pointer transition-all ${
                  completedTasks[index]
                    ? "bg-green-50 border-green-400"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => toggleTask(index)}
              >
                {/* Left Side - Text */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{task.title}</p>
                  <hr className="my-2 border-gray-300" />
                  <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                    {task.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>

                {/* Right Side - Icon */}
                {completedTasks[index] ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <Circle className="text-gray-400" size={24} />
                )}
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <ViewPreviousButton href="/roadmap" label="Roadmap Overview" />
              <ViewNextButton href="/roadmap/page2" label="Internship & OPT" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
