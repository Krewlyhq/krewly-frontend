"use client"

/**
 * Auth Module - Context Provider
 * 
 * React context for authentication state management
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, AuthResponse, SignupData, LoginData } from './types';
import * as authApi from './api';
import * as storage from './storage';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (data: LoginData) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleAuthResponse = useCallback((response: AuthResponse) => {
        const { user, tokens } = response;
        storage.saveTokens(tokens.accessToken, tokens.refreshToken, tokens.expiresIn);
        storage.saveUser(user);
        setUser(user);
    }, []);

    const refreshAuth = useCallback(async () => {
        const tokens = storage.getTokens();
        if (!tokens?.refreshToken) {
            storage.clearAuth();
            setUser(null);
            return;
        }

        try {
            const response = await authApi.refreshToken(tokens.refreshToken);
            handleAuthResponse(response);
        } catch {
            storage.clearAuth();
            setUser(null);
        }
    }, [handleAuthResponse]);

    const login = useCallback(async (data: LoginData) => {
        const response = await authApi.login(data);
        handleAuthResponse(response);
    }, [handleAuthResponse]);

    const signup = useCallback(async (data: SignupData) => {
        const response = await authApi.signup(data);
        handleAuthResponse(response);
    }, [handleAuthResponse]);

    const logout = useCallback(async () => {
        const tokens = storage.getTokens();
        if (tokens?.refreshToken) {
            try {
                await authApi.logout(tokens.refreshToken);
            } catch {
                // Ignore logout errors
            }
        }
        storage.clearAuth();
        setUser(null);
    }, []);

    // Initialize auth state on mount
    useEffect(() => {
        const initAuth = async () => {
            const tokens = storage.getTokens();
            const storedUser = storage.getStoredUser<User>();

            if (!tokens) {
                setIsLoading(false);
                return;
            }

            // Check if token is expired
            if (storage.isTokenExpired()) {
                await refreshAuth();
            } else if (storedUser) {
                setUser(storedUser);
            }

            setIsLoading(false);
        };

        initAuth();
    }, [refreshAuth]);

    // Auto-refresh token before expiry
    useEffect(() => {
        if (!user) return;

        const tokens = storage.getTokens();
        if (!tokens) return;

        const timeUntilExpiry = tokens.expiresAt - Date.now() - 60000; // 1 minute before expiry
        if (timeUntilExpiry <= 0) return;

        const timer = setTimeout(() => {
            refreshAuth();
        }, timeUntilExpiry);

        return () => clearTimeout(timer);
    }, [user, refreshAuth]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                signup,
                logout,
                refreshAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
