"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, User } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useAuthModal } from "@/lib/auth/modal-context"

export function Navbar() {
  const [isHidden, setIsHidden] = useState(false)
  const { user, isAuthenticated, isLoading } = useAuth()
  const { openLogin } = useAuthModal()

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 300
      setIsHidden(window.scrollY > scrollThreshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white border-b border-gray-100 h-16 md:h-20 px-4 md:px-8 transition-transform duration-300 ${isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div className="h-full mx-auto flex items-center justify-between">
        {/* Left section: Hamburger (mobile) + Logo */}
        <div className="flex-1 flex items-center gap-4">
          <Menu className="h-6 w-6 cursor-pointer text-black md:hidden" strokeWidth={1.5} />

          <Link href="/" className="flex items-center gap-2">
            <img src="/Group.svg" alt="Krewly" className="h-8 w-8 md:h-10 md:w-10" />
            <span className="text-xl md:text-2xl font-black tracking-tighter text-black uppercase leading-none">
              Krewly
            </span>
          </Link>
        </div>

        {/* Right section: Auth actions */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          <Link
            href="/become-vendor"
            className="hidden lg:block text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Are you a vendor?
          </Link>

          {isLoading ? (
            <div className="w-20 h-10 bg-gray-100 rounded-full animate-pulse" />
          ) : isAuthenticated ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline">{user?.firstName || "Dashboard"}</span>
              <span className="md:hidden">Account</span>
            </Link>
          ) : (
            <button
              onClick={openLogin}
              className="rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold text-black backdrop-blur-md bg-white/60 border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.08)] hover:bg-white/80 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_6px_16px_rgba(0,0,0,0.12)] transition-all duration-200"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
