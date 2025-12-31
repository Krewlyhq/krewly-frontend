"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

export function Navbar() {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar after scrolling past hero section (~300px)
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
          {/* Hamburger - Mobile only */}
          <Menu className="h-6 w-6 cursor-pointer text-black md:hidden" strokeWidth={1.5} />

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-black uppercase leading-none">
              Krewly
            </span>
          </Link>
        </div>

        {/* Right section: Auth actions */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          {/* Are you a vendor? - Hidden on mobile */}
          <Link
            href="/vendor/signup"
            className="hidden lg:block text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Are you a vendor?
          </Link>

          {/* Login Button - Liquid Glass Style */}
          <Link
            href="/login"
            className="rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold text-black backdrop-blur-md bg-white/60 border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.08)] hover:bg-white/80 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_6px_16px_rgba(0,0,0,0.12)] transition-all duration-200"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  )
}
