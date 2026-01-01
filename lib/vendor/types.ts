/**
 * Vendor Module - Types
 */

export const VENDOR_CATEGORIES = [
    'Makeup Artist',
    'Gele Stylist',
    'Hair Stylist',
    'Photographer',
    'Event Decorator',
    'Fashion Stylist/Tailor',
    'Other',
] as const;

export type VendorCategory = typeof VENDOR_CATEGORIES[number] | string;

export type VendorApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface SocialHandles {
    instagram: string; // Required
    tiktok?: string;
    twitter?: string;
}

export interface VendorApplication {
    id: string;
    userId: string;
    businessName: string;
    categories: VendorCategory[];
    state: string;
    city: string;
    availableForTravel: boolean;
    phoneNumber: string;
    portfolioImages: string[]; // Base64 strings
    socialHandles: SocialHandles;
    status: VendorApplicationStatus;
    submittedAt: string;
    reviewedAt?: string;
}
