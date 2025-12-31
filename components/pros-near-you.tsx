import { Star, ChevronRight } from "lucide-react"

export function ProsNearYou() {
  const vendors = [
    {
      name: "Glam by Tolu",
      category: "Makeup Artist",
      loc: "Lekki, Lagos",
      rating: 4.9,
      count: 48,
      badge: "Top Rated",
      image: "/placeholder.svg",
    },
    {
      name: "Damola Photography",
      category: "Photographer",
      loc: "Ikeja, Lagos",
      rating: 5.0,
      count: 127,
      badge: "Top Rated",
      image: "/placeholder.svg",
    },
    {
      name: "Iya Gele",
      category: "Gele Stylist",
      loc: "Ibadan, Oyo",
      rating: 4.8,
      count: 89,
      badge: "",
      image: "/placeholder.svg",
    },
    {
      name: "Adunni Decor",
      category: "Event Decorator",
      loc: "Victoria Island, Lagos",
      rating: 5.0,
      count: 34,
      badge: "Top Rated",
      image: "/placeholder.svg",
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Featured Vendors</h2>
          <button className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-black transition-colors">
            See All <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
          {vendors.map((vendor, i) => (
            <div key={i} className="flex-none w-[240px] md:w-[280px] cursor-pointer">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 group">
                <img
                  src={vendor.image || "/placeholder.svg"}
                  alt={vendor.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {vendor.badge && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-gray-100 shadow-sm">
                    <Star className="h-3 w-3 fill-[#FFD700] text-[#FFD700]" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">{vendor.badge}</span>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg text-gray-900 leading-tight">{vendor.name}</h3>
              <p className="text-sm text-primary font-medium mt-0.5">{vendor.category}</p>
              <p className="text-sm text-gray-500">{vendor.loc}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold">{vendor.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-400">({vendor.count} inquiries)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
