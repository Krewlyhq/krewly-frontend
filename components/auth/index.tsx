"use client"

import { LoginModal } from "./login-modal"
import { SignupModal } from "./signup-modal"
import { ForgotPasswordModal } from "./forgot-password-modal"

export function AuthModals() {
    return (
        <>
            <LoginModal />
            <SignupModal />
            <ForgotPasswordModal />
        </>
    )
}

export { LoginModal } from "./login-modal"
export { SignupModal } from "./signup-modal"
export { ForgotPasswordModal } from "./forgot-password-modal"
