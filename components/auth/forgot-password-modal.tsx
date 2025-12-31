"use client"

import { useState } from "react"
import { X, Mail, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { forgotPassword } from "@/lib/auth"
import { useAuthModal } from "@/lib/auth/modal-context"

export function ForgotPasswordModal() {
    const { activeModal, closeModal, openLogin } = useAuthModal()

    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    if (activeModal !== "forgot-password") return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            await forgotPassword(email)
            setIsSuccess(true)
        } catch (err: any) {
            setError(err.message || "Failed to send reset email. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setEmail("")
        setError("")
        setIsSuccess(false)
        closeModal()
    }

    const backToLogin = () => {
        setEmail("")
        setError("")
        setIsSuccess(false)
        openLogin()
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                {isSuccess ? (
                    /* Success State */
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                        <p className="text-gray-500 mb-6">
                            We've sent a password reset link to <span className="font-medium text-gray-700">{email}</span>
                        </p>
                        <Button
                            onClick={backToLogin}
                            className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold"
                        >
                            Back to Sign In
                        </Button>
                    </div>
                ) : (
                    /* Form State */
                    <>
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <img src="/Group.svg" alt="Krewly" className="h-12 w-12" />
                        </div>

                        <button
                            onClick={backToLogin}
                            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to login
                        </button>

                        <h2 className="text-2xl font-bold mb-2">Forgot password?</h2>
                        <p className="text-gray-500 mb-8">
                            No worries, we'll send you reset instructions.
                        </p>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold"
                            >
                                {isLoading ? "Sending..." : "Reset Password"}
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}
