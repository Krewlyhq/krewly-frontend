"use client"

import { useState, useEffect } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const words = ["event", "party", "occasion"]

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {

        // if(text.length > currentWord.endsWith("A"))
        // Typing
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1))
        } else {
          // Pause at full word, then start deleting
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1))
        } else {
          // Move to next word
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex])

  return (
    <section className="relative overflow-hidden bg-[var(--hero-bg)] py-10 text-gray-900 md:py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Text and Search (55%) */}
          <div className="w-full lg:w-[55%] text-center lg:text-left">
            <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Find trusted vendors for your next{" "}
              <span className="text-primary">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-sm md:text-base text-gray-600 font-medium mx-auto lg:mx-0">
              Discover makeup artists, photographers, gele stylists, decorators and more — all in one place.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col md:flex-row items-stretch rounded-2xl md:rounded-full bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] gap-2 md:gap-0 border border-gray-100">
                {/* Vendor Type Input */}
                <div className="flex flex-1 items-center px-4 py-2 md:py-0 md:border-r border-gray-200">
                  <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="What do you need? e.g. Makeup, Gele"
                    className="w-full border-none bg-transparent px-3 py-2 text-sm text-black outline-none placeholder:text-gray-400"
                  />
                </div>

                {/* Location Input */}
                <div className="flex flex-1 items-center px-4 py-2 md:py-0">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Location e.g. Lagos, Ibadan"
                    className="w-full border-none bg-transparent px-3 py-2 text-sm text-black outline-none placeholder:text-gray-400"
                  />
                </div>

                {/* Search Button */}
                <Button className="rounded-xl md:rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 md:py-2 text-sm">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
              <span className="text-sm font-bold text-gray-700">Are you a vendor?</span>
              <Button size="sm" className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-white hover:bg-primary/90">
                Create Your Profile
              </Button>
            </div>

            {/* Trust signal */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-6">
              <span className="text-xs text-gray-500">Join 300+ vendors in</span>
              <div className="flex flex-wrap gap-1.5">
                {["Lagos", "Abuja", "Ibadan", "Port Harcourt"].map((city) => (
                  <span key={city} className="text-xs font-medium text-gray-600 bg-white/80 px-2 py-0.5 rounded-full border border-gray-200">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Image Collage (45%) */}
          <div className="w-full lg:w-[45%] hidden lg:block">
            <div className="relative">
              {/* Main featured image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/Krewly web photos/IMG_2400.JPG"
                  alt="Vendor showcase"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Floating accent images */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src="/Krewly web photos/IMG_2398.JPG"
                  alt="Event setup"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-4 -right-4 w-28 h-28 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src="/Krewly web photos/IMG_2402.JPG"
                  alt="Styled look"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
