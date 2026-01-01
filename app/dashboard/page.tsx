"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LogOut, User, Settings, Mail, CheckCircle, Briefcase, Clock, FileText } from "lucide-react"
import { getApplication, saveApplication, type VendorApplication } from "@/lib/vendor"

export default function DashboardPage() {
    const router = useRouter()
    const { user, isLoading, isAuthenticated, logout } = useAuth()
    const [application, setApplication] = useState<VendorApplication | null>(null)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }

        // Check for vendor application
        const app = getApplication()
        if (app) {
            setApplication(app)
        }
    }, [isLoading, isAuthenticated, router])

    const handleLogout = async () => {
        await logout()
        router.push("/")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) return null

    const isPendingVendor = application?.status === 'pending'

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/Group.svg" alt="Krewly" className="h-8 w-8" />
                        <span className="text-xl font-black uppercase tracking-tight">Krewly</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden md:block">
                            {user.firstName || user.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 md:px-8 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Welcome{user.firstName ? `, ${user.firstName}` : ""}!
                    </h1>
                    <p className="text-gray-500 mb-8">
                        {user.role === 'vendor' ? 'Manage your business profile' : 'Manage your Krewly account'}
                    </p>

                    {/* Pending Application Banner */}
                    {isPendingVendor && (
                        <div className="mb-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1">Application Pending</h3>
                                    <p className="text-gray-600 mb-4">
                                        Your application for <span className="font-medium">{application?.businessName}</span> is currently under review.
                                        We usually process applications within 24 hours.
                                    </p>

                                    {/* Application Summary */}
                                    <div className="bg-white rounded-xl p-4 border border-blue-100 mb-4 text-sm">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-500">Business Name</p>
                                                <p className="font-medium">{application?.businessName}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Category</p>
                                                <p className="font-medium">{application?.categories.join(", ")}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Location</p>
                                                <p className="font-medium">{application?.city}, {application?.state}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Submitted</p>
                                                <p className="font-medium">{new Date(application?.submittedAt || '').toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DEV: Simulate Approval Button */}
                                    <button
                                        onClick={() => {
                                            if (application) {
                                                // Update application
                                                application.status = 'approved';
                                                application.reviewedAt = new Date().toISOString();
                                                saveApplication(application);

                                                // Update user role in localStorage (mock)
                                                const storedUser = localStorage.getItem('krewly_user');
                                                if (storedUser) {
                                                    const u = JSON.parse(storedUser);
                                                    u.role = 'vendor';
                                                    localStorage.setItem('krewly_user', JSON.stringify(u));

                                                    // Force reload to pick up changes
                                                    window.location.reload();
                                                }
                                            }
                                        }}
                                        className="text-xs text-blue-500 hover:text-blue-700 underline font-medium"
                                    >
                                        [DEV] Simulate Approval
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Become a Vendor CTA (for Customers without pending apps) */}
                    {user.role === 'client' && !isPendingVendor && (
                        <div className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Become a Vendor</h3>
                                    <p className="text-gray-600">
                                        Join our network of top event professionals and grow your business today.
                                    </p>
                                </div>
                            </div>
                            <Link href="/become-vendor">
                                <Button className="whitespace-nowrap bg-black hover:bg-gray-800 text-white rounded-full px-6">
                                    Apply Now
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Account Info Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-gray-400" />
                            Account Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="font-medium flex items-center gap-2">
                                    {user.email}
                                    {user.emailVerified && (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    )}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">First Name</label>
                                    <p className="font-medium">{user.firstName || "-"}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Last Name</label>
                                    <p className="font-medium">{user.lastName || "-"}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Role</label>
                                <p className="font-medium capitalize flex items-center gap-2">
                                    {user.role}
                                    {user.role === 'vendor' && <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Pro</span>}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Settings className="h-5 w-5 text-gray-400" />
                            Quick Actions
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" className="rounded-full">
                                Edit Profile
                            </Button>
                            <Button variant="outline" className="rounded-full">
                                Change Password
                            </Button>
                            {user.role === 'vendor' && (
                                <Link href="/vendor/profile">
                                    <Button className="rounded-full bg-primary text-white">
                                        Manage Business Profile
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
