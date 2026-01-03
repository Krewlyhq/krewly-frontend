"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"

export function LocationsSection() {
  const [showAll, setShowAll] = useState(false)

  const states = [
    { name: "Lagos", slug: "lagos", image: "/Krewly web photos/IMG_2397.JPG" },
    { name: "Abuja (FCT)", slug: "abuja", image: "/Krewly web photos/IMG_2398.JPG" },
    { name: "Oyo", slug: "oyo", image: "/Krewly web photos/IMG_2399.JPG" },
    { name: "Rivers", slug: "rivers", image: "/Krewly web photos/IMG_2400.JPG" },
    { name: "Kano", slug: "kano", image: "/Krewly web photos/IMG_2401.JPG" },
    { name: "Ogun", slug: "ogun", image: "/Krewly web photos/IMG_2402.JPG" },
    { name: "Kaduna", slug: "kaduna", image: "/Krewly web photos/IMG_2403.JPG" },
    { name: "Enugu", slug: "enugu", image: "/Krewly web photos/IMG_2404.JPG" },
    { name: "Delta", slug: "delta", image: "/Krewly web photos/IMG_2405.JPG" },
    { name: "Anambra", slug: "anambra", image: "/Krewly web photos/IMG_2406.JPG" },
    { name: "Edo", slug: "edo", image: "/Krewly web photos/IMG_2397.JPG" },
    { name: "Imo", slug: "imo", image: "/Krewly web photos/IMG_2398.JPG" },
    // Hidden initially - shown on "See more"
    { name: "Akwa Ibom", slug: "akwa-ibom", image: "/Krewly web photos/IMG_2399.JPG" },
    { name: "Cross River", slug: "cross-river", image: "/Krewly web photos/IMG_2400.JPG" },
    { name: "Osun", slug: "osun", image: "/Krewly web photos/IMG_2401.JPG" },
    { name: "Ekiti", slug: "ekiti", image: "/Krewly web photos/IMG_2402.JPG" },
    { name: "Kwara", slug: "kwara", image: "/Krewly web photos/IMG_2403.JPG" },
    { name: "Ondo", slug: "ondo", image: "/Krewly web photos/IMG_2404.JPG" },
    { name: "Abia", slug: "abia", image: "/Krewly web photos/IMG_2405.JPG" },
    { name: "Bayelsa", slug: "bayelsa", image: "/Krewly web photos/IMG_2406.JPG" },
    { name: "Benue", slug: "benue", image: "/placeholder.svg" },
    { name: "Borno", slug: "borno", image: "/placeholder.svg" },
    { name: "Ebonyi", slug: "ebonyi", image: "/placeholder.svg" },
    { name: "Gombe", slug: "gombe", image: "/placeholder.svg" },
    { name: "Jigawa", slug: "jigawa", image: "/placeholder.svg" },
    { name: "Katsina", slug: "katsina", image: "/placeholder.svg" },
    { name: "Kebbi", slug: "kebbi", image: "/placeholder.svg" },
    { name: "Kogi", slug: "kogi", image: "/placeholder.svg" },
    { name: "Nasarawa", slug: "nasarawa", image: "/placeholder.svg" },
    { name: "Niger", slug: "niger", image: "/placeholder.svg" },
    { name: "Plateau", slug: "plateau", image: "/placeholder.svg" },
    { name: "Sokoto", slug: "sokoto", image: "/placeholder.svg" },
    { name: "Taraba", slug: "taraba", image: "/placeholder.svg" },
    { name: "Yobe", slug: "yobe", image: "/placeholder.svg" },
    { name: "Zamfara", slug: "zamfara", image: "/placeholder.svg" },
    { name: "Adamawa", slug: "adamawa", image: "/placeholder.svg" },
    { name: "Bauchi", slug: "bauchi", image: "/placeholder.svg" },
  ]

  const hiddenStates = states.slice(12)

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Browse vendors by location</h2>

        {/* Initial visible states */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {states.slice(0, 12).map((state, i) => (
            <Link
              key={i}
              href={`/location/${state.slug}`}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <img src={state.image || "/placeholder.svg"} alt={state.name} className="h-full w-full object-cover" />
              </div>
              <div className="py-3 text-center bg-white">
                <span className="text-xs md:text-sm font-bold text-gray-900">{state.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Hidden states with smooth animation */}
        <div
          className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 overflow-hidden transition-all duration-500 ease-in-out ${showAll ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {hiddenStates.map((state, i) => (
            <Link
              key={i + 12}
              href={`/location/${state.slug}`}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <img src={state.image || "/placeholder.svg"} alt={state.name} className="h-full w-full object-cover" />
              </div>
              <div className="py-3 text-center bg-white">
                <span className="text-xs md:text-sm font-bold text-gray-900">{state.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* See more / See less button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-primary font-semibold hover:underline transition-all"
          >
            {showAll ? (
              <>
                See less <ChevronUp className="h-4 w-4 transition-transform duration-300" />
              </>
            ) : (
              <>
                See all available states <ChevronDown className="h-4 w-4 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
