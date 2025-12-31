"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function LocationsSection() {
  const [showAll, setShowAll] = useState(false)

  const states = [
    { name: "Lagos", image: "/Krewly web photos/IMG_2397.JPG" },
    { name: "Abuja (FCT)", image: "/Krewly web photos/IMG_2398.JPG" },
    { name: "Oyo", image: "/Krewly web photos/IMG_2399.JPG" },
    { name: "Rivers", image: "/Krewly web photos/IMG_2400.JPG" },
    { name: "Kano", image: "/Krewly web photos/IMG_2401.JPG" },
    { name: "Ogun", image: "/Krewly web photos/IMG_2402.JPG" },
    { name: "Kaduna", image: "/Krewly web photos/IMG_2403.JPG" },
    { name: "Enugu", image: "/Krewly web photos/IMG_2404.JPG" },
    { name: "Delta", image: "/Krewly web photos/IMG_2405.JPG" },
    { name: "Anambra", image: "/Krewly web photos/IMG_2406.JPG" },
    { name: "Edo", image: "/Krewly web photos/IMG_2397.JPG" },
    { name: "Imo", image: "/Krewly web photos/IMG_2398.JPG" },
    // Hidden initially - shown on "See more"
    { name: "Akwa Ibom", image: "/Krewly web photos/IMG_2399.JPG" },
    { name: "Cross River", image: "/Krewly web photos/IMG_2400.JPG" },
    { name: "Osun", image: "/Krewly web photos/IMG_2401.JPG" },
    { name: "Ekiti", image: "/Krewly web photos/IMG_2402.JPG" },
    { name: "Kwara", image: "/Krewly web photos/IMG_2403.JPG" },
    { name: "Ondo", image: "/Krewly web photos/IMG_2404.JPG" },
    { name: "Abia", image: "/Krewly web photos/IMG_2405.JPG" },
    { name: "Bayelsa", image: "/Krewly web photos/IMG_2406.JPG" },
    { name: "Benue", image: "/placeholder.svg" },
    { name: "Borno", image: "/placeholder.svg" },
    { name: "Ebonyi", image: "/placeholder.svg" },
    { name: "Gombe", image: "/placeholder.svg" },
    { name: "Jigawa", image: "/placeholder.svg" },
    { name: "Katsina", image: "/placeholder.svg" },
    { name: "Kebbi", image: "/placeholder.svg" },
    { name: "Kogi", image: "/placeholder.svg" },
    { name: "Nasarawa", image: "/placeholder.svg" },
    { name: "Niger", image: "/placeholder.svg" },
    { name: "Plateau", image: "/placeholder.svg" },
    { name: "Sokoto", image: "/placeholder.svg" },
    { name: "Taraba", image: "/placeholder.svg" },
    { name: "Yobe", image: "/placeholder.svg" },
    { name: "Zamfara", image: "/placeholder.svg" },
    { name: "Adamawa", image: "/placeholder.svg" },
    { name: "Bauchi", image: "/placeholder.svg" },
  ]

  const visibleStates = showAll ? states : states.slice(0, 12)
  const hiddenStates = states.slice(12)

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Browse vendors by location</h2>

        {/* Initial visible states */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {states.slice(0, 12).map((state, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <img src={state.image || "/placeholder.svg"} alt={state.name} className="h-full w-full object-cover" />
              </div>
              <div className="py-3 text-center bg-white">
                <span className="text-xs md:text-sm font-bold text-gray-900">{state.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden states with smooth animation */}
        <div
          className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 overflow-hidden transition-all duration-500 ease-in-out ${showAll ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {hiddenStates.map((state, i) => (
            <div
              key={i + 12}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <img src={state.image || "/placeholder.svg"} alt={state.name} className="h-full w-full object-cover" />
              </div>
              <div className="py-3 text-center bg-white">
                <span className="text-xs md:text-sm font-bold text-gray-900">{state.name}</span>
              </div>
            </div>
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
