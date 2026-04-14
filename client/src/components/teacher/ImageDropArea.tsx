import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'

interface ImageDropAreaProps {
  onChange?: (base64: string | undefined) => void
  initialUrl?: string | null
}

export function ImageDropArea({ onChange, initialUrl }: ImageDropAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null)
  const [fileName, setFileName] = useState(initialUrl ? 'Current image' : '')
  const [dragging, setDragging] = useState(false)

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setPreview(base64)
      onChange?.(base64)
    }
    reader.readAsDataURL(file)
  }

  function reset() {
    setPreview(null)
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
    onChange?.(undefined)
  }

  return (
    <div
      onClick={() => !preview && inputRef.current?.click()}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)
        handleFile(e.dataTransfer.files[0])
      }}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-10 transition-colors text-center',
        !preview && 'cursor-pointer',
        dragging && 'bg-blue-50 border-blue-400',
        preview ? 'p-4' : 'min-h-48'
      )}
    >
      {!preview ? (
        <>
          <div className="rounded-full bg-muted p-3">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Drop your image here</p>
          <p className="text-sm text-muted-foreground">
            or <span className="text-blue-500">browse files</span>
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF, WEBP up to 10MB
          </p>
        </>
      ) : (
        <>
          <img
            src={preview}
            className="max-h-60 w-full rounded-md object-contain"
          />
          <div className="flex w-full items-center justify-between border-t pt-2 mt-2">
            <span className="truncate text-xs text-muted-foreground max-w-[200px]">
              {fileName}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
                className="text-xs text-blue-500 hover:underline"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  reset()
                }}
                className="text-xs text-destructive hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0])
        }}
      />
    </div>
  )
}
