"use client"

import { VENDOR_CATEGORIES, type VendorCategory } from "@/lib/vendor"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface CategoryPickerProps {
    selected: VendorCategory[]
    onChange: (categories: VendorCategory[]) => void
    error?: string
}

export function CategoryPicker({ selected, onChange, error }: CategoryPickerProps) {
    const maxCategories = 3
    const [customValue, setCustomValue] = useState("")

    // Find if there is an existing custom category in selected list
    // A custom category is anything that is NOT in the predefined list (except 'Other')
    useEffect(() => {
        const standardCategories = VENDOR_CATEGORIES.filter(c => c !== 'Other')
        const foundCustom = selected.find(c => !standardCategories.includes(c as any))

        if (foundCustom && foundCustom !== 'Other') {
            setCustomValue(foundCustom)
        } else if (foundCustom === 'Other') {
            setCustomValue("")
        }
    }, [selected])

    const toggleCategory = (category: VendorCategory) => {
        const standardCategories = VENDOR_CATEGORIES.filter(c => c !== 'Other')

        if (category === 'Other') {
            // If selecting Other
            if (selected.includes('Other') || selected.some(c => !standardCategories.includes(c as any))) {
                // If already has Other or Custom, remove it
                const currentCustom = selected.find(c => !standardCategories.includes(c as any))
                if (currentCustom) {
                    onChange(selected.filter(c => c !== currentCustom))
                    setCustomValue("")
                }
            } else {
                // Add Other (placeholder)
                if (selected.length < maxCategories) {
                    onChange([...selected, 'Other'])
                    setCustomValue("")
                }
            }
            return
        }

        // Standard categories
        if (selected.includes(category)) {
            onChange(selected.filter(c => c !== category))
        } else {
            if (selected.length < maxCategories) {
                onChange([...selected, category])
            }
        }
    }

    const handleCustomChange = (newValue: string) => {
        setCustomValue(newValue)

        const standardCategories = VENDOR_CATEGORIES.filter(c => c !== 'Other') as string[]
        const otherCategories = selected.filter(c => standardCategories.includes(c))

        // If we have text, add it. If empty, keep 'Other' placeholder so input stays open
        if (newValue.trim()) {
            onChange([...otherCategories, newValue])
        } else {
            onChange([...otherCategories, 'Other'])
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    Categories <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-gray-400">
                    {selected.length}/{maxCategories} selected
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {VENDOR_CATEGORIES.map((category) => {
                    // Check if this category button should be active
                    // For 'Other', it is active if 'Other' is selected OR a custom value exists
                    const standardCategories = VENDOR_CATEGORIES.filter(c => c !== 'Other')
                    const isCustomCategory = category === 'Other'

                    let isSelected = false
                    if (isCustomCategory) {
                        isSelected = selected.some(c => !standardCategories.includes(c as any))
                    } else {
                        isSelected = selected.includes(category)
                    }

                    const isDisabled = !isSelected && selected.length >= maxCategories

                    // If it's 'Other' and it is selected, show Input
                    if (isCustomCategory && isSelected) {
                        return (
                            <div key="custom-input" className="relative flex items-center col-span-1">
                                <input
                                    type="text"
                                    value={customValue}
                                    onChange={(e) => handleCustomChange(e.target.value)}
                                    placeholder="Please specify..."
                                    autoFocus
                                    className="w-full px-3 py-2.5 rounded-xl text-sm font-medium border-2 border-primary bg-white text-gray-900 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleCategory('Other')}
                                    className="absolute right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )
                    }

                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => toggleCategory(category)}
                            disabled={isDisabled}
                            className={`
                                relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all
                                ${isSelected
                                    ? 'bg-primary text-white border-2 border-primary'
                                    : isDisabled
                                        ? 'bg-gray-50 text-gray-300 border-2 border-gray-100 cursor-not-allowed'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary/50'
                                }
                            `}
                        >
                            <span className={`
                                w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0
                                ${isSelected ? 'bg-white border-white' : 'border-gray-300'}
                            `}>
                                {isSelected && (
                                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                            <span className="truncate">{category}</span>
                        </button>
                    )
                })}
            </div>

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}
