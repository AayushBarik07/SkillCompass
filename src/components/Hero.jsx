"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DigitalHeroesButton from "./DigitalHeroesButton";

export default function Hero() {
  return (
    <div className="relative pt-24 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 relative z-10">
        <div className="flex justify-center mb-10">
          <DigitalHeroesButton />
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Direction for your <br/>
          <span className="text-highlight">career</span><br />
          growth.
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-[var(--theme-text-muted)] max-w-2xl mx-auto font-medium">
          SkillCompass is a smart job-readiness and career-fit platform. Compare your resume against a job description and get a 7-day action plan to become job-ready.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/signup" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base w-full sm:w-auto shadow-sm">
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link href="/login" className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-base w-full sm:w-auto shadow-sm">
            Login to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
