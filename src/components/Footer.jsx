"use client";
import DigitalHeroesButton from "./DigitalHeroesButton";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--theme-border)] py-12 mt-auto bg-[var(--theme-bg)] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold text-highlight uppercase tracking-tight">SkillCompass</span>
            <p className="text-sm text-[var(--theme-text-muted)] max-w-sm text-center md:text-left">
              Direction for your career growth. Free, private, AI-powered career analysis.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <DigitalHeroesButton />
            <div className="flex gap-4">
              <a href="https://www.instagram.com/realshreyanshsingh/" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.linkedin.com/in/realshreyanshsingh/" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:aayush.barik@example.com" className="text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--theme-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--theme-text-muted)] opacity-80">
          <p>© {new Date().getFullYear()} SkillCompass. Built by Aayush Barik.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[var(--theme-primary)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--theme-primary)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
