"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import Header from "../../../components/header";
import ViewPreviousButton from "../../../components/ui/view-prev";
import ViewNextButton from "../../../components/ui/view-next";

export default function Step5Page() {
  const tasks = [
    {
      title: "Confirm H-1B Filing",
      description: "Ensure your employer has filed your H-1B petition during the cap season.",
    },
    {
      title: "Notify Your DSO",
      description: "Provide your DSO with proof of H-1B filing (such as Form I-797 receipt notice).",
    },
    {
      title: "Receive Updated I-20",
      description: "Obtain a new I-20 reflecting your Cap-Gap Extension from your DSO.",
    },
    {
      title: "Continue Working",
      description: "If your OPT expires before October 1, you are allowed to continue working under the Cap-Gap Extension.",
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
          {/* Back to Previous Milestone */}
          <div className="col-span-12">
            <ViewPreviousButton href="/roadmap/page4" label="STEM OPT Extension" />
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
            <span className="text-lg text-gray-600">Cap-Gap Extension Checklist</span>
          </div>

          {/* Checklist - Right Column */}
          <div className="col-span-6 space-y-4 self-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Milestone 5: Cap-Gap Extension</h3>
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm border cursor-pointer transition-all space-y-2 ${
                  completedTasks[index]
                    ? "bg-green-50 border-green-400"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => toggleTask(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">{task.title}</span>
                  {completedTasks[index] ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <Circle className="text-gray-400" size={24} />
                  )}
                </div>
                <hr className="border-t border-gray-200" />
                <p className="text-gray-600 text-sm">{task.description}</p>
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <ViewPreviousButton href="/roadmap/page4" label="STEM OPT Extension" />
              <ViewNextButton href="/roadmap/page6" label="H-1B Visa Application" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
