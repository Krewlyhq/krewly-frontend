"use client"

import { useState } from "react"
import { X, Send, Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import { createInquiry, EVENT_TYPES, InquiryFormData, EventType } from "@/lib/inquiries"

interface InquiryModalProps {
    isOpen: boolean
    onClose: () => void
    vendorId: string
    vendorName: string
}

interface FormErrors {
    customerName?: string
    customerEmail?: string
    customerPhone?: string
    message?: string
}

// Nigerian phone number validation
function isValidNigerianPhone(phone: string): boolean {
    if (!phone) return true // Optional field
    const cleaned = phone.replace(/\s|-/g, '')
    return /^(0[7-9][0-1]\d{8}|\+234[7-9][0-1]\d{8})$/.test(cleaned)
}

// Email validation
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function InquiryModal({ isOpen, onClose, vendorId, vendorName }: InquiryModalProps) {
    const isMobile = useIsMobile()
    const { toast } = useToast()

    const [formData, setFormData] = useState<InquiryFormData>({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        eventType: undefined,
        eventDate: '',
        message: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Name is required'
        }

        if (!formData.customerEmail.trim()) {
            newErrors.customerEmail = 'Email is required'
        } else if (!isValidEmail(formData.customerEmail)) {
            newErrors.customerEmail = 'Invalid email address'
        }

        if (formData.customerPhone && !isValidNigerianPhone(formData.customerPhone)) {
            newErrors.customerPhone = 'Invalid Nigerian phone number (e.g., 08012345678)'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.trim().length < 20) {
            newErrors.message = 'Message must be at least 20 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800))

        try {
            createInquiry(vendorId, formData)

            toast({
                title: "Inquiry sent!",
                description: `${vendorName} will get back to you soon.`,
            })

            // Reset form and close
            setFormData({
                customerName: '',
                customerEmail: '',
                customerPhone: '',
                eventType: undefined,
                eventDate: '',
                message: '',
            })
            setErrors({})
            onClose()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send inquiry. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (field: keyof InquiryFormData, value: string | EventType | undefined) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0]

    const formContent = (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div className="space-y-1.5">
                <Label htmlFor="customerName">Your Name <span className="text-red-500">*</span></Label>
                <Input
                    id="customerName"
                    placeholder="Enter your full name"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    className={errors.customerName ? 'border-red-500' : ''}
                />
                {errors.customerName && (
                    <p className="text-xs text-red-500">{errors.customerName}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <Label htmlFor="customerEmail">Email <span className="text-red-500">*</span></Label>
                <Input
                    id="customerEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    className={errors.customerEmail ? 'border-red-500' : ''}
                />
                {errors.customerEmail && (
                    <p className="text-xs text-red-500">{errors.customerEmail}</p>
                )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
                <Label htmlFor="customerPhone">Phone Number <span className="text-gray-400">(optional)</span></Label>
                <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="08012345678"
                    value={formData.customerPhone || ''}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    className={errors.customerPhone ? 'border-red-500' : ''}
                />
                {errors.customerPhone && (
                    <p className="text-xs text-red-500">{errors.customerPhone}</p>
                )}
            </div>

            {/* Event Type & Date Row */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label>Event Type <span className="text-gray-400">(optional)</span></Label>
                    <Select
                        value={formData.eventType}
                        onValueChange={(value) => handleInputChange('eventType', value as EventType)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            {EVENT_TYPES.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="eventDate">Event Date <span className="text-gray-400">(optional)</span></Label>
                    <div className="relative">
                        <Input
                            id="eventDate"
                            type="date"
                            min={today}
                            value={formData.eventDate || ''}
                            onChange={(e) => handleInputChange('eventDate', e.target.value)}
                            className="pr-10"
                        />
                    </div>
                </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                <Textarea
                    id="message"
                    placeholder="Describe what you're looking for..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={errors.message ? 'border-red-500' : ''}
                />
                <div className="flex justify-between">
                    {errors.message ? (
                        <p className="text-xs text-red-500">{errors.message}</p>
                    ) : (
                        <p className="text-xs text-gray-400">Minimum 20 characters</p>
                    )}
                    <p className={`text-xs ${formData.message.length < 20 ? 'text-gray-400' : 'text-green-600'}`}>
                        {formData.message.length}/20
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Inquiry
                        </>
                    )}
                </Button>
            </div>
        </form>
    )

    // Mobile: Use Sheet
    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
                    <SheetHeader className="mb-4">
                        <SheetTitle>Send Inquiry to {vendorName}</SheetTitle>
                    </SheetHeader>
                    <div className="overflow-y-auto max-h-[calc(90vh-80px)] pb-4">
                        {formContent}
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    // Desktop: Use Dialog
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Send Inquiry to {vendorName}</DialogTitle>
                </DialogHeader>
                {formContent}
            </DialogContent>
        </Dialog>
    )
}
