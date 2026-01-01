"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Phone, Building2, MapPin, Camera, Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { CategoryPicker, LocationPicker, ImageUploader, SocialInputs } from "@/components/vendor"
import {
    type VendorCategory,
    type SocialHandles,
    type VendorApplication,
    saveApplication,
    getApplication,
} from "@/lib/vendor"

// Phone validation regex: 0xxxxxxxxxx (11 digits) or +234xxxxxxxxx
const PHONE_REGEX = /^(0[7-9][0-1]\d{8}|\+234[7-9][0-1]\d{8})$/

interface FormErrors {
    businessName?: string
    categories?: string
    state?: string
    city?: string
    phone?: string
    images?: string
    instagram?: string
}

export default function BecomeVendorPage() {
    const router = useRouter()
    const { user, isLoading: authLoading, isAuthenticated } = useAuth()

    // Check for existing application
    const [existingApplication, setExistingApplication] = useState<VendorApplication | null>(null)
    const [checkingApplication, setCheckingApplication] = useState(true)

    // Form state
    const [businessName, setBusinessName] = useState("")
    const [categories, setCategories] = useState<VendorCategory[]>([])
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [availableForTravel, setAvailableForTravel] = useState(false)
    const [phone, setPhone] = useState("")
    const [images, setImages] = useState<string[]>([])
    const [socialHandles, setSocialHandles] = useState<SocialHandles>({ instagram: "" })

    // UI state
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Check authentication and existing application
    useEffect(() => {
        if (!authLoading) {
            if (!isAuthenticated) {
                router.push("/")
                return
            }

            // Check if user is already a vendor
            if (user?.role === 'vendor') {
                router.push("/dashboard")
                return
            }

            // Check for existing application
            const app = getApplication()
            if (app) {
                setExistingApplication(app)
            }
            setCheckingApplication(false)
        }
    }, [authLoading, isAuthenticated, user, router])

    const validate = (): boolean => {
        const newErrors: FormErrors = {}

        if (!businessName.trim() || businessName.length < 2) {
            newErrors.businessName = "Business name is required (min 2 characters)"
        }

        if (categories.length === 0) {
            newErrors.categories = "Select at least one category"
        }

        if (!state) {
            newErrors.state = "State is required"
        }

        if (!city) {
            newErrors.city = "City/LGA is required"
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!PHONE_REGEX.test(phone.replace(/\s/g, ''))) {
            newErrors.phone = "Enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)"
        }

        if (images.length < 2) {
            newErrors.images = "Upload at least 2 portfolio images"
        }

        if (!socialHandles.instagram.trim()) {
            newErrors.instagram = "Instagram handle is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        setIsSubmitting(true)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Create application
        const application: VendorApplication = {
            id: `app-${Date.now()}`,
            userId: user?.id || '',
            businessName: businessName.trim(),
            categories,
            state,
            city,
            availableForTravel,
            phoneNumber: phone.replace(/\s/g, ''),
            portfolioImages: images,
            socialHandles,
            status: 'pending',
            submittedAt: new Date().toISOString(),
        }

        saveApplication(application)
        setIsSuccess(true)
        setIsSubmitting(false)
    }

    // Loading state
    if (authLoading || checkingApplication) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--frozen-lake-50)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Success state
    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--frozen-lake-50)] px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
                    <p className="text-gray-500 mb-6">
                        We'll review your application within 24 hours. You'll be notified once it's approved.
                    </p>
                    <Link href="/dashboard">
                        <Button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Existing application state
    if (existingApplication) {
        return (
            <div className="min-h-screen bg-[var(--frozen-lake-50)] px-4 py-8">
                <div className="max-w-md mx-auto">
                    <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <img src="/Group.svg" alt="Krewly" className="h-12 w-12 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold mb-2">Application {existingApplication.status === 'pending' ? 'Pending' : existingApplication.status === 'approved' ? 'Approved' : 'Rejected'}</h1>
                            {existingApplication.status === 'pending' && (
                                <p className="text-gray-500">
                                    Your application is under review. We'll notify you within 24 hours.
                                </p>
                            )}
                        </div>

                        {/* Application Summary */}
                        <div className="border-t border-gray-100 pt-6 space-y-4">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Business Name</p>
                                <p className="font-medium">{existingApplication.businessName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Categories</p>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {existingApplication.categories.map(cat => (
                                        <span key={cat} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Location</p>
                                <p className="font-medium">{existingApplication.city}, {existingApplication.state}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">Submitted</p>
                                <p className="font-medium">{new Date(existingApplication.submittedAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* DEV: Simulate Approval Button */}
                        {existingApplication.status === 'pending' && (
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        // Update application status
                                        const app = getApplication()
                                        if (app) {
                                            app.status = 'approved'
                                            app.reviewedAt = new Date().toISOString()
                                            saveApplication(app)

                                            // Update user role (mock)
                                            const storedUser = localStorage.getItem('krewly_user')
                                            if (storedUser) {
                                                const user = JSON.parse(storedUser)
                                                user.role = 'vendor'
                                                localStorage.setItem('krewly_user', JSON.stringify(user))
                                            }

                                            router.push('/dashboard')
                                        }
                                    }}
                                    className="w-full text-xs text-gray-400 hover:text-primary underline"
                                >
                                    [DEV] Simulate Approval
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Form
    return (
        <div className="min-h-screen bg-[var(--frozen-lake-50)] px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8 px-2 md:px-8">
                        {['Business', 'Location', 'Portfolio', 'Contact'].map((step, i, arr) => (
                            <div key={step} className="flex flex-col items-center relative z-10">
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all
                                    bg-primary text-white border-primary
                                `}>
                                    {i + 1}
                                </div>
                                <span className="text-[10px] uppercase font-bold text-primary">{step}</span>

                                {/* Connector Line */}
                                {i < arr.length - 1 && (
                                    <div className="absolute top-4 left-1/2 w-[calc(100vw/5)] md:w-32 h-[2px] -z-10 bg-primary/20" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Become a Vendor</h1>
                        <p className="text-gray-500">
                            Join our network of trusted beauty and event professionals
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Business Information */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Building2 className="h-5 w-5 text-primary" />
                                <h2 className="font-bold text-gray-900">Business Information</h2>
                            </div>

                            <div className="space-y-5">
                                {/* Business Name */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Business Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        placeholder="e.g., Glam by Tolu"
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.businessName ? 'border-red-300' : 'border-gray-200'}`}
                                    />
                                    {errors.businessName && <p className="text-xs text-red-500">{errors.businessName}</p>}
                                </div>

                                {/* Categories */}
                                <CategoryPicker
                                    selected={categories}
                                    onChange={setCategories}
                                    error={errors.categories}
                                />
                            </div>
                        </section>

                        {/* Location */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-5 w-5 text-primary" />
                                <h2 className="font-bold text-gray-900">Location</h2>
                            </div>

                            <div className="space-y-5">
                                <LocationPicker
                                    state={state}
                                    city={city}
                                    onStateChange={setState}
                                    onCityChange={setCity}
                                    stateError={errors.state}
                                    cityError={errors.city}
                                />

                                {/* Available for Travel */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <p className="font-medium text-gray-900">Available for travel</p>
                                        <p className="text-xs text-gray-500">Can you travel to other cities for bookings?</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setAvailableForTravel(!availableForTravel)}
                                        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${availableForTravel ? 'bg-primary' : 'bg-gray-300'}`}
                                    >
                                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${availableForTravel ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Portfolio */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Camera className="h-5 w-5 text-primary" />
                                <h2 className="font-bold text-gray-900">Portfolio</h2>
                            </div>

                            <ImageUploader
                                images={images}
                                onChange={setImages}
                                error={errors.images}
                            />
                        </section>

                        {/* Contact & Social */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Share2 className="h-5 w-5 text-primary" />
                                <h2 className="font-bold text-gray-900">Contact & Social</h2>
                            </div>

                            <div className="space-y-5">
                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="08012345678"
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                </div>

                                {/* Social Handles */}
                                <SocialInputs
                                    handles={socialHandles}
                                    onChange={setSocialHandles}
                                    instagramError={errors.instagram}
                                />
                            </div>
                        </section>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-base"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
