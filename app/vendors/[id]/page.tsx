"use client"

import { use, useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    MapPin,
    Phone,
    Star,
    Share2,
    Heart,
    Instagram,
    Globe,
    Plane,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    X,
    Package,
    Clock,
    Check
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Package type
interface VendorPackage {
    id: string
    name: string
    description: string
    price: number
    features: string[]
    popular?: boolean
}

// Review type
interface Review {
    id: string
    author: string
    avatar: string
    rating: number
    date: string
    comment: string
    service: string
}

// Mock vendor data
const MOCK_VENDORS: Record<string, {
    id: string
    name: string
    category: string
    location: string
    state: string
    city: string
    rating: number
    reviews: number
    badge: string
    bio: string
    availableForTravel: boolean
    priceRange: { min: number; max: number }
    phone: string
    socialHandles: { instagram: string; tiktok?: string; twitter?: string }
    images: string[]
    packages: VendorPackage[]
    customerReviews: Review[]
}> = {
    "1": {
        id: "1",
        name: "Glam by Tolu",
        category: "Makeup Artist",
        location: "Lekki, Lagos",
        state: "Lagos",
        city: "Lekki",
        rating: 4.9,
        reviews: 48,
        badge: "Top Rated",
        bio: "Professional makeup artist with 8+ years of experience specializing in bridal and editorial looks. I bring out the best in every face, creating stunning transformations for your special day.",
        availableForTravel: true,
        priceRange: { min: 50000, max: 150000 },
        phone: "08012345678",
        socialHandles: { instagram: "glambytolu", tiktok: "glambytolu", twitter: "glambytolu" },
        images: [
            "/Krewly web photos/IMG_2397.JPG",
            "/Krewly web photos/IMG_2398.JPG",
            "/Krewly web photos/IMG_2399.JPG",
            "/Krewly web photos/IMG_2400.JPG",
            "/Krewly web photos/IMG_2401.JPG",
        ],
        packages: [
            {
                id: "p1",
                name: "Party Glam",
                description: "Perfect for birthdays, dinners, and casual events",
                price: 50000,
                features: ["Full face makeup", "Lashes included", "Touch-up kit", "1-2 hour session"],
            },
            {
                id: "p2",
                name: "Bridal Package",
                description: "Complete bridal look for your special day",
                price: 150000,
                features: ["Pre-wedding trial", "Bridal makeup", "Touch-ups all day", "Lashes & accessories", "Bridesmaids discount"],
                popular: true,
            },
            {
                id: "p3",
                name: "Editorial/Photoshoot",
                description: "High-fashion looks for professional shoots",
                price: 80000,
                features: ["Creative direction", "Multiple looks", "HD camera-ready finish", "3-4 hour session"],
            },
            {
                id: "p4",
                name: "Makeup Masterclass",
                description: "Learn professional techniques 1-on-1",
                price: 100000,
                features: ["Personalized curriculum", "Product recommendations", "Practice session", "Certificate of completion"],
            },
        ],
        customerReviews: [
            {
                id: "r1",
                author: "Chidinma O.",
                avatar: "/Krewly web photos/IMG_2402.JPG",
                rating: 5,
                date: "2025-12-15",
                comment: "Tolu did an amazing job for my traditional wedding! The makeup lasted all day and I received so many compliments. Highly recommend!",
                service: "Bridal Package"
            },
            {
                id: "r2",
                author: "Aisha M.",
                avatar: "/Krewly web photos/IMG_2403.JPG",
                rating: 5,
                date: "2025-11-28",
                comment: "Best makeup artist in Lagos! She understood exactly what I wanted and delivered. Will definitely book again.",
                service: "Party Glam"
            },
            {
                id: "r3",
                author: "Blessing A.",
                avatar: "/Krewly web photos/IMG_2404.JPG",
                rating: 4,
                date: "2025-11-10",
                comment: "Great experience overall. The makeup was beautiful and she was very professional. Arrived on time and very friendly.",
                service: "Editorial/Photoshoot"
            },
        ],
    },
    "2": {
        id: "2",
        name: "Damola Photography",
        category: "Photographer",
        location: "Ikeja, Lagos",
        state: "Lagos",
        city: "Ikeja",
        rating: 5.0,
        reviews: 127,
        badge: "Top Rated",
        bio: "Award-winning photographer capturing life's beautiful moments. Specializing in weddings, portraits, and corporate events.",
        availableForTravel: true,
        priceRange: { min: 100000, max: 500000 },
        phone: "08087654321",
        socialHandles: { instagram: "damolaphotography", twitter: "damolaphoto" },
        images: [
            "/Krewly web photos/IMG_2400.JPG",
            "/Krewly web photos/IMG_2401.JPG",
            "/Krewly web photos/IMG_2402.JPG",
            "/Krewly web photos/IMG_2403.JPG",
        ],
        packages: [
            {
                id: "p1",
                name: "Portrait Session",
                description: "Professional headshots and portraits",
                price: 100000,
                features: ["1-hour session", "2 outfit changes", "10 edited photos", "Online gallery"],
            },
            {
                id: "p2",
                name: "Engagement Shoot",
                description: "Pre-wedding couple photography",
                price: 150000,
                features: ["2-hour session", "Multiple locations", "30 edited photos", "Prints included"],
            },
            {
                id: "p3",
                name: "Wedding Full Day",
                description: "Complete wedding coverage",
                price: 500000,
                features: ["8+ hours coverage", "Second photographer", "200+ edited photos", "Photo album", "Drone shots"],
                popular: true,
            },
        ],
        customerReviews: [
            {
                id: "r1",
                author: "Tunde & Sade",
                avatar: "/Krewly web photos/IMG_2405.JPG",
                rating: 5,
                date: "2025-12-20",
                comment: "Damola captured our wedding perfectly! Every shot was magical. Worth every naira!",
                service: "Wedding Full Day"
            },
        ],
    },
    "3": {
        id: "3",
        name: "Iya Gele",
        category: "Gele Stylist",
        location: "Ibadan, Oyo",
        state: "Oyo",
        city: "Ibadan",
        rating: 4.8,
        reviews: 89,
        badge: "",
        bio: "Master gele artist creating stunning headwraps for every occasion. From traditional aso-oke to modern styles.",
        availableForTravel: false,
        priceRange: { min: 15000, max: 40000 },
        phone: "08098765432",
        socialHandles: { instagram: "iyagele_official" },
        images: [
            "/Krewly web photos/IMG_2398.JPG",
            "/Krewly web photos/IMG_2399.JPG",
            "/Krewly web photos/IMG_2400.JPG",
        ],
        packages: [
            {
                id: "p1",
                name: "Classic Gele",
                description: "Simple elegant styles for any event",
                price: 15000,
                features: ["30-min session", "Classic style", "Secure fit guaranteed"],
            },
            {
                id: "p2",
                name: "Bridal Gele",
                description: "Elaborate designs for brides",
                price: 40000,
                features: ["Custom design", "Aso-oke included", "Pre-wedding trial", "All-day durability"],
                popular: true,
            },
            {
                id: "p3",
                name: "Turban Style",
                description: "Modern turban-inspired wraps",
                price: 20000,
                features: ["Contemporary look", "Multiple variations", "Quick styling"],
            },
        ],
        customerReviews: [
            {
                id: "r1",
                author: "Funke B.",
                avatar: "/Krewly web photos/IMG_2406.JPG",
                rating: 5,
                date: "2025-11-30",
                comment: "My gele was the talk of the party! Iya Gele is truly a master at her craft.",
                service: "Classic Gele"
            },
            {
                id: "r2",
                author: "Kemi A.",
                avatar: "/Krewly web photos/IMG_2397.JPG",
                rating: 5,
                date: "2025-10-15",
                comment: "Used her for my wedding and the gele was absolutely stunning! Everyone kept asking who did it.",
                service: "Bridal Gele"
            },
        ],
    },
    "4": {
        id: "4",
        name: "Adunni Decor",
        category: "Event Decorator",
        location: "Victoria Island, Lagos",
        state: "Lagos",
        city: "Victoria Island",
        rating: 5.0,
        reviews: 34,
        badge: "Top Rated",
        bio: "Transforming venues into magical spaces. We specialize in luxury event decor.",
        availableForTravel: true,
        priceRange: { min: 200000, max: 2000000 },
        phone: "08011223344",
        socialHandles: { instagram: "adunnidecor", tiktok: "adunnidecor" },
        images: [
            "/Krewly web photos/IMG_2402.JPG",
            "/Krewly web photos/IMG_2403.JPG",
            "/Krewly web photos/IMG_2404.JPG",
            "/Krewly web photos/IMG_2405.JPG",
        ],
        packages: [
            {
                id: "p1",
                name: "Birthday Setup",
                description: "Beautiful birthday party decor",
                price: 200000,
                features: ["Balloon arrangements", "Table setup", "Photo backdrop", "Custom colors"],
            },
            {
                id: "p2",
                name: "Wedding Standard",
                description: "Elegant wedding decoration",
                price: 500000,
                features: ["Reception decor", "Ceremony setup", "Entrance styling", "Centerpieces included"],
            },
            {
                id: "p3",
                name: "Wedding Premium",
                description: "Luxury full venue transformation",
                price: 2000000,
                features: ["Complete venue makeover", "Custom installations", "Lighting design", "Floral arrangements", "VIP setup"],
                popular: true,
            },
        ],
        customerReviews: [],
    },
    "5": {
        id: "5",
        name: "Crown Braids & Styles",
        category: "Hair Stylist",
        location: "Ikeja, Lagos",
        state: "Lagos",
        city: "Ikeja",
        rating: 4.7,
        reviews: 62,
        badge: "",
        bio: "Your go-to destination for stunning braids and protective styles.",
        availableForTravel: false,
        priceRange: { min: 10000, max: 80000 },
        phone: "08055667788",
        socialHandles: { instagram: "crownbraids_ng" },
        images: [
            "/Krewly web photos/IMG_2399.JPG",
            "/Krewly web photos/IMG_2400.JPG",
            "/Krewly web photos/IMG_2401.JPG",
        ],
        packages: [
            {
                id: "p1",
                name: "Cornrows",
                description: "Classic cornrow styles",
                price: 15000,
                features: ["2-3 hours", "Various patterns", "Scalp-friendly"],
            },
            {
                id: "p2",
                name: "Box Braids",
                description: "Medium to large box braids",
                price: 25000,
                features: ["4-6 hours", "Quality extensions", "Neat partings"],
            },
            {
                id: "p3",
                name: "Knotless Braids",
                description: "Pain-free, natural-looking braids",
                price: 35000,
                features: ["5-7 hours", "No tension", "Lightweight finish"],
                popular: true,
            },
            {
                id: "p4",
                name: "Goddess Locs",
                description: "Bohemian goddess loc style",
                price: 80000,
                features: ["6-8 hours", "Premium hair", "Customizable length"],
            },
        ],
        customerReviews: [
            {
                id: "r1",
                author: "Sandra E.",
                avatar: "/Krewly web photos/IMG_2398.JPG",
                rating: 5,
                date: "2025-12-01",
                comment: "Best braider in Lagos! My knotless braids were perfect and lasted for weeks.",
                service: "Knotless Braids"
            },
        ],
    },
    "6": {
        id: "6",
        name: "NaijaStitch Tailors",
        category: "Fashion Stylist/Tailor",
        location: "Wuse, Abuja",
        state: "Abuja",
        city: "Wuse",
        rating: 4.9,
        reviews: 41,
        badge: "Top Rated",
        bio: "Bespoke tailoring at its finest. Custom outfits that fit perfectly.",
        availableForTravel: false,
        priceRange: { min: 30000, max: 200000 },
        phone: "08099887766",
        socialHandles: { instagram: "naijastitch", twitter: "naijastitch" },
        images: [
            "/Krewly web photos/IMG_2401.JPG",
            "/Krewly web photos/IMG_2402.JPG",
            "/Krewly web photos/IMG_2403.JPG",
        ],
        packages: [
            {
                id: "p1",
                name: "Native Shirt & Trouser",
                description: "Classic senator or casual native",
                price: 50000,
                features: ["Quality fabric sourcing", "Perfect fit guarantee", "7-day delivery"],
            },
            {
                id: "p2",
                name: "Kaftan",
                description: "Elegant kaftan with embroidery",
                price: 80000,
                features: ["Custom embroidery", "Premium fabric", "10-day delivery"],
            },
            {
                id: "p3",
                name: "Agbada Full Set",
                description: "Complete agbada with cap",
                price: 150000,
                features: ["3-piece set", "Custom design", "Cap included", "14-day delivery"],
                popular: true,
            },
        ],
        customerReviews: [],
    },
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price)
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })
}

interface PageParams {
    params: Promise<{ id: string }>
}

export default function VendorDetailPage({ params }: PageParams) {
    const { id } = use(params)
    const vendor = MOCK_VENDORS[id]

    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    if (!vendor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Vendor not found</h1>
                    <p className="text-gray-500 mb-4">This vendor profile doesn't exist</p>
                    <Link href="/vendors">
                        <Button>Browse Vendors</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const handlePrevImage = () => {
        setSelectedImageIndex(prev => prev === 0 ? vendor.images.length - 1 : prev - 1)
    }

    const handleNextImage = () => {
        setSelectedImageIndex(prev => prev === vendor.images.length - 1 ? 0 : prev + 1)
    }

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: vendor.name,
                text: `Check out ${vendor.name} on Krewly!`,
                url: window.location.href,
            })
        } else {
            await navigator.clipboard.writeText(window.location.href)
            alert('Link copied to clipboard!')
        }
    }

    const handleWhatsApp = () => {
        const message = encodeURIComponent(`Hi! I found you on Krewly and I'm interested in your services.`)
        window.open(`https://wa.me/234${vendor.phone.slice(1)}?text=${message}`, '_blank')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="container mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
                    <Link href="/vendors" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="hidden md:inline">Back</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSaved(!isSaved)}
                            className={`p-2 rounded-full transition-colors ${isSaved ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Share2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 md:px-8 py-6">
                <div className="max-w-5xl mx-auto">

                    {/* Top Section: Images + Quick Info */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Gallery */}
                        <div>
                            <div
                                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer mb-3"
                                onClick={() => setIsLightboxOpen(true)}
                            >
                                <img
                                    src={vendor.images[selectedImageIndex]}
                                    alt={vendor.name}
                                    className="w-full h-full object-cover"
                                />
                                {vendor.badge && (
                                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                                        {vendor.badge}
                                    </span>
                                )}
                                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                    {selectedImageIndex + 1} / {vendor.images.length}
                                </div>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {vendor.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === selectedImageIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Info + Contact */}
                        <div className="flex flex-col">
                            {/* Contact Card - Now at top */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Starting from</p>
                                        <p className="text-2xl font-bold text-gray-900">{formatPrice(vendor.priceRange.min)}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                        <span className="font-bold text-lg">{vendor.rating.toFixed(1)}</span>
                                        <span className="text-gray-400 text-sm">({vendor.reviews})</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleWhatsApp}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                                    >
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        WhatsApp
                                    </Button>
                                    <a href={`tel:${vendor.phone}`} className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            <Phone className="h-4 w-4 mr-2" />
                                            Call
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            {/* Vendor Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-medium text-primary">{vendor.category}</span>
                                    {vendor.availableForTravel && (
                                        <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                            <Plane className="h-3 w-3" />
                                            Travels
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{vendor.name}</h1>
                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                    <MapPin className="h-4 w-4" />
                                    {vendor.location}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{vendor.bio}</p>

                                {/* Social Links */}
                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href={`https://instagram.com/${vendor.socialHandles.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium"
                                    >
                                        <Instagram className="h-3.5 w-3.5" />
                                        @{vendor.socialHandles.instagram}
                                    </a>
                                    {vendor.socialHandles.tiktok && (
                                        <a
                                            href={`https://tiktok.com/@${vendor.socialHandles.tiktok}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-full text-xs font-medium"
                                        >
                                            <Globe className="h-3.5 w-3.5" />
                                            TikTok
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Packages Section */}
                    <section className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Package className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-bold">Packages</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {vendor.packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className={`bg-white rounded-xl border-2 p-5 relative transition-all hover:shadow-md flex flex-col h-full ${pkg.popular ? 'border-primary' : 'border-gray-200'
                                        }`}
                                >
                                    {pkg.popular && (
                                        <span className="absolute -top-3 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    )}
                                    <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{pkg.description}</p>
                                    <p className="text-2xl font-bold text-primary mb-4">{formatPrice(pkg.price)}</p>
                                    <ul className="space-y-2 flex-1">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        onClick={handleWhatsApp}
                                        variant={pkg.popular ? "default" : "outline"}
                                        className={`w-full mt-4 ${pkg.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            ))}

                            {/* Custom Package Card */}
                            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-5 flex flex-col h-full items-center justify-center text-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                                    <Package className="h-6 w-6 text-gray-500" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">Custom Package</h3>
                                <p className="text-sm text-gray-500 mb-4">Need something different? Let's discuss your specific requirements.</p>
                                <Button
                                    onClick={handleWhatsApp}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Request Quote
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                <h2 className="text-xl font-bold">Reviews</h2>
                                <span className="text-gray-500">({vendor.customerReviews.length})</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-2xl font-bold">{vendor.rating.toFixed(1)}</span>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            className={`h-4 w-4 ${star <= Math.round(vendor.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {vendor.customerReviews.length > 0 ? (
                            <div className="space-y-4">
                                {vendor.customerReviews.map((review) => (
                                    <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-5">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                                <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                                                    <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <Star
                                                                key={star}
                                                                className={`h-3 w-3 ${star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-primary font-medium">{review.service}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                                <Star className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-1">No reviews yet</h3>
                                <p className="text-sm text-gray-500">Be the first to review {vendor.name}!</p>
                            </div>
                        )}
                    </section>

                </div>
            </main>

            {/* Lightbox */}
            {isLightboxOpen && (
                <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <X className="h-8 w-8" />
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"
                        onClick={handlePrevImage}
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>

                    <img
                        src={vendor.images[selectedImageIndex]}
                        alt={vendor.name}
                        className="max-w-full max-h-[90vh] object-contain"
                    />

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full"
                        onClick={handleNextImage}
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                        {selectedImageIndex + 1} / {vendor.images.length}
                    </div>
                </div>
            )}
        </div>
    )
}
