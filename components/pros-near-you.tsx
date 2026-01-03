import Link from "next/link"
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
      image: "/Krewly web photos/IMG_2397.JPG",
    },
    {
      name: "Damola Photography",
      category: "Photographer",
      loc: "Ikeja, Lagos",
      rating: 5.0,
      count: 127,
      badge: "Top Rated",
      image: "/Krewly web photos/IMG_2400.JPG",
    },
    {
      name: "Iya Gele",
      category: "Gele Stylist",
      loc: "Ibadan, Oyo",
      rating: 4.8,
      count: 89,
      badge: "",
      image: "/Krewly web photos/IMG_2398.JPG",
    },
    {
      name: "Adunni Decor",
      category: "Event Decorator",
      loc: "Victoria Island, Lagos",
      rating: 5.0,
      count: 34,
      badge: "Top Rated",
      image: "/Krewly web photos/IMG_2402.JPG",
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Featured Vendors</h2>
          <Link href="/vendors" className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-black transition-colors">
            See All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid layout matching service-grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vendors.map((vendor, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer bg-white"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img src={vendor.image} alt={vendor.name} className="h-full w-full object-cover" />
                {vendor.badge && (
                  <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                    {vendor.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-bold text-sm text-gray-900 truncate">{vendor.name}</h3>
                <p className="text-xs text-primary font-medium">{vendor.category}</p>
                <p className="text-xs text-gray-500">{vendor.loc}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{vendor.rating.toFixed(1)}</span>
                  <span className="text-[10px] text-gray-400">({vendor.count})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
