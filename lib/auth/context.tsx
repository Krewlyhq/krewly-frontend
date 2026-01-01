"use client"

/**
 * Auth Module - Context Provider (MOCKED)
 * 
 * Mock authentication for frontend development
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, SignupData, LoginData } from './types';
import * as storage from './storage';

// Mock user data
const MOCK_USER: User = {
    id: 'mock-user-123',
    email: 'demo@krewly.com',
    firstName: 'Demo',
    lastName: 'User',
    avatarUrl: null,
    phone: null,
    role: 'client',
    status: 'active',
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

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

    // Mock login - accepts any credentials
    const login = useCallback(async (data: LoginData) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser: User = {
            ...MOCK_USER,
            email: data.email,
        };

        storage.saveTokens('mock-access-token', 'mock-refresh-token', 3600);
        storage.saveUser(mockUser);
        setUser(mockUser);
    }, []);

    // Mock signup - accepts any data
    const signup = useCallback(async (data: SignupData) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser: User = {
            ...MOCK_USER,
            email: data.email,
            firstName: data.firstName || null,
            lastName: data.lastName || null,
            emailVerified: false, // New users start unverified
        };

        storage.saveTokens('mock-access-token', 'mock-refresh-token', 3600);
        storage.saveUser(mockUser);
        setUser(mockUser);
    }, []);

    // Mock logout
    const logout = useCallback(async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        storage.clearAuth();
        setUser(null);
    }, []);

    // Mock refresh - just restore from storage
    const refreshAuth = useCallback(async () => {
        const storedUser = storage.getStoredUser<User>();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Initialize auth state on mount
    useEffect(() => {
        const initAuth = async () => {
            const storedUser = storage.getStoredUser<User>();
            if (storedUser) {
                setUser(storedUser);
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

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
