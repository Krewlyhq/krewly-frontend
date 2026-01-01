"use client"

import { ChevronDown } from "lucide-react"
import { getStateNames, getLGAsByState } from "@/lib/vendor"

interface LocationPickerProps {
    state: string
    city: string
    onStateChange: (state: string) => void
    onCityChange: (city: string) => void
    stateError?: string
    cityError?: string
}

export function LocationPicker({
    state,
    city,
    onStateChange,
    onCityChange,
    stateError,
    cityError,
}: LocationPickerProps) {
    const states = getStateNames()
    const cities = state ? getLGAsByState(state) : []

    const handleStateChange = (newState: string) => {
        onStateChange(newState)
        onCityChange("") // Reset city when state changes
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* State */}
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                    State <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        value={state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        className={`
              w-full appearance-none px-4 py-3 pr-10 border rounded-xl
              focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all
              ${stateError ? 'border-red-300' : 'border-gray-200'}
            `}
                    >
                        <option value="">Select state</option>
                        {states.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                {stateError && <p className="text-xs text-red-500">{stateError}</p>}
            </div>

            {/* City/LGA */}
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                    City/LGA <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        value={city}
                        onChange={(e) => onCityChange(e.target.value)}
                        disabled={!state}
                        className={`
              w-full appearance-none px-4 py-3 pr-10 border rounded-xl
              focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all
              ${!state ? 'bg-gray-50 cursor-not-allowed' : ''}
              ${cityError ? 'border-red-300' : 'border-gray-200'}
            `}
                    >
                        <option value="">
                            {state ? "Select city/LGA" : "Select state first"}
                        </option>
                        {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                {cityError && <p className="text-xs text-red-500">{cityError}</p>}
            </div>
        </div>
    )
}
