"use client"

import { useCallback, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"

interface ImageUploaderProps {
    images: string[] // Base64 strings
    onChange: (images: string[]) => void
    error?: string
}

const MAX_IMAGES = 5
const MIN_IMAGES = 2
const MAX_SIZE_MB = 5
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function ImageUploader({ images, onChange, error }: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFiles = useCallback(async (files: FileList | null) => {
        if (!files) return

        const newImages: string[] = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i]

            // Check type
            if (!ACCEPTED_TYPES.includes(file.type)) {
                continue
            }

            // Check size (5MB)
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                continue
            }

            // Check max limit
            if (images.length + newImages.length >= MAX_IMAGES) {
                break
            }

            // Convert to base64
            const base64 = await fileToBase64(file)
            newImages.push(base64)
        }

        if (newImages.length > 0) {
            onChange([...images, ...newImages])
        }
    }, [images, onChange])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        handleFiles(e.dataTransfer.files)
    }, [handleFiles])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
    }, [])

    const removeImage = (index: number) => {
        onChange(images.filter((_, i) => i !== index))
    }

    const canAddMore = images.length < MAX_IMAGES

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    Portfolio Samples <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-gray-400">
                    {images.length}/{MAX_IMAGES} images (min {MIN_IMAGES})
                </span>
            </div>

            {/* Drop Zone */}
            {canAddMore && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => inputRef.current?.click()}
                    className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            hover:border-primary/50 hover:bg-primary/5
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'}
          `}
                >
                    <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-700">
                        Drag and drop images here
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        or click to browse • JPEG, PNG, WebP • Max 5MB each
                    </p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={(e) => handleFiles(e.target.files)}
                        className="hidden"
                    />
                </div>
            )}

            {/* Preview Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                        >
                            <img
                                src={src}
                                alt={`Portfolio ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    ))}

                    {/* Add More Button */}
                    {canAddMore && (
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-primary/50 hover:text-primary transition-all"
                        >
                            <ImageIcon className="h-5 w-5" />
                            <span className="text-xs">Add</span>
                        </button>
                    )}
                </div>
            )}

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    )
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}
