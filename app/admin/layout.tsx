"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { FileCheck2, Users, Settings, LogOut, LayoutDashboard } from "lucide-react"

const ADMIN_NAV_ITEMS = [
    { href: "/admin/applications", label: "Applications", icon: FileCheck2 },
    { href: "/admin/users", label: "Users", icon: Users, disabled: true },
    { href: "/admin/settings", label: "Settings", icon: Settings, disabled: true },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { user, isLoading, isAuthenticated } = useAuth()

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/")
                return
            }

            // Check for admin role
            if (user?.role !== 'admin') {
                router.push("/dashboard")
                return
            }
        }
    }, [isLoading, isAuthenticated, user, router])

    // Loading state
    if (isLoading || !isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full hidden md:flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                    <Link href="/admin" className="flex items-center gap-2">
                        <img src="/Group.svg" alt="Krewly" className="h-8 w-8" />
                        <span className="font-bold text-xl">Admin</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {ADMIN_NAV_ITEMS.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        const Icon = item.icon

                        if (item.disabled) {
                            return (
                                <div
                                    key={item.href}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 cursor-not-allowed"
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                    <span className="ml-auto text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                                </div>
                            )
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                                    ${isActive
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                                `}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="font-medium">User Dashboard</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                    <Link href="/admin" className="flex items-center gap-2">
                        <img src="/Group.svg" alt="Krewly" className="h-6 w-6" />
                        <span className="font-bold">Admin</span>
                    </Link>
                    <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
                        Exit Admin
                    </Link>
                </header>

                {/* Page Content */}
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
