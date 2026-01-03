"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Eye, Search, Clock, CheckCircle2, XCircle, Filter, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    getAllApplications,
    getApplicationCounts,
    seedMockApplications,
    clearAllApplications,
    type VendorApplication
} from "@/lib/vendor"

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected'

const STATUS_CONFIG = {
    pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', icon: Clock },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
}

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<VendorApplication[]>([])
    const [counts, setCounts] = useState<Record<FilterStatus, number>>({ all: 0, pending: 0, approved: 0, rejected: 0 })
    const [filter, setFilter] = useState<FilterStatus>('pending')
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const loadData = () => {
        const apps = getAllApplications()
        const appCounts = getApplicationCounts()
        setApplications(apps)
        setCounts(appCounts)
        setIsLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    // Filter and search
    const filteredApplications = applications
        .filter(app => filter === 'all' || app.status === filter)
        .filter(app =>
            searchQuery === '' ||
            app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.state.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

    const handleSeedData = () => {
        seedMockApplications(5)
        loadData()
    }

    const handleClearData = () => {
        if (confirm('Clear all applications? This cannot be undone.')) {
            clearAllApplications()
            loadData()
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Vendor Applications</h1>
                    <p className="text-gray-500 mt-1">Review and manage vendor applications</p>
                </div>

                {/* Dev Controls */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSeedData}
                        className="text-xs"
                    >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Seed Mock Data
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearData}
                        className="text-xs text-red-500 hover:text-red-600"
                    >
                        Clear All
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                {(['all', 'pending', 'approved', 'rejected'] as FilterStatus[]).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${filter === status
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }
                        `}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${filter === status ? 'bg-white/20' : 'bg-gray-200'
                            }`}>
                            {counts[status]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by business name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
            </div>

            {/* Applications Table */}
            {filteredApplications.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                        {counts.all === 0 ? 'No applications yet' : 'No matching applications'}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {counts.all === 0
                            ? 'Applications will appear here when vendors apply'
                            : filter === 'pending'
                                ? 'All caught up — no pending applications'
                                : 'Try adjusting your search or filter'
                        }
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Business</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredApplications.map((app) => {
                                    const statusConfig = STATUS_CONFIG[app.status]
                                    const StatusIcon = statusConfig.icon

                                    return (
                                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{app.businessName}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600 max-w-[200px] truncate">
                                                    {app.categories.join(', ')}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600">{app.city}, {app.state}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600">
                                                    {format(new Date(app.submittedAt), 'MMM d, yyyy')}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                    <StatusIcon className="h-3 w-3" />
                                                    {statusConfig.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/admin/applications/${app.id}`}>
                                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
