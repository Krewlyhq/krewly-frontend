"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Phone, Building2, MapPin, Camera, Share2, Check, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { CategoryPicker, LocationPicker, ImageUploader, SocialInputs } from "@/components/vendor"
import { Switch } from "@/components/ui/switch"
import {
    type VendorCategory,
    type SocialHandles,
    type VendorApplication,
    saveApplication,
    getApplication,
} from "@/lib/vendor"
import confetti from "canvas-confetti"

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

const STEPS = ['Business', 'Location', 'Portfolio', 'Contact']

export default function BecomeVendorPage() {
    const router = useRouter()
    const { user, isLoading: authLoading, isAuthenticated } = useAuth()

    // Check for existing application
    const [existingApplication, setExistingApplication] = useState<VendorApplication | null>(null)
    const [checkingApplication, setCheckingApplication] = useState(true)

    // UI state
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})

    // Form state
    const [businessName, setBusinessName] = useState("")
    const [categories, setCategories] = useState<VendorCategory[]>([])
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [availableForTravel, setAvailableForTravel] = useState(false)
    const [phone, setPhone] = useState("")
    const [images, setImages] = useState<string[]>([])
    const [socialHandles, setSocialHandles] = useState<SocialHandles>({ instagram: "" })

    // Check authentication and existing application
    useEffect(() => {
        if (!authLoading) {
            if (!isAuthenticated) {
                router.push("/")
                return
            }
            if (user?.role === 'vendor') {
                router.push("/dashboard")
                return
            }
            const app = getApplication()
            if (app) {
                setExistingApplication(app)
            }
            setCheckingApplication(false)
        }
    }, [authLoading, isAuthenticated, user, router])

    const validateStep = (stepIndex: number): boolean => {
        const newErrors: FormErrors = { ...errors } // Keep existing errors? Maybe clear relevant ones.
        // Actually better to clear errors for current step logic

        let isValid = true

        switch (stepIndex) {
            case 0: // Business
                if (!businessName.trim() || businessName.length < 2) {
                    newErrors.businessName = "Business name is required (min 2 characters)"
                    isValid = false
                } else {
                    delete newErrors.businessName
                }

                if (categories.length === 0) {
                    newErrors.categories = "Select at least one category"
                    isValid = false
                } else {
                    delete newErrors.categories
                }
                break

            case 1: // Location
                if (!state) {
                    newErrors.state = "State is required"
                    isValid = false
                } else {
                    delete newErrors.state
                }

                if (!city) {
                    newErrors.city = "City/LGA is required"
                    isValid = false
                } else {
                    delete newErrors.city
                }
                break

            case 2: // Portfolio
                if (images.length < 2) {
                    newErrors.images = "Upload at least 2 portfolio images"
                    isValid = false
                } else {
                    delete newErrors.images
                }
                break

            case 3: // Contact
                if (!phone.trim()) {
                    newErrors.phone = "Phone number is required"
                    isValid = false
                } else if (!PHONE_REGEX.test(phone.replace(/\s/g, ''))) {
                    newErrors.phone = "Enter a valid Nigerian phone number"
                    isValid = false
                } else {
                    delete newErrors.phone
                }

                if (!socialHandles.instagram.trim()) {
                    newErrors.instagram = "Instagram handle is required"
                    isValid = false
                } else {
                    delete newErrors.instagram
                }
                break
        }

        setErrors(newErrors)
        return isValid
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
        }
    }

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setCurrentStep(prev => Math.max(prev - 1, 0))
    }

    const handleSubmit = async () => {
        if (!validateStep(3)) return // Validate final step

        setIsSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 1000))

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

        // Trigger confetti
        const duration = 5 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        }, 250)
    }

    // Loading & Success states
    if (authLoading || checkingApplication) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--frozen-lake-50)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

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
                        <Button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Existing Application View (Read Only)
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

    // Main Wizard Form
    return (
        <div className="min-h-screen bg-[var(--frozen-lake-50)] px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 min-h-[600px] flex flex-col">
                    {/* Header Text */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Become a Vendor</h1>
                        <p className="text-gray-500">
                            Join our network of trusted beauty and event professionals
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8 px-2 md:px-8">
                        {STEPS.map((step, i) => (
                            <div key={step} className="flex flex-col items-center relative z-10 transition-colors duration-300">
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all duration-300
                                    ${i <= currentStep ? 'bg-primary text-white scale-110' : 'bg-gray-100 text-gray-400'}
                                `}>
                                    {i + 1}
                                </div>
                                <span className={`text-[10px] uppercase font-bold transition-colors duration-300 ${i <= currentStep ? 'text-primary' : 'text-gray-300'}`}>{step}</span>

                                {/* Connector Line */}
                                {i < STEPS.length - 1 && (
                                    <div className={`absolute top-4 left-1/2 w-[calc(100vw/5)] md:w-32 h-[2px] -z-10 transition-colors duration-300 ${i < currentStep ? 'bg-primary' : 'bg-gray-100'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                        {currentStep === 0 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Building2 className="h-5 w-5 text-primary" />
                                    <h2 className="font-bold text-xl text-gray-900">Business Information</h2>
                                </div>

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
                                        autoFocus
                                    />
                                    {errors.businessName && <p className="text-xs text-red-500">{errors.businessName}</p>}
                                </div>

                                <CategoryPicker
                                    selected={categories}
                                    onChange={setCategories}
                                    error={errors.categories}
                                />
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <h2 className="font-bold text-xl text-gray-900">Location</h2>
                                </div>

                                <LocationPicker
                                    state={state}
                                    city={city}
                                    onStateChange={setState}
                                    onCityChange={setCity}
                                    stateError={errors.state}
                                    cityError={errors.city}
                                />

                                {/* Rebuilt Travel Switch */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div>
                                        <p className="font-medium text-gray-900">Available for travel</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Can you travel to other cities for bookings?</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setAvailableForTravel(!availableForTravel)}
                                        className={`
                                            relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                                            ${availableForTravel ? 'bg-primary' : 'bg-gray-200'}
                                        `}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span
                                            aria-hidden="true"
                                            className={`
                                                pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                                ${availableForTravel ? 'translate-x-5' : 'translate-x-0'}
                                            `}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Camera className="h-5 w-5 text-primary" />
                                    <h2 className="font-bold text-xl text-gray-900">Portfolio</h2>
                                </div>
                                <p className="text-sm text-gray-500 mb-6">Upload your best work to show clients what you can do.</p>

                                <ImageUploader
                                    images={images}
                                    onChange={setImages}
                                    error={errors.images}
                                />
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Share2 className="h-5 w-5 text-primary" />
                                    <h2 className="font-bold text-xl text-gray-900">Contact & Social</h2>
                                </div>

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

                                <SocialInputs
                                    handles={socialHandles}
                                    onChange={setSocialHandles}
                                    instagramError={errors.instagram}
                                />
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 0 || isSubmitting}
                            className={`text-gray-500 hover:text-gray-900 ${currentStep === 0 ? 'invisible' : ''}`}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Back
                        </Button>

                        {currentStep === STEPS.length - 1 ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 rounded-full"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Submit Application
                                        <Check className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                className="bg-black hover:bg-gray-800 text-white font-bold px-8 rounded-full"
                            >
                                Next Step
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
