export function ServiceGrid() {
  const categories = [
    { label: "Makeup Artists", image: "/placeholder.svg" },
    { label: "Gele Stylists", image: "/placeholder.svg" },
    { label: "Hair Stylists", image: "/placeholder.svg" },
    { label: "Photographers", image: "/placeholder.svg" },
    { label: "Fashion Stylists", image: "/placeholder.svg" },
    { label: "Event Decorators", image: "/placeholder.svg" },
    { label: "Tailors", image: "/placeholder.svg" },
    { label: "Nail Technicians", image: "/placeholder.svg" },
    { label: "Henna Artists", image: "/placeholder.svg" },
    { label: "Bridal Stylists", image: "/placeholder.svg" },
    { label: "MC & Hosts", image: "/placeholder.svg" },
    { label: "DJ Services", image: "/placeholder.svg" },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Browse vendors by category</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((item, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-[4/3] w-full bg-gray-100">
                <img src={item.image || "/placeholder.svg"} alt={item.label} className="h-full w-full object-cover" />
              </div>
              <div className="py-3 text-center bg-white">
                <span className="text-xs md:text-sm font-bold text-gray-900">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
