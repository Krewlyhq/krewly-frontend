"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LogOut, User, Settings, Mail, CheckCircle } from "lucide-react"

export default function DashboardPage() {
    const router = useRouter()
    const { user, isLoading, isAuthenticated, logout } = useAuth()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
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
                <div className="max-w-4xl">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Welcome{user.firstName ? `, ${user.firstName}` : ""}!
                    </h1>
                    <p className="text-gray-500 mb-8">Manage your Krewly account</p>

                    {/* Email Verification Banner */}
                    {!user.emailVerified && (
                        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                            <Mail className="h-5 w-5 text-amber-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-amber-800">Verify your email</p>
                                <p className="text-sm text-amber-700">
                                    Please check your inbox and verify your email to access all features.
                                </p>
                            </div>
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
                                <p className="font-medium capitalize">{user.role}</p>
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
                                <Button className="rounded-full bg-primary text-white">
                                    Manage Services
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
