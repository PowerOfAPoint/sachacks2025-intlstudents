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
      <ul className="list-disc pl-5">
        <li>Congratulations on securing an internship offer from a U.S.-based employer.</li>
        <li>Ensure the internship aligns with your field of study and career goals.</li>
      </ul>
    ),
  },
  {
    title: "Day 1 CPT",
    category: "Milestone 2",
    src: "/step2.png",
    content: (
      <ul className="list-disc pl-5">
        <li>Enroll in a Day 1 Curricular Practical Training (CPT) program.</li>
        <li>Ensure your program complies with immigration regulations.</li>
        <li>Deadline: Apply at least 2 months before internship starts.</li>
      </ul>
    ),
  },
  {
    title: "OPT Application",
    category: "Milestone 3",
    src: "/step3.png",
    content: (
      <ul className="list-disc pl-5">
        <li>Apply for Optional Practical Training (OPT) after graduation.</li>
        <li>Submit Form I-765 to USCIS and receive your EAD card.</li>
        <li>Deadline: Apply within 90 days before graduation.</li>
      </ul>
    ),
  },
  {
    title: "STEM OPT Extension",
    category: "Milestone 4",
    src: "/step4.png",
    content: (
      <ul className="list-disc pl-5">
        <li>Apply for a 24-month STEM OPT extension.</li>
        <li>Your employer must be enrolled in E-Verify.</li>
        <li>Deadline: Apply within 90 days before OPT ends.</li>
      </ul>
    ),
  },
  {
    title: "Cap-Gap Extension",
    category: "Milestone",
    src: "/step5.png",
    content: (
      <ul className="list-disc pl-5">
        <li>If your H-1B is pending, apply for Cap-Gap extension.</li>
        <li>Confirm eligibility with your employer.</li>
      </ul>
    ),
  },
  {
    title: "H-1B Visa Application",
    category: "Milestone",
    src: "/step6.png",
    content: (
      <ul className="list-disc pl-5">
        <li>Work with your employer to file the H-1B petition.</li>
        <li>Deadline: Apply on April 1 during the annual cap season.</li>
      </ul>
    ),
  },
  {
    title: "H-1B Visa Approval",
    category: "Milestone",
    src: "/step7.png",
    content: (
      <ul className="list-disc pl-5">
        <li>Start the PERM labor certification process with your employer.</li>
        <li>Understand timelines for each stage (PERM, I-140, Adjustment of Status).</li>
      </ul>
    ),
  },
  {
    title: "Apply For Citizenship",
    category: "Milestone",
    src: "/step8.png",
    content: (
      <ul className="list-disc pl-5">
        <li>Start the PERM labor certification process with your employer.</li>
        <li>Understand timelines for each stage (PERM, I-140, Adjustment of Status).</li>
      </ul>
    ),
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
      <style>
        {`
          html, body {
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>

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
