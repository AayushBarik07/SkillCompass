"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Compass, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated === false) {
            setIsLoggedIn(false);
          } else {
            setIsLoggedIn(true);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout");
      setIsLoggedIn(false);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-[var(--theme-bg)] border-b border-[var(--theme-border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group min-w-0">
            <Compass className="h-6 w-6 sm:h-7 sm:w-7 text-[var(--theme-primary)] transition-transform group-hover:rotate-12 duration-300 flex-shrink-0" />
            <span className="text-base sm:text-xl font-bold tracking-tight uppercase text-[var(--theme-text)] truncate">SkillCompass</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-5 flex-shrink-0">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors">
                  <LayoutDashboard className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors whitespace-nowrap">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary px-3 sm:px-5 py-2 text-xs sm:text-sm whitespace-nowrap"
                >
                  <span className="sm:hidden">Sign up</span>
                  <span className="hidden sm:inline">Sign up free</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
