import { Star } from "lucide-react"

export function Testimonials() {
  const reviews = [
    {
      title: "Found my wedding team!",
      quote: "I discovered my makeup artist and photographer for my wedding through Krewly. The portfolios made it so easy to choose.",
      handle: "@Funke_Bride",
    },
    {
      title: "Great for my event",
      quote: "Needed a decorator for my mom's 60th birthday. Found Adunni Decor here and the result was stunning!",
      handle: "@ChidiEvent",
    },
    {
      title: "Professional profiles",
      quote: "Finally a platform where I can see vendor work properly. No more scrolling through messy Instagram pages.",
      handle: "@TolumiB",
    },
    {
      title: "Easy to contact",
      quote: "I love how I can WhatsApp vendors directly. Made booking my gele stylist so convenient.",
      handle: "@Nike_Styles",
    },
  ]

  return (
    <section className="py-16 bg-gray-50/30">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-2xl font-bold mb-12">What our users are saying</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-[var(--frozen-lake-50)] p-6 rounded-lg text-left border border-[var(--grey-200)]">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h4 className="font-bold mb-3">{rev.title}</h4>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{rev.quote}</p>
              <p className="text-xs font-bold text-gray-400">{rev.handle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
