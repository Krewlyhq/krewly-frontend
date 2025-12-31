/**
 * Auth Module - Storage Utilities
 * 
 * Token and user storage management
 */

const TOKEN_KEY = 'krewly_tokens';
const USER_KEY = 'krewly_user';

export interface StoredTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

/**
 * Save tokens to localStorage
 */
export function saveTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    if (typeof window === 'undefined') return;

    const tokens: StoredTokens = {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + expiresIn * 1000,
    };

    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

/**
 * Get tokens from localStorage
 */
export function getTokens(): StoredTokens | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored) as StoredTokens;
    } catch {
        return null;
    }
}

/**
 * Clear tokens from localStorage
 */
export function clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
}

/**
 * Check if access token is expired (with 30 second buffer)
 */
export function isTokenExpired(): boolean {
    const tokens = getTokens();
    if (!tokens) return true;

    return Date.now() > tokens.expiresAt - 30000;
}

/**
 * Save user to localStorage
 */
export function saveUser(user: object): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Get user from localStorage
 */
export function getStoredUser<T>(): T | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored) as T;
    } catch {
        return null;
    }
}

/**
 * Clear user from localStorage
 */
export function clearUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(USER_KEY);
}

/**
 * Clear all auth data
 */
export function clearAuth(): void {
    clearTokens();
    clearUser();
}
