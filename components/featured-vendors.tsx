import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

const vendors = [
  {
    id: "1",
    name: "Glam by Tolu",
    category: "Makeup Artist",
    location: "Lekki, Lagos",
    image: "/Krewly web photos/IMG_2397.JPG",
  },
  {
    id: "5",
    name: "Crown Braids & Styles",
    category: "Hair Stylist",
    location: "Ikeja, Lagos",
    image: "/Krewly web photos/IMG_2399.JPG",
  },
  {
    id: "3",
    name: "Iya Gele",
    category: "Gele Stylist",
    location: "Ibadan, Oyo",
    image: "/Krewly web photos/IMG_2398.JPG",
  },
  {
    id: "2",
    name: "Damola Photography",
    category: "Photographer",
    location: "Ikeja, Lagos",
    image: "/Krewly web photos/IMG_2400.JPG",
  },
]

export function FeaturedVendors() {
  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Top vendors</h2>
          <Link href="/vendors" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendors/${vendor.id}`}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
