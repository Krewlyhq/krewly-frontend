"use client"

import { AuthProvider } from "@/lib/auth"
import { AuthModalProvider } from "@/lib/auth/modal-context"
import { AuthModals } from "@/components/auth"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AuthModalProvider>
                {children}
                <AuthModals />
            </AuthModalProvider>
        </AuthProvider>
    )
}
