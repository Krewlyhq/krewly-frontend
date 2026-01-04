"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    ArrowLeft,
    Mail,
    Inbox,
    CheckCircle,
    Eye,
    Calendar,
    Copy,
    Check,
    Database
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import {
    Inquiry,
    getInquiriesByVendor,
    getNewInquiryCount,
    seedSampleInquiries,
    clearAllInquiries,
    updateInquiryStatus
} from "@/lib/inquiries"
import { InquiryDetailModal } from "@/components/dashboard/inquiry-detail-modal"

type FilterTab = 'all' | 'new' | 'read' | 'replied'

function getRelativeTime(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
}

function formatEventDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-NG', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export default function InquiriesPage() {
    const router = useRouter()
    const { user, isAuthenticated } = useAuth()
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [activeTab, setActiveTab] = useState<FilterTab>('all')
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    // Mock vendor ID (in production, this would come from user's vendor profile)
    const vendorId = "1"

    useEffect(() => {
        // Redirect non-vendors
        if (isAuthenticated && user?.role !== 'vendor' && user?.role !== 'admin') {
            router.push('/dashboard')
            return
        }
        loadInquiries()
    }, [isAuthenticated, user, router])

    const loadInquiries = () => {
        const data = getInquiriesByVendor(vendorId)
        setInquiries(data)
    }

    const filteredInquiries = inquiries.filter(inq => {
        if (activeTab === 'all') return true
        return inq.status === activeTab
    })

    const counts = {
        all: inquiries.length,
        new: inquiries.filter(i => i.status === 'new').length,
        read: inquiries.filter(i => i.status === 'read').length,
        replied: inquiries.filter(i => i.status === 'replied').length,
    }

    const handleInquiryClick = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry)
        setIsDetailOpen(true)

        // Auto-mark as read when opened
        if (inquiry.status === 'new') {
            updateInquiryStatus(inquiry.id, 'read')
            loadInquiries()
        }
    }

    const handleSeedData = () => {
        seedSampleInquiries(vendorId)
        loadInquiries()
    }

    const handleClearData = () => {
        clearAllInquiries()
        loadInquiries()
    }

    const handleCopyLink = async () => {
        const profileUrl = `${window.location.origin}/vendors/${vendorId}`
        await navigator.clipboard.writeText(profileUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Protect route
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p>Please log in to view this page.</p>
            </div>
        )
    }

    if (user?.role !== 'vendor' && user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Inbox className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h1 className="text-xl font-bold mb-2">Vendor Access Only</h1>
                    <p className="text-gray-500 mb-4">This page is only available to vendors.</p>
                    <Link href="/dashboard">
                        <Button>Go to Dashboard</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="font-bold text-lg">Inquiries</h1>
                            {counts.new > 0 && (
                                <p className="text-sm text-gray-500">{counts.new} new</p>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-8 py-6">
                <div className="max-w-3xl mx-auto">
                    {/* Dev Tools */}
                    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-amber-700 mb-2 font-medium">[DEV] Testing Tools</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={handleSeedData}>
                                <Database className="h-4 w-4 mr-1" />
                                Seed Sample Inquiries
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleClearData}>
                                Clear All
                            </Button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                        {(['all', 'new', 'read', 'replied'] as FilterTab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {counts[tab] > 0 && (
                                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab ? 'bg-white/20' : 'bg-gray-200'
                                        }`}>
                                        {counts[tab]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Inquiries List */}
                    {filteredInquiries.length > 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                            {filteredInquiries.map(inquiry => (
                                <div
                                    key={inquiry.id}
                                    onClick={() => handleInquiryClick(inquiry)}
                                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${inquiry.status === 'new' ? 'bg-blue-50/50' : ''
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900">
                                                {inquiry.customerName}
                                            </span>
                                            {inquiry.status === 'new' && (
                                                <Badge className="bg-blue-500 text-white text-xs">New</Badge>
                                            )}
                                            {inquiry.status === 'replied' && (
                                                <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Replied
                                                </Badge>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">
                                            {getRelativeTime(inquiry.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        {inquiry.eventType && (
                                            <Badge variant="secondary" className="text-xs">
                                                {inquiry.eventType}
                                            </Badge>
                                        )}
                                        {inquiry.eventDate && (
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatEventDate(inquiry.eventDate)}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {inquiry.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <Inbox className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                            <h3 className="font-semibold text-gray-900 mb-2">No inquiries yet</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Share your profile link to start receiving booking inquiries!
                            </p>
                            <Button onClick={handleCopyLink} variant="outline">
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 mr-2 text-green-600" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy Profile Link
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            {/* Inquiry Detail Modal */}
            <InquiryDetailModal
                isOpen={isDetailOpen}
                onClose={() => {
                    setIsDetailOpen(false)
                    setSelectedInquiry(null)
                }}
                inquiry={selectedInquiry}
                onStatusUpdate={loadInquiries}
            />
        </div>
    )
}
