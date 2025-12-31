import { Facebook, Instagram, Twitter, Paintbrush as Pinterest } from "lucide-react"

export function Footer() {
  const links = [
    "FIND PROFESSIONALS",
    "GET LISTED",
    "TEAM",
    "CAREERS",
    "TERMS FOR PROS",
    "TERMS FOR CLIENTS",
    "PRIVACY",
    "SECURITY",
    "SITEMAP",
  ]

  return (
    <footer className="bg-[#111113] text-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* About Section */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/Group.svg" alt="Krewly" className="h-10 w-10" style={{ filter: 'brightness(0) invert(1)' }} />
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Krewly</h3>
            </div>
            <p className="text-sm text-white/80 max-w-xl leading-relaxed">
              Krewly is the online destination for beauty & wellness professionals and clients. Professionals can
              showcase their work, connect with new and existing clients, and build their business. Clients can discover
              new services and providers, book appointments online, and get inspired.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <img src="/app-store-badge.svg" alt="App Store" className="h-10 cursor-pointer" />
              <img src="/google-play-badge.svg" alt="Google Play" className="h-10 cursor-pointer" />
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Media</h3>
              <ul className="space-y-2 text-sm text-white/70 font-medium">
                <li className="hover:text-white cursor-pointer">Krewly Blog</li>
                <li className="hover:text-white cursor-pointer">Press</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Talk to Us</h3>
              <ul className="space-y-2 text-sm text-white/70 font-medium">
                <li className="hover:text-white cursor-pointer">Krewly Help Center</li>
              </ul>
            </div>
          </div>

          {/* Big Link list */}
          <div className="lg:col-span-4">
            <ul className="grid grid-cols-1 gap-2 text-xs font-black tracking-widest">
              {links.map((link) => (
                <li key={link} className="hover:text-white/70 cursor-pointer transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
            © {new Date().getFullYear()} Krewly, Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
              <Facebook className="h-4 w-4" />
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
              <Twitter className="h-4 w-4" />
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
              <Pinterest className="h-4 w-4" />
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
              <Instagram className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
