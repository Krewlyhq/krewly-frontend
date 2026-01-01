"use client"

import { Instagram } from "lucide-react"
import type { SocialHandles } from "@/lib/vendor"

interface SocialInputsProps {
    handles: SocialHandles
    onChange: (handles: SocialHandles) => void
    instagramError?: string
}

export function SocialInputs({ handles, onChange, instagramError }: SocialInputsProps) {
    const updateHandle = (key: keyof SocialHandles, value: string) => {
        // Strip @ symbol if present
        const cleanValue = value.startsWith('@') ? value.slice(1) : value
        onChange({ ...handles, [key]: cleanValue })
    }

    return (
        <div className="space-y-4">
            {/* Instagram (Required) */}
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                    Instagram <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-400">
                        <Instagram className="h-4 w-4" />
                        <span className="text-sm">@</span>
                    </div>
                    <input
                        type="text"
                        value={handles.instagram}
                        onChange={(e) => updateHandle('instagram', e.target.value)}
                        placeholder="username"
                        className={`
              w-full pl-14 pr-4 py-3 border rounded-xl
              focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all
              ${instagramError ? 'border-red-300' : 'border-gray-200'}
            `}
                    />
                </div>
                {instagramError && <p className="text-xs text-red-500">{instagramError}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* TikTok (Optional) */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                        TikTok <span className="text-xs text-gray-400">(optional)</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-400">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                            <span className="text-sm">@</span>
                        </div>
                        <input
                            type="text"
                            value={handles.tiktok || ''}
                            onChange={(e) => updateHandle('tiktok', e.target.value)}
                            placeholder="username"
                            className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Twitter/X (Optional) */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">
                        Twitter/X <span className="text-xs text-gray-400">(optional)</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-400">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span className="text-sm">@</span>
                        </div>
                        <input
                            type="text"
                            value={handles.twitter || ''}
                            onChange={(e) => updateHandle('twitter', e.target.value)}
                            placeholder="username"
                            className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
