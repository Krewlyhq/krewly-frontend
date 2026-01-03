"use client"

import { useState, useEffect } from "react"
import { X, Filter, MapPin, DollarSign, Briefcase, ChevronDown, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStateNames, getLGAsByState } from "@/lib/vendor"

export interface VendorFilters {
    state: string
    city: string
    category: string
    priceMin: number
    priceMax: number
}

const CATEGORIES = [
    "All Categories",
    "Makeup Artist",
    "Gele Stylist",
    "Hair Stylist",
    "Photographer",
    "Event Decorator",
    "Fashion Stylist/Tailor",
    "Nail Technician",
    "Henna Artist",
    "Bridal Stylist",
    "MC & Host",
    "DJ",
]

const PRICE_RANGES = [
    { label: "Any Price", min: 0, max: 1000000 },
    { label: "Under ₦20,000", min: 0, max: 20000 },
    { label: "₦20,000 - ₦50,000", min: 20000, max: 50000 },
    { label: "₦50,000 - ₦100,000", min: 50000, max: 100000 },
    { label: "₦100,000 - ₦200,000", min: 100000, max: 200000 },
    { label: "₦200,000+", min: 200000, max: 1000000 },
]

interface VendorFilterSheetProps {
    isOpen: boolean
    onClose: () => void
    filters: VendorFilters
    onApply: (filters: VendorFilters) => void
}

export function VendorFilterSheet({ isOpen, onClose, filters, onApply }: VendorFilterSheetProps) {
    const [localFilters, setLocalFilters] = useState<VendorFilters>(filters)
    const [states] = useState(getStateNames())
    const [cities, setCities] = useState<string[]>([])

    // Update cities when state changes
    useEffect(() => {
        if (localFilters.state) {
            setCities(getLGAsByState(localFilters.state))
        } else {
            setCities([])
        }
    }, [localFilters.state])

    // Sync with parent filters when opened
    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters)
        }
    }, [isOpen, filters])

    const handleStateChange = (state: string) => {
        setLocalFilters(prev => ({ ...prev, state, city: "" }))
    }

    const handleCityChange = (city: string) => {
        setLocalFilters(prev => ({ ...prev, city }))
    }

    const handleCategoryChange = (category: string) => {
        setLocalFilters(prev => ({
            ...prev,
            category: category === "All Categories" ? "" : category
        }))
    }

    const handlePriceChange = (range: typeof PRICE_RANGES[0]) => {
        setLocalFilters(prev => ({ ...prev, priceMin: range.min, priceMax: range.max }))
    }

    const handleReset = () => {
        setLocalFilters({
            state: "",
            city: "",
            category: "",
            priceMin: 0,
            priceMax: 1000000,
        })
    }

    const handleApply = () => {
        onApply(localFilters)
        onClose()
    }

    const getActiveFiltersCount = () => {
        let count = 0
        if (localFilters.state) count++
        if (localFilters.category) count++
        if (localFilters.priceMin > 0 || localFilters.priceMax < 1000000) count++
        return count
    }

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Sheet */}
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-primary" />
                        <h2 className="font-bold text-lg">Filters</h2>
                        {getActiveFiltersCount() > 0 && (
                            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                                {getActiveFiltersCount()}
                            </span>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Filters Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Location Filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <h3 className="font-semibold text-gray-900">Location</h3>
                        </div>

                        {/* State Select */}
                        <div className="relative mb-3">
                            <select
                                value={localFilters.state}
                                onChange={(e) => handleStateChange(e.target.value)}
                                className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            >
                                <option value="">All States</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* City Select */}
                        <div className="relative">
                            <select
                                value={localFilters.city}
                                onChange={(e) => handleCityChange(e.target.value)}
                                disabled={!localFilters.state}
                                className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="">All Cities</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="h-4 w-4 text-gray-500" />
                            <h3 className="font-semibold text-gray-900">Service Category</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category) => {
                                const isActive = category === "All Categories"
                                    ? !localFilters.category
                                    : localFilters.category === category
                                return (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`
                                            px-4 py-2 rounded-full text-sm font-medium transition-colors
                                            ${isActive
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }
                                        `}
                                    >
                                        {category}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <h3 className="font-semibold text-gray-900">Price Range</h3>
                        </div>
                        <div className="space-y-2">
                            {PRICE_RANGES.map((range) => {
                                const isActive = localFilters.priceMin === range.min && localFilters.priceMax === range.max
                                return (
                                    <button
                                        key={range.label}
                                        onClick={() => handlePriceChange(range)}
                                        className={`
                                            w-full px-4 py-3 rounded-xl text-left font-medium transition-colors
                                            ${isActive
                                                ? 'bg-primary/10 text-primary border-2 border-primary'
                                                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        {range.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="flex items-center gap-2"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </Button>
                    <Button
                        onClick={handleApply}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold"
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>
        </>
    )
}

// Export default filters
export const DEFAULT_FILTERS: VendorFilters = {
    state: "",
    city: "",
    category: "",
    priceMin: 0,
    priceMax: 1000000,
}
