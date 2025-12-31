/**
 * Auth Module - API Client
 * 
 * API functions for authentication endpoints
 */

import type { AuthResponse, SignupData, LoginData, ResetPasswordData, User } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

class AuthApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'AuthApiError';
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
        throw new AuthApiError(
            response.status,
            data.message || 'An error occurred'
        );
    }

    return data.data || data;
}

/**
 * Signup a new user
 */
export async function signup(data: SignupData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return handleResponse<AuthResponse>(response);
}

/**
 * Login with email and password
 */
export async function login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return handleResponse<AuthResponse>(response);
}

/**
 * Logout current session
 */
export async function logout(refreshToken: string): Promise<void> {
    await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });
}

/**
 * Refresh access token
 */
export async function refreshToken(token: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token }),
    });

    return handleResponse<AuthResponse>(response);
}

/**
 * Get current user
 */
export async function getMe(accessToken: string): Promise<User> {
    const response = await fetch(`${API_BASE}/auth/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    return handleResponse<User>(response);
}

/**
 * Verify email with token
 */
export async function verifyEmail(token: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
    });

    return handleResponse<{ message: string }>(response);
}

/**
 * Request password reset email
 */
export async function forgotPassword(email: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    return handleResponse<{ message: string }>(response);
}

/**
 * Reset password with token
 */
export async function resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return handleResponse<{ message: string }>(response);
}

/**
 * Resend verification email
 */
export async function resendVerification(accessToken: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE}/auth/resend-verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    return handleResponse<{ message: string }>(response);
}

export { AuthApiError };
