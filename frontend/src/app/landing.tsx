"use client";

import { FeatureGrid } from "@/components/feature-grid";
import Header from "../components/header";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const foundingMembers = [
  {
    id: 1,
    name: "An Le",
    designation: "Software Engineer",
    image: "/defaultavatar.jpg",
  },
  {
    id: 2,
    name: "Quynh Tran",
    designation: "Product Manager",
    image: "/defaultavatar.jpg",
  },
  {
    id: 3,
    name: "Steven Yuan",
    designation: "AI Engineer",
    image: "/defaultavatar.jpg",
  },
  {
    id: 4,
    name: "Matthew Ponciano",
    designation: "Software Engineer",
    image: "/defaultavatar.jpg",
  },
];

export default function LandingPage() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-20 flex bg-white shadow-md">
        <Header />
      </div>

      <main className="relative min-h-screen font-sans overflow-hidden">
        <section></section>

        {/* Content Section */}
        <section className="relative min-h-screen  flex flex-col items-center justify-center space-y-8 px-6 text-center">
          {/* Headline */}

          <h1 className="text-6xl font-extrabold leading-tight">
            No More Visa Confusion
            <br />
            <span className="text-blue-400"> Just Clear Roadmaps</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg max-w-2xl text-muted-foreground leading-relaxed">
            Supercharge your career in the U.S. with personalized guidance from
            Day 1 CPT to OPT, STEM OPT, Cap-Gap, and H-1B sponsorship — tailored
            for F-1 students in tech.
          </p>

          {/* Call to Action */}
          <a
            href="/sign-up"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-500 transition"
          >
            Join Today - It’s Free
          </a>

          {/* Founding Team */}
          <div className="mt-12 w-full max-w-4xl space-y-4">
            <h2 className="text-xl font-semibold text-muted-foreground">
              Our Founding Team
            </h2>

            {/* Tooltip Grid */}
            <div className="flex flex-wrap justify-center gap-6">
              <AnimatedTooltip items={foundingMembers} />
            </div>
          </div>
        </section>

        <section className="relative container mx-auto px-4 md:px-6 py-16 text-center md:text-left space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              What We Do
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
              Empowering international students with the tools they need to
              navigate work visas, career paths, and immigration — all in one
              place.
            </p>
          </div>

          {/* Feature Grid */}
          <FeatureGrid />
          {/* Footer Love Note */}
          <p className="mt-10 text-muted-foreground text-sm">
            Made with 💙 by F-1 Students, for F-1 Students
          </p>
        </section>
      </main>
    </>
  );
}
