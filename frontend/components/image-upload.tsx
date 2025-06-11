"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { ImagePlus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
    value: (File | string)[]
    onChange: (files: (File | string)[]) => void
    maxFiles?: number
}

export function ImageUpload({ value = [], onChange, maxFiles = 5 }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [previewUrls, setPreviewUrls] = useState<string[]>([])

    // Create preview URLs and clean up
    useEffect(() => {
        const urls: string[] = []
        value.forEach(item => {
            if (typeof item === 'string') {
                urls.push(item)
            } else {
                urls.push(URL.createObjectURL(item))
            }
        })
        setPreviewUrls(urls)

        return () => {
            // Clean up object URLs
            urls.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url)
                }
            })
        }
    }, [value])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (value.length + acceptedFiles.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} images`)
            return
        }

        setIsUploading(true)
        try {
            onChange([...value, ...acceptedFiles])
        } finally {
            setIsUploading(false)
        }
    }, [value, onChange, maxFiles])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        multiple: true,
        maxFiles: maxFiles - value.length
    })

    const removeImage = (index: number) => {
        const newFiles = [...value]
        newFiles.splice(index, 1)
        onChange(newFiles)
    }

    return (
        <div className="space-y-4">
            {value.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {previewUrls.map((url, index) => (
                        <div key={url} className="relative aspect-video rounded-md overflow-hidden">
                            <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-6 w-6"
                                onClick={() => removeImage(index)}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                                <p className="text-xs text-white truncate">
                                    {typeof value[index] === 'string'
                                        ? 'Uploaded image'
                                        : (value[index] as File).name}
                                </p>
                                <p className="text-xs text-white">
                                    {typeof value[index] !== 'string'
                                        ? `${((value[index] as File).size / 1024).toFixed(1)} KB`
                                        : ''}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {value.length < maxFiles && (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/30"
                        }`}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center gap-2">
                        <ImagePlus className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium">
                            {isDragActive
                                ? "Drop the images here"
                                : "Drag & drop images here, or click to select"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {maxFiles - value.length} of {maxFiles} remaining
                        </p>
                        {isUploading && (
                            <p className="text-xs text-muted-foreground">Processing images...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}