"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ModalType = "login" | "signup" | "forgot-password" | null

interface AuthModalContextType {
    activeModal: ModalType
    openLogin: () => void
    openSignup: () => void
    openForgotPassword: () => void
    closeModal: () => void
}

const AuthModalContext = createContext<AuthModalContextType | null>(null)

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [activeModal, setActiveModal] = useState<ModalType>(null)

    return (
        <AuthModalContext.Provider
            value={{
                activeModal,
                openLogin: () => setActiveModal("login"),
                openSignup: () => setActiveModal("signup"),
                openForgotPassword: () => setActiveModal("forgot-password"),
                closeModal: () => setActiveModal(null),
            }}
        >
            {children}
        </AuthModalContext.Provider>
    )
}

export function useAuthModal() {
    const context = useContext(AuthModalContext)
    if (!context) {
        throw new Error("useAuthModal must be used within AuthModalProvider")
    }
    return context
}
