"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import {
    ArrowLeft,
    MapPin,
    Phone,
    Instagram,
    Globe,
    Check,
    X,
    Clock,
    CheckCircle2,
    XCircle,
    Plane,
    ExternalLink,
    AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    getApplicationById,
    updateApplicationStatus,
    type VendorApplication
} from "@/lib/vendor"

const STATUS_CONFIG = {
    pending: { label: 'Pending Review', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
}

interface PageParams {
    params: Promise<{ id: string }>
}

export default function ApplicationDetailPage({ params }: PageParams) {
    const { id } = use(params)
    const router = useRouter()
    const [application, setApplication] = useState<VendorApplication | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showApproveModal, setShowApproveModal] = useState(false)
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    useEffect(() => {
        const app = getApplicationById(id)
        setApplication(app)
        setIsLoading(false)
    }, [id])

    const handleApprove = async () => {
        if (!application) return
        setIsProcessing(true)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Update application status
        updateApplicationStatus(application.id, 'approved')

        // Update user role to vendor (mock)
        const storedUser = localStorage.getItem('krewly_user')
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser)
                if (user.id === application.userId) {
                    user.role = 'vendor'
                    localStorage.setItem('krewly_user', JSON.stringify(user))
                }
            } catch { }
        }

        setIsProcessing(false)
        setShowApproveModal(false)
        router.push('/admin/applications')
    }

    const handleReject = async () => {
        if (!application) return
        setIsProcessing(true)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Update application status
        updateApplicationStatus(application.id, 'rejected', rejectionReason || undefined)

        setIsProcessing(false)
        setShowRejectModal(false)
        router.push('/admin/applications')
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!application) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Application not found</h2>
                <p className="text-gray-500 mb-6">This application may have been deleted.</p>
                <Link href="/admin/applications">
                    <Button>Back to Applications</Button>
                </Link>
            </div>
        )
    }

    const statusConfig = STATUS_CONFIG[application.status]
    const StatusIcon = statusConfig.icon

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
                <Link href="/admin/applications" className="text-gray-500 hover:text-gray-900 flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Applications
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-medium">{application.businessName}</span>
            </nav>

            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{application.businessName}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {application.city}, {application.state}
                            </span>
                            {application.availableForTravel && (
                                <span className="flex items-center gap-1 text-primary">
                                    <Plane className="h-4 w-4" />
                                    Available for travel
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig.color}`}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="font-medium">{statusConfig.label}</span>
                    </div>
                </div>

                {/* Review Date */}
                {application.reviewedAt && (
                    <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                        {application.status === 'approved' ? 'Approved' : 'Rejected'} on {format(new Date(application.reviewedAt), 'MMMM d, yyyy')}
                        {application.rejectionReason && (
                            <p className="mt-1 text-red-600">Reason: {application.rejectionReason}</p>
                        )}
                    </div>
                )}

                {/* Actions (only for pending) */}
                {application.status === 'pending' && (
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                        <Button
                            onClick={() => setShowApproveModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                        </Button>
                        <Button
                            onClick={() => setShowRejectModal(true)}
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                        </Button>
                    </div>
                )}
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Categories */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {application.categories.map((cat) => (
                            <span key={cat} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <a href={`tel:${application.phoneNumber}`} className="text-gray-700 hover:text-primary">
                                {application.phoneNumber}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Instagram className="h-4 w-4 text-gray-400" />
                            <a
                                href={`https://instagram.com/${application.socialHandles.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-primary flex items-center gap-1"
                            >
                                @{application.socialHandles.instagram}
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                        {application.socialHandles.tiktok && (
                            <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4 text-gray-400" />
                                <a
                                    href={`https://tiktok.com/@${application.socialHandles.tiktok}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 hover:text-primary flex items-center gap-1"
                                >
                                    TikTok: @{application.socialHandles.tiktok}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        )}
                        {application.socialHandles.twitter && (
                            <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4 text-gray-400" />
                                <a
                                    href={`https://twitter.com/${application.socialHandles.twitter}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 hover:text-primary flex items-center gap-1"
                                >
                                    X/Twitter: @{application.socialHandles.twitter}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Portfolio Images */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Portfolio ({application.portfolioImages.length} images)</h3>
                {application.portfolioImages.length === 0 ? (
                    <p className="text-gray-500">No portfolio images uploaded</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {application.portfolioImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity"
                            >
                                <img
                                    src={img}
                                    alt={`Portfolio ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Submission Info */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
                <p>Application submitted on {format(new Date(application.submittedAt), 'MMMM d, yyyy \'at\' h:mm a')}</p>
                <p className="mt-1">User ID: {application.userId}</p>
            </div>

            {/* Image Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="h-8 w-8" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Portfolio"
                        className="max-w-full max-h-[90vh] rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Approve Modal */}
            {showApproveModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 text-green-600 mb-4">
                            <CheckCircle2 className="h-6 w-6" />
                            <h2 className="text-xl font-bold">Approve Application</h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Approve <strong>{application.businessName}</strong> as a vendor? Their account will be upgraded and they can start receiving bookings.
                        </p>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleApprove}
                                disabled={isProcessing}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                                {isProcessing ? 'Processing...' : 'Confirm Approval'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowApproveModal(false)}
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <div className="flex items-center gap-3 text-red-600 mb-4">
                            <AlertTriangle className="h-6 w-6" />
                            <h2 className="text-xl font-bold">Reject Application</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Reject <strong>{application.businessName}</strong>'s application? You can optionally provide a reason below.
                        </p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Reason for rejection (optional)"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none resize-none mb-6"
                            rows={3}
                        />
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleReject}
                                disabled={isProcessing}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                            >
                                {isProcessing ? 'Processing...' : 'Confirm Rejection'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowRejectModal(false)}
                                disabled={isProcessing}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
