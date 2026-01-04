export type InquiryStatus = 'new' | 'read' | 'replied';

export type EventType =
    | 'Wedding'
    | 'Birthday'
    | 'Photoshoot'
    | 'Corporate Event'
    | 'Traditional Ceremony'
    | 'Other';

export const EVENT_TYPES: EventType[] = [
    'Wedding',
    'Birthday',
    'Photoshoot',
    'Corporate Event',
    'Traditional Ceremony',
    'Other',
];

export interface Inquiry {
    id: string;
    vendorId: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    eventType?: EventType;
    eventDate?: string; // ISO date string
    message: string;
    status: InquiryStatus;
    createdAt: string; // ISO date string
}

export interface InquiryFormData {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    eventType?: EventType;
    eventDate?: string;
    message: string;
}
