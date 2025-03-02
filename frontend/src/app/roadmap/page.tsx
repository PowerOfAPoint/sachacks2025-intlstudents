"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import Header from "../../components/header";
import { Carousel, Card } from "../../components/ui/apple-cards-carousel";

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const slides = [
    {
      title: "Internship Offer",
      category: "Milestone 1",
      src: "/step1.png",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Congratulations! You’ve secured an internship offer from a U.S.-based employer.</li>
          <li>Ensure the internship aligns with your field of study and career goals.</li>
          <li><strong>Deadline:</strong> Start preparing documents immediately after receiving your offer.</li>
          <li><strong>Resources:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a href="https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/stem-opt" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">USCIS Work Authorization Overview</a>
              </li>
            </ul>
          </li>
        </ul>
      ),
      link: "roadmap/page1",
    },
    {
      title: "Day 1 CPT",
      category: "Milestone 2",
      src: "/step2.png",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Enroll in a Day 1 Curricular Practical Training (CPT) program.</li>
          <li>Work with your school’s DSO to confirm eligibility and submit forms.</li>
          <li><strong>Deadline:</strong> Apply at least 2 months before your internship starts.</li>
          <li><strong>Resources:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a href="https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/curricular-practical-training" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">USCIS CPT Guidelines</a>
              </li>
              <li>
                <a href="https://www.ice.gov/sevis/practical-training" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">ICE Practical Training Overview</a>
              </li>
            </ul>
          </li>
        </ul>
      ),
      link: "roadmap/page2",
    },
    {
      title: "OPT Application",
      category: "Milestone 3",
      src: "/step3.png",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Apply for Optional Practical Training (OPT) after graduation.</li>
          <li>Submit Form I-765 to USCIS with required documents.</li>
          <li><strong>Deadline:</strong> Apply within 90 days before graduation.</li>
          <li><strong>Resources:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a href="https://www.uscis.gov/i-765" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Form I-765 Instructions</a>
              </li>
              <li>
                <a href="https://studyinthestates.dhs.gov/stem-opt-hub" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Study in the States - OPT Hub</a>
              </li>
            </ul>
          </li>
        </ul>
      ),
      link: "roadmap/page3",
    },
    {
      title: "STEM OPT Extension",
      category: "Milestone 4",
      src: "/step4.png",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Apply for a 24-month STEM OPT extension if eligible.</li>
          <li>Complete Form I-983 with your employer.</li>
          <li><strong>Deadline:</strong> Apply within 90 days before your OPT ends.</li>
          <li><strong>Resources:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a href="https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/stem-opt" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">USCIS STEM OPT Guidelines</a>
              </li>
              <li>
                <a href="https://studyinthestates.dhs.gov/stem-opt-hub" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Study in the States - STEM OPT Hub</a>
              </li>
            </ul>
          </li>
        </ul>
      ),
      link: "roadmap/page4",
    },
    {
      title: "Cap-Gap Extension",
      category: "Milestone 5",
      src: "/step5.png",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>If your H-1B is pending, apply for Cap-Gap extension.</li>
          <li>Coordinate with your DSO for a seamless transition.</li>
          <li><strong>Deadline:</strong> Before your OPT expires.</li>
          <li><strong>Resources:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a href="https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/cap-gap-extension-for-f-1-students" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">USCIS Cap-Gap Extension</a>
              </li>
            </ul>
          </li>
        </ul>
      ),
      link: "roadmap/page5",
    },
    {
      title: "H-1B Visa Application",
      category: "Milestone 6",
      src: "/step6.png",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Work with your employer to file the H-1B petition.</li>
          <li>Gather required documents including Form I-129 and LCA.</li>
          <li><strong>Deadline:</strong> Apply on April 1 (cap season starts).</li>
          <li><strong>Resources:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a href="https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">USCIS H-1B Guidelines</a>
              </li>
            </ul>
          </li>
        </ul>
      ),
      link: "roadmap/page6",
    },
    {
      title: "H-1B Visa Approval",
      category: "Milestone 7",
      src: "/step7.png",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Congratulations on your H-1B approval!</li>
          <li>Confirm your work start date with your employer.</li>
          <li><strong>Deadline:</strong> October 1 (H-1B start date).</li>
          <li><strong>Resources:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a href="https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">USCIS H-1B Approval Process</a>
              </li>
            </ul>
          </li>
        </ul>
      ),
      link: "roadmap/page7",
    },
    {
      title: "Apply For Citizenship",
      category: "Milestone 8",
      src: "/step8.png",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Start your Green Card or citizenship application when eligible.</li>
          <li>Understand steps like PERM, I-140, and I-485.</li>
          <li><strong>Deadline:</strong> Based on your Green Card priority date.</li>
          <li><strong>Resources:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a href="https://www.uscis.gov/green-card" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">USCIS Green Card Process</a>
              </li>
            </ul>
          </li>
        </ul>
      ),
      link: "roadmap/page8",
    },
  ];
  

// Convert slides to items for the Carousel
const items = slides.map((slide, index) => (
  <Card
    key={index}
    card={{
      src: slide.src,
      title: slide.title,
      category: slide.category,
      content: slide.content,
      link: slide.link,
    }}
    index={index}
    layout={true}
  />
));

export default function RoadmapPage() {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: "Day 1 CPT", description: "Understand your CPT eligibility.", completed: false },
    { id: 2, title: "Internship & OPT", description: "Apply for internships & start OPT process.", completed: false },
    { id: 3, title: "STEM OPT Extension", description: "Apply for a 24-month STEM OPT extension.", completed: false },
    { id: 4, title: "Cap-Gap Extension", description: "If your H-1B is pending, apply for Cap-Gap extension.", completed: false },
    { id: 5, title: "H-1B Sponsorship", description: "Find an employer willing to sponsor your H-1B.", completed: false },
    { id: 6, title: "Green Card Process", description: "Start the PERM process with your employer.", completed: false },
  ]);

  const toggleStep = (id: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  return (
    <>
      {/* <style>
        {`
          html, body {
            height: 100%;
            overflow: hidden;
          }
        `}
      </style> */}

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Roadmap Section */}
      <div className="min-h-screen mt-14 px-6 py-10">
        <h2 className=" pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Your Complete Roadmap.
        </h2>

        {/* Carousel Section */}
        <div className="flex justify-center items-center min-h-[60vh] w-full">
          <Carousel items={items} />
        </div>
      </div>
    </>
  );
}
