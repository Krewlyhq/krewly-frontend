import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

const vendors = [
  {
    name: "Teni Beauty Studio",
    category: "Makeup Artist",
    location: "Lekki, Lagos",
    image: "/glam-makeup-portfolio.jpg",
  },
  {
    name: "Crown Braids & Styles",
    category: "Hair Stylist",
    location: "Ikeja, Lagos",
    image: "/braids-hairstyle-portfolio.jpg",
  },
  {
    name: "Perfect Gele Art",
    category: "Gele Artist",
    location: "Wuse, Abuja",
    image: "/gele-masterpiece.jpg",
  },
  {
    name: "Moments by Dave",
    category: "Photographer",
    location: "Victoria Island, Lagos",
    image: "/wedding-photography-portrait.jpg",
  },
]

export function FeaturedVendors() {
  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Top vendors</h2>
          <a href="/browse" className="text-sm font-semibold text-primary hover:underline">
            View all
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vendors.map((vendor) => (
            <div
              key={vendor.name}
              className="group overflow-hidden rounded-2xl border bg-background transition-all hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={vendor.image || "/placeholder.svg"}
                  alt={vendor.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">
                  {vendor.category}
                </Badge>
                <h3 className="mb-2 text-xl font-bold">{vendor.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {vendor.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
