import { Inquiry, InquiryFormData, InquiryStatus } from './types';

const STORAGE_KEY = 'krewly_inquiries';

// Generate unique ID
function generateId(): string {
    return `inq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get all inquiries from localStorage
function getAllInquiries(): Inquiry[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Save all inquiries to localStorage
function saveAllInquiries(inquiries: Inquiry[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
}

// Get inquiries for a specific vendor
export function getInquiriesByVendor(vendorId: string): Inquiry[] {
    const all = getAllInquiries();
    return all
        .filter(inq => inq.vendorId === vendorId)
        .sort((a, b) => {
            // New inquiries first, then by date
            if (a.status === 'new' && b.status !== 'new') return -1;
            if (a.status !== 'new' && b.status === 'new') return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
}

// Create a new inquiry
export function createInquiry(vendorId: string, formData: InquiryFormData): Inquiry {
    const inquiry: Inquiry = {
        id: generateId(),
        vendorId,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        message: formData.message,
        status: 'new',
        createdAt: new Date().toISOString(),
    };

    const all = getAllInquiries();
    all.push(inquiry);
    saveAllInquiries(all);

    return inquiry;
}

// Update inquiry status
export function updateInquiryStatus(id: string, status: InquiryStatus): void {
    const all = getAllInquiries();
    const index = all.findIndex(inq => inq.id === id);
    if (index !== -1) {
        all[index].status = status;
        saveAllInquiries(all);
    }
}

// Get count of new inquiries for a vendor
export function getNewInquiryCount(vendorId: string): number {
    const vendorInquiries = getInquiriesByVendor(vendorId);
    return vendorInquiries.filter(inq => inq.status === 'new').length;
}

// Get inquiry by ID
export function getInquiryById(id: string): Inquiry | undefined {
    const all = getAllInquiries();
    return all.find(inq => inq.id === id);
}

// Clear all inquiries (for testing)
export function clearAllInquiries(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}

// Seed sample inquiries for testing
export function seedSampleInquiries(vendorId: string): void {
    const sampleInquiries: Inquiry[] = [
        {
            id: generateId(),
            vendorId,
            customerName: 'Chiamaka Obi',
            customerEmail: 'chiamaka.obi@email.com',
            customerPhone: '08012345678',
            eventType: 'Wedding',
            eventDate: '2025-03-15',
            message: 'Hi! I am getting married in March and looking for a professional makeup artist for my big day. I would love to discuss packages and availability. The wedding will be in Lagos, and I will need services for myself and 4 bridesmaids.',
            status: 'new',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        },
        {
            id: generateId(),
            vendorId,
            customerName: 'Adaeze Nwosu',
            customerEmail: 'adaeze.n@gmail.com',
            customerPhone: '08098765432',
            eventType: 'Birthday',
            eventDate: '2025-02-10',
            message: 'Hello! My daughter is turning 16 and I want her to feel special. Looking for a natural glam look for her birthday photoshoot. Please let me know your rates.',
            status: 'new',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        },
        {
            id: generateId(),
            vendorId,
            customerName: 'Folake Adeyemi',
            customerEmail: 'folake.adeyemi@company.ng',
            eventType: 'Corporate Event',
            eventDate: '2025-01-25',
            message: 'We are organizing a corporate dinner and need makeup services for 10 female executives. This is a formal event and we want elegant, professional looks. Can you provide a group discount?',
            status: 'read',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        },
        {
            id: generateId(),
            vendorId,
            customerName: 'Blessing Eze',
            customerEmail: 'blessing.eze@yahoo.com',
            customerPhone: '07011223344',
            eventType: 'Traditional Ceremony',
            eventDate: '2025-04-20',
            message: 'I need a makeup artist for my traditional wedding ceremony. I want a bold, cultural look that matches my coral beads and traditional attire. Please share your portfolio for Igbo traditional looks.',
            status: 'replied',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        },
        {
            id: generateId(),
            vendorId,
            customerName: 'Amina Ibrahim',
            customerEmail: 'amina.ibrahim@email.com',
            eventType: 'Photoshoot',
            message: 'I am a model looking for a makeup artist for an upcoming editorial shoot. The concept is futuristic glam. Are you available for creative collaborations? I can share the mood board if you are interested.',
            status: 'new',
            createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        },
    ];

    const all = getAllInquiries();
    // Remove existing sample inquiries for this vendor to avoid duplicates
    const filtered = all.filter(inq => inq.vendorId !== vendorId);
    saveAllInquiries([...filtered, ...sampleInquiries]);
}

// Get inquiries by status
export function getInquiriesByStatus(vendorId: string, status: InquiryStatus): Inquiry[] {
    return getInquiriesByVendor(vendorId).filter(inq => inq.status === status);
}
