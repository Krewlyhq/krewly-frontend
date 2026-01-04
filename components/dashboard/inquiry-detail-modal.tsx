"use client"

import { useState } from "react"
import { X, Mail, MessageCircle, CheckCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { useIsMobile } from "@/hooks/use-mobile"
import { Inquiry, updateInquiryStatus } from "@/lib/inquiries"

interface InquiryDetailModalProps {
    isOpen: boolean
    onClose: () => void
    inquiry: Inquiry | null
    onStatusUpdate: () => void
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-NG', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString('en-NG', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function InquiryDetailModal({ isOpen, onClose, inquiry, onStatusUpdate }: InquiryDetailModalProps) {
    const isMobile = useIsMobile()

    if (!inquiry) return null

    const handleMarkAsRead = () => {
        updateInquiryStatus(inquiry.id, 'read')
        onStatusUpdate()
    }

    const handleMarkAsReplied = () => {
        updateInquiryStatus(inquiry.id, 'replied')
        onStatusUpdate()
    }

    const handleEmailReply = () => {
        const subject = encodeURIComponent('Re: Your inquiry on Krewly')
        const body = encodeURIComponent(`Hi ${inquiry.customerName},\n\nThank you for your inquiry!\n\n`)
        window.open(`mailto:${inquiry.customerEmail}?subject=${subject}&body=${body}`, '_blank')
        handleMarkAsReplied()
    }

    const handleWhatsAppReply = () => {
        if (!inquiry.customerPhone) return
        const message = encodeURIComponent(`Hi ${inquiry.customerName}! Thank you for your inquiry on Krewly. `)
        window.open(`https://wa.me/234${inquiry.customerPhone.slice(1)}?text=${message}`, '_blank')
        handleMarkAsReplied()
    }

    const content = (
        <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
                <Badge variant={
                    inquiry.status === 'new' ? 'default' :
                        inquiry.status === 'read' ? 'secondary' : 'outline'
                } className={
                    inquiry.status === 'new' ? 'bg-blue-500' :
                        inquiry.status === 'replied' ? 'bg-green-500 text-white' : ''
                }>
                    {inquiry.status === 'new' ? 'New' :
                        inquiry.status === 'read' ? 'Read' : 'Replied'}
                </Badge>
                <span className="text-sm text-gray-500">
                    Received {formatDateTime(inquiry.createdAt)}
                </span>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Customer Information</h3>
                <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-medium">{inquiry.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <a href={`mailto:${inquiry.customerEmail}`} className="font-medium text-primary hover:underline">
                            {inquiry.customerEmail}
                        </a>
                    </div>
                    {inquiry.customerPhone && (
                        <div className="flex justify-between">
                            <span className="text-gray-500">Phone</span>
                            <a href={`tel:${inquiry.customerPhone}`} className="font-medium text-primary hover:underline">
                                {inquiry.customerPhone}
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Event Details */}
            {(inquiry.eventType || inquiry.eventDate) && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900">Event Details</h3>
                    <div className="grid gap-2 text-sm">
                        {inquiry.eventType && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Event Type</span>
                                <Badge variant="outline">{inquiry.eventType}</Badge>
                            </div>
                        )}
                        {inquiry.eventDate && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Event Date</span>
                                <span className="font-medium">{formatDate(inquiry.eventDate)}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Message */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-2">Message</h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-4">
                    {inquiry.message}
                </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                    <Button onClick={handleEmailReply} className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Reply via Email
                    </Button>
                    {inquiry.customerPhone && (
                        <Button onClick={handleWhatsAppReply} className="w-full bg-green-600 hover:bg-green-700">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            WhatsApp
                        </Button>
                    )}
                </div>

                <div className="flex gap-2">
                    {inquiry.status === 'new' && (
                        <Button variant="outline" onClick={handleMarkAsRead} className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            Mark as Read
                        </Button>
                    )}
                    {inquiry.status !== 'replied' && (
                        <Button variant="outline" onClick={handleMarkAsReplied} className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Replied
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
                    <SheetHeader className="mb-4">
                        <SheetTitle>Inquiry from {inquiry.customerName}</SheetTitle>
                    </SheetHeader>
                    <div className="overflow-y-auto max-h-[calc(90vh-80px)] pb-4">
                        {content}
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Inquiry from {inquiry.customerName}</DialogTitle>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}
