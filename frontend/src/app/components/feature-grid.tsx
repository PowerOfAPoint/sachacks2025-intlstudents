"use client";

import { GraduationCap, MessagesSquare, CalendarDays, ShieldCheck, FileSearch } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function FeatureGrid() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {/* Personalized Visa Roadmap */}
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<GraduationCap className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Personalized Visa Roadmap"
        description="Get a step-by-step timeline tailored to your major, graduation date, and visa status, helping you track OPT, STEM OPT, and H-1B deadlines."
      />

      {/* AI-Powered RAG Chatbot */}
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<MessagesSquare className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="AI-Powered Chat (ChatOpt)"
        description="Ask questions and get fact-checked visa advice sourced directly from USCIS, DOL, ICE, and SEVP."
      />

      {/* Google Calendar Integration */}
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<CalendarDays className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Deadline Reminders"
        description="Sync important deadlines (OPT application, STEM extension, H-1B lottery) directly to your Google Calendar."
      />

      {/* Verified Q&A Forum */}
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<ShieldCheck className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Verified Q&A Forum"
        description="Post questions to a community of F-1 students and immigration experts, with verified answers highlighted."
      />

      {/* Case Tracker */}
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<FileSearch className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Case Tracker & Alerts"
        description="Track your visa application status and receive alerts if there are USCIS policy changes impacting your case."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem] text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
