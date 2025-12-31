import { Button } from "@/components/ui/button"

export function BusinessCTA() {
  const cards = [
    {
      title: "Showcase your work",
      desc: "Create a stunning portfolio that highlights your best work and attracts more clients.",
    },
    {
      title: "Get discovered",
      desc: "Be found by clients looking for vendors in your category and location."
    },
    {
      title: "Receive inquiries",
      desc: "Let clients contact you directly via WhatsApp, phone, or our simple inquiry form.",
    },
  ]

  return (
    <section className="py-16 bg-[var(--frozen-lake-100)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
          {/* Collage side */}
          <div className="relative w-full max-w-sm aspect-square">
            <div className="absolute inset-0 bg-white/20 rotate-3 rounded-lg" />
            <div className="absolute inset-4 overflow-hidden rounded-sm rotate-[-2deg] border-4 border-white shadow-xl">
              <img src="/Krewly web photos/IMG_2403.JPG" alt="Vendor" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Text side */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-black">Create your vendor profile on Krewly</h2>
            <p className="text-lg md:text-xl text-black/80 mb-8 font-medium">
              Join hundreds of vendors getting discovered by clients for events and bookings.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg rounded-full">
              Create Your Profile
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{card.desc}</p>
              <Button variant="outline" className="bg-primary text-white hover:bg-primary/90 border-none font-bold">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
