/**
 * Vendor Module - Storage Utilities
 * 
 * Mock localStorage for vendor applications
 */

import type { VendorApplication, VendorApplicationStatus } from './types';

const APPLICATION_KEY = 'krewly_vendor_application';

/**
 * Save vendor application to localStorage
 */
export function saveApplication(application: VendorApplication): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(APPLICATION_KEY, JSON.stringify(application));
}

/**
 * Get vendor application from localStorage
 */
export function getApplication(): VendorApplication | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(APPLICATION_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored) as VendorApplication;
    } catch {
        return null;
    }
}

/**
 * Update application status (for mock approval/rejection)
 */
export function updateApplicationStatus(status: VendorApplicationStatus): void {
    const application = getApplication();
    if (!application) return;

    application.status = status;
    application.reviewedAt = new Date().toISOString();
    saveApplication(application);
}

/**
 * Clear application (for testing)
 */
export function clearApplication(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(APPLICATION_KEY);
}

/**
 * Check if user has pending application
 */
export function hasPendingApplication(): boolean {
    const application = getApplication();
    return application?.status === 'pending';
}

/**
 * Check if user has approved application
 */
export function hasApprovedApplication(): boolean {
    const application = getApplication();
    return application?.status === 'approved';
}
