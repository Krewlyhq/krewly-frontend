/**
 * Vendor Module - Storage Utilities
 * 
 * Mock localStorage for vendor applications
 * Supports multiple applications for admin panel
 */

import type { VendorApplication, VendorApplicationStatus } from './types';

const APPLICATIONS_KEY = 'krewly_vendor_applications';
const CURRENT_USER_APP_KEY = 'krewly_current_user_application_id';

// ==================== Multiple Applications (Admin) ====================

/**
 * Get all vendor applications
 */
export function getAllApplications(): VendorApplication[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(APPLICATIONS_KEY);
    if (!stored) return [];

    try {
        return JSON.parse(stored) as VendorApplication[];
    } catch {
        return [];
    }
}

/**
 * Get application by ID
 */
export function getApplicationById(id: string): VendorApplication | null {
    const applications = getAllApplications();
    return applications.find(app => app.id === id) || null;
}

/**
 * Save all applications
 */
export function saveAllApplications(applications: VendorApplication[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}

/**
 * Add or update a single application
 */
export function saveApplication(application: VendorApplication): void {
    const applications = getAllApplications();
    const existingIndex = applications.findIndex(app => app.id === application.id);

    if (existingIndex >= 0) {
        applications[existingIndex] = application;
    } else {
        applications.push(application);
    }

    saveAllApplications(applications);

    // Track this as the current user's application
    if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_APP_KEY, application.id);
    }
}

/**
 * Update application status (Admin action)
 */
export function updateApplicationStatus(
    id: string,
    status: VendorApplicationStatus,
    rejectionReason?: string
): VendorApplication | null {
    const applications = getAllApplications();
    const index = applications.findIndex(app => app.id === id);

    if (index < 0) return null;

    applications[index].status = status;
    applications[index].reviewedAt = new Date().toISOString();

    if (status === 'rejected' && rejectionReason) {
        applications[index].rejectionReason = rejectionReason;
    }

    saveAllApplications(applications);
    return applications[index];
}

/**
 * Get applications by status
 */
export function getApplicationsByStatus(status: VendorApplicationStatus): VendorApplication[] {
    return getAllApplications().filter(app => app.status === status);
}

/**
 * Get application counts by status
 */
export function getApplicationCounts(): Record<VendorApplicationStatus | 'all', number> {
    const applications = getAllApplications();
    return {
        all: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        approved: applications.filter(app => app.status === 'approved').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
    };
}

// ==================== Current User Application ====================

/**
 * Get current user's application
 */
export function getApplication(): VendorApplication | null {
    if (typeof window === 'undefined') return null;

    const currentAppId = localStorage.getItem(CURRENT_USER_APP_KEY);
    if (!currentAppId) return null;

    return getApplicationById(currentAppId);
}

/**
 * Clear current user's application reference
 */
export function clearApplication(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CURRENT_USER_APP_KEY);
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

// ==================== Mock Data Seeding (Dev) ====================

const MOCK_BUSINESS_NAMES = [
    'Glam by Tolu',
    'Beauty Queens NG',
    'Temi Makeup Artistry',
    'ChiChi Gele House',
    'Lagos Hair Studio',
    'Snap Perfect Photos',
    'Event Decor Masters',
    'Fashion Forward Styles',
];

const MOCK_CATEGORIES = [
    ['Makeup Artist'],
    ['Gele Stylist'],
    ['Hair Stylist'],
    ['Photographer'],
    ['Event Decorator'],
    ['Fashion Stylist/Tailor'],
    ['Makeup Artist', 'Hair Stylist'],
    ['Photographer', 'Event Decorator'],
];

const MOCK_STATES = ['Lagos', 'Abuja', 'Rivers', 'Oyo', 'Kano'];
const MOCK_CITIES: Record<string, string[]> = {
    Lagos: ['Ikeja', 'Lekki', 'Victoria Island', 'Surulere'],
    Abuja: ['Wuse', 'Garki', 'Asokoro', 'Central Area'],
    Rivers: ['Port Harcourt', 'Obio-Akpor'],
    Oyo: ['Ibadan', 'Ogbomoso'],
    Kano: ['Kano Municipal', 'Nassarawa'],
};

/**
 * Seed mock applications for testing
 */
export function seedMockApplications(count: number = 5): void {
    const existingApps = getAllApplications();
    const newApps: VendorApplication[] = [];

    for (let i = 0; i < count; i++) {
        const state = MOCK_STATES[i % MOCK_STATES.length];
        const cities = MOCK_CITIES[state] || ['Unknown'];

        const app: VendorApplication = {
            id: `mock-app-${Date.now()}-${i}`,
            userId: `mock-user-${i}`,
            businessName: MOCK_BUSINESS_NAMES[i % MOCK_BUSINESS_NAMES.length],
            categories: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length],
            state,
            city: cities[i % cities.length],
            availableForTravel: i % 2 === 0,
            phoneNumber: `080${String(10000000 + i).slice(0, 8)}`,
            portfolioImages: [], // Empty for mock
            socialHandles: {
                instagram: `${MOCK_BUSINESS_NAMES[i % MOCK_BUSINESS_NAMES.length].toLowerCase().replace(/\s/g, '')}`,
                tiktok: i % 2 === 0 ? `tiktok_user_${i}` : undefined,
                twitter: i % 3 === 0 ? `twitter_user_${i}` : undefined,
            },
            status: 'pending',
            submittedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(), // Staggered dates
        };

        newApps.push(app);
    }

    saveAllApplications([...existingApps, ...newApps]);
}

/**
 * Clear all mock data
 */
export function clearAllApplications(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(APPLICATIONS_KEY);
    localStorage.removeItem(CURRENT_USER_APP_KEY);
}
