const categories = [
  { name: "Makeup Artist", image: "/makeup-artist-close-up.jpg" },
  { name: "Hair Stylist", image: "/braiding-hair-stylist.jpg" },
  { name: "Gele Artist", image: "/nigerian-gele-headtie-art.jpg" },
  { name: "Photographer", image: "/event-photography.png" },
  { name: "Fashion Stylist", image: "/fashion-styling-outfit.jpg" },
  { name: "Event Decorator", image: "/event-decoration-setup.jpg" },
]

export function CategorySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Browse by category</h2>
        <div className="no-scrollbar flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-6 md:justify-center md:overflow-visible">
          {categories.map((cat) => (
            <div key={cat.name} className="group min-w-[160px] flex-shrink-0 cursor-pointer text-center">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-full ring-2 ring-transparent transition-all group-hover:ring-primary">
                <img
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <p className="font-semibold transition-colors group-hover:text-primary">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
