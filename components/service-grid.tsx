export function ServiceGrid() {
  const categories = [
    { label: "Makeup Artists", image: "/Krewly web photos/IMG_2397.JPG" },
    { label: "Gele Stylists", image: "/Krewly web photos/IMG_2398.JPG" },
    { label: "Hair Stylists", image: "/Krewly web photos/IMG_2399.JPG" },
    { label: "Photographers", image: "/Krewly web photos/IMG_2400.JPG" },
    { label: "Fashion Stylists", image: "/Krewly web photos/IMG_2401.JPG" },
    { label: "Event Decorators", image: "/Krewly web photos/IMG_2402.JPG" },
    { label: "Tailors", image: "/Krewly web photos/IMG_2403.JPG" },
    { label: "Nail Technicians", image: "/Krewly web photos/IMG_2404.JPG" },
    { label: "Henna Artists", image: "/Krewly web photos/IMG_2405.JPG" },
    { label: "Bridal Stylists", image: "/Krewly web photos/IMG_2406.JPG" },
    { label: "MC & Hosts", image: "/Krewly web photos/IMG_2397.JPG" },
    { label: "DJ Services", image: "/Krewly web photos/IMG_2398.JPG" },
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
              <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <img src={item.image} alt={item.label} className="h-full w-full object-cover" />
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
