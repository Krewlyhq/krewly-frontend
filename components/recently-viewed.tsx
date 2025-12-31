import { Star } from "lucide-react"

export function RecentlyViewed() {
  const viewed = [
    { name: "Glam by Tolu", role: "Makeup Artist", rating: "4.9", avatar: "/placeholder.svg" },
    { name: "Damola Photography", role: "Photographer", rating: "5.0", avatar: "/placeholder.svg" },
    { name: "Iya Gele", role: "Gele Stylist", rating: "4.8", avatar: "/placeholder.svg" },
  ]

  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="mb-6 text-xl font-bold">Recently Viewed</h2>
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
          {viewed.map((vendor, i) => (
            <div
              key={i}
              className="flex min-w-[280px] md:min-w-[320px] items-center gap-4 rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 ring-4 ring-gray-50">
                <img src={vendor.avatar || "/placeholder.svg"} alt={vendor.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{vendor.name}</h3>
                <p className="text-sm text-primary font-medium">{vendor.role}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{vendor.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
