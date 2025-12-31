import { Search, Calendar, Heart, User } from "lucide-react"

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-100 bg-white px-4 py-3 md:hidden">
      <button className="flex flex-col items-center gap-1">
        <div className="rounded-full bg-[var(--yellow-green-400)] p-2">
          <Search className="h-6 w-6 text-black" />
        </div>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <Calendar className="h-6 w-6" />
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <Heart className="h-6 w-6" />
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <User className="h-6 w-6" />
      </button>
    </nav>
  )
}
