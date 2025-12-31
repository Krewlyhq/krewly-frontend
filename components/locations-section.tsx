"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function LocationsSection() {
  const [showAll, setShowAll] = useState(false)

  const states = [
    { name: "Lagos", image: "/placeholder.svg" },
    { name: "Abuja (FCT)", image: "/placeholder.svg" },
    { name: "Oyo", image: "/placeholder.svg" },
    { name: "Rivers", image: "/placeholder.svg" },
    { name: "Kano", image: "/placeholder.svg" },
    { name: "Ogun", image: "/placeholder.svg" },
    { name: "Kaduna", image: "/placeholder.svg" },
    { name: "Enugu", image: "/placeholder.svg" },
    { name: "Delta", image: "/placeholder.svg" },
    { name: "Anambra", image: "/placeholder.svg" },
    { name: "Edo", image: "/placeholder.svg" },
    { name: "Imo", image: "/placeholder.svg" },
    // Hidden initially - shown on "See more"
    { name: "Akwa Ibom", image: "/placeholder.svg" },
    { name: "Cross River", image: "/placeholder.svg" },
    { name: "Osun", image: "/placeholder.svg" },
    { name: "Ekiti", image: "/placeholder.svg" },
    { name: "Kwara", image: "/placeholder.svg" },
    { name: "Ondo", image: "/placeholder.svg" },
    { name: "Abia", image: "/placeholder.svg" },
    { name: "Bayelsa", image: "/placeholder.svg" },
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

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Browse vendors by location</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleStates.map((state, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-[4/3] w-full bg-gray-100">
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
                See less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                See all available states <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
