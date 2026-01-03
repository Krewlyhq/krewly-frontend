"use client"

import { use, useState, useMemo } from "react"
import Link from "next/link"
import { Star, MapPin, ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VendorFilterSheet, DEFAULT_FILTERS, type VendorFilters } from "@/components/vendor"
import { getStateNames } from "@/lib/vendor"

// Mock vendor data with prices
const MOCK_VENDORS = [
    {
        id: "1",
        name: "Glam by Tolu",
        category: "Makeup Artist",
        location: "Lekki, Lagos",
        state: "Lagos",
        city: "Lekki",
        rating: 4.9,
        reviews: 48,
        badge: "Top Rated",
        image: "/Krewly web photos/IMG_2397.JPG",
        priceMin: 50000,
    },
    {
        id: "2",
        name: "Lagos Beauty Studio",
        category: "Hair Stylist",
        location: "Ikeja, Lagos",
        state: "Lagos",
        city: "Ikeja",
        rating: 4.8,
        reviews: 35,
        badge: "",
        image: "/Krewly web photos/IMG_2399.JPG",
        priceMin: 15000,
    },
    {
        id: "3",
        name: "VI Event Decor",
        category: "Event Decorator",
        location: "Victoria Island, Lagos",
        state: "Lagos",
        city: "Victoria Island",
        rating: 5.0,
        reviews: 22,
        badge: "Top Rated",
        image: "/Krewly web photos/IMG_2402.JPG",
        priceMin: 200000,
    },
    {
        id: "4",
        name: "Moments by Dave",
        category: "Photographer",
        location: "Surulere, Lagos",
        state: "Lagos",
        city: "Surulere",
        rating: 4.7,
        reviews: 18,
        badge: "",
        image: "/Krewly web photos/IMG_2400.JPG",
        priceMin: 80000,
    },
]

function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price)
}

interface PageParams {
    params: Promise<{ state: string }>
}

export default function LocationPage({ params }: PageParams) {
    const { state: stateSlug } = use(params)
    const stateName = stateSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    const allStates = getStateNames()

    // Initialize filters with this state pre-selected
    const [filters, setFilters] = useState<VendorFilters>({
        ...DEFAULT_FILTERS,
        state: stateName,
    })
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Apply filters
    const filteredVendors = useMemo(() => {
        return MOCK_VENDORS.filter(vendor => {
            // State filter (always apply the page state, but filter can override)
            if (filters.state && vendor.state !== filters.state) return false

            // City filter
            if (filters.city && vendor.city !== filters.city) return false

            // Category filter
            if (filters.category && vendor.category !== filters.category) return false

            // Price filter
            if (vendor.priceMin > filters.priceMax) return false

            return true
        })
    }, [filters])

    const getActiveFiltersCount = () => {
        let count = 0
        if (filters.city) count++
        if (filters.category) count++
        if (filters.priceMin > 0 || filters.priceMax < 1000000) count++
        return count
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="font-bold text-lg">Vendors in {stateName}</h1>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full relative"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                        {getActiveFiltersCount() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                {getActiveFiltersCount()}
                            </span>
                        )}
                    </Button>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 md:px-8 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-gray-500">
                        {filteredVendors.length} vendors in {stateName}
                    </p>
                    {getActiveFiltersCount() > 0 && (
                        <button
                            onClick={() => setFilters({ ...DEFAULT_FILTERS, state: stateName })}
                            className="text-sm text-primary hover:underline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Vendors Grid */}
                {filteredVendors.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredVendors.map((vendor) => (
                            <Link
                                key={vendor.id}
                                href={`/vendors/${vendor.id}`}
                                className="flex flex-col overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer bg-white"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                    <img src={vendor.image} alt={vendor.name} className="h-full w-full object-cover" />
                                    {vendor.badge && (
                                        <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                                            {vendor.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-3 md:p-4">
                                    <h3 className="font-bold text-sm md:text-base text-gray-900 truncate">{vendor.name}</h3>
                                    <p className="text-xs text-primary font-medium">{vendor.category}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                        <MapPin className="h-3 w-3" />
                                        <span className="truncate">{vendor.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-bold">{vendor.rating.toFixed(1)}</span>
                                            <span className="text-[10px] text-gray-400">({vendor.reviews})</span>
                                        </div>
                                        <span className="text-[10px] text-gray-500">
                                            From {formatPrice(vendor.priceMin)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">No vendors found in {stateName}</h3>
                        <p className="text-gray-500 text-sm mb-4">Try adjusting your filters</p>
                        <Button variant="outline" onClick={() => setFilters({ ...DEFAULT_FILTERS, state: stateName })}>
                            Clear filters
                        </Button>
                    </div>
                )}

                {/* Other States */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="font-bold text-lg mb-4">Browse other states</h2>
                    <div className="flex flex-wrap gap-2">
                        {allStates.slice(0, 12).map((s) => (
                            <Link
                                key={s}
                                href={`/location/${s.toLowerCase().replace(/\s/g, '-')}`}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${s.toLowerCase() === stateName.toLowerCase()
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {s}
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            {/* Filter Sheet */}
            <VendorFilterSheet
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onApply={setFilters}
            />
        </div>
    )
}
