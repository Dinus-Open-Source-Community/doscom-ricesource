"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface ImageCropDialogProps {
    isOpen: boolean
    onClose: () => void
    image: string
    onCropComplete: (croppedImage: string) => void
}

interface CropArea {
    x: number
    y: number
    width: number
    height: number
}

export function ImageCropDialog({ isOpen, onClose, image, onCropComplete }: ImageCropDialogProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null)

    const onCropChange = (location: { x: number; y: number }) => {
        setCrop(location)
    }

    const onZoomChange = (value: number[]) => {
        setZoom(value[0])
    }

    const onCropCompleteHandler = useCallback((_: any, croppedAreaPixels: CropArea) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener("load", () => resolve(image))
            image.addEventListener("error", (error) => reject(error))
            image.crossOrigin = "anonymous"
            image.src = url
        })

    const getCroppedImg = async (imageSrc: string, pixelCrop: CropArea): Promise<string> => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
            throw new Error("No 2d context")
        }

        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        )

        return canvas.toDataURL("image/jpeg")
    }

    const handleSave = async () => {
        if (croppedAreaPixels) {
            try {
                const croppedImage = await getCroppedImg(image, croppedAreaPixels)
                onCropComplete(croppedImage)
                onClose()
            } catch (e) {
                console.error("Error getting cropped image:", e)
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Image</DialogTitle>
                </DialogHeader>
                {image && (
                    <div className="relative h-[300px] w-full mt-4">
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={onCropChange}
                            onCropComplete={onCropCompleteHandler}
                            onZoomChange={(value) => setZoom(value)}
                            cropShape="round"
                            showGrid={false}
                        />
                    </div>
                )}

                <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="zoom">Zoom</Label>
                            <span className="text-sm text-muted-foreground">{zoom.toFixed(1)}x</span>
                        </div>
                        <Slider
                            id="zoom"
                            min={1}
                            max={3}
                            step={0.1}
                            value={[zoom]}
                            onValueChange={onZoomChange}
                            className="w-full"
                        />
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Apply</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
