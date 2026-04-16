import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5'

type ImageGalleryModalProps = {
  images: { title: string; path: string }[]
  initialIndex: number
  projectName: string
  onClose: () => void
}

const ImageGalleryModal = ({
  images,
  initialIndex,
  projectName,
  onClose,
}: ImageGalleryModalProps) => {
  const [index, setIndex] = useState(initialIndex)
  const { t } = useTranslation('home')
  const currentImage = images[index]
  const hasMultipleImages = images.length > 1

  const isFirst = index === 0
  const isLast = index === images.length - 1

  const handlePrev = useCallback(() => {
    setIndex((value) => Math.max(0, value - 1))
  }, [])

  const handleNext = useCallback(() => {
    setIndex((value) => Math.min(images.length - 1, value + 1))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft' && hasMultipleImages && !isFirst) {
        handlePrev()
      } else if (event.key === 'ArrowRight' && hasMultipleImages && !isLast) {
        handleNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, hasMultipleImages, isFirst, isLast, handlePrev, handleNext])

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} image gallery`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t('closeGallery')}
        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <IoClose className="text-2xl" />
      </button>

      {hasMultipleImages && !isFirst && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label={t('previousImage')}
          className="absolute left-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        >
          <IoChevronBack className="text-2xl" />
        </button>
      )}

      <div className="flex max-h-[85vh] max-w-5xl flex-col items-center gap-3">
        <img
          src={currentImage.path}
          alt={`${projectName} - ${currentImage.title}`}
          className="max-h-[75vh] max-w-full rounded-xl object-contain"
        />

        <p className="text-center text-sm text-white/70">
          {currentImage.title}
          {hasMultipleImages && (
            <span className="ml-2">
              ({index + 1} / {images.length})
            </span>
          )}
        </p>
      </div>

      {hasMultipleImages && !isLast && (
        <button
          type="button"
          onClick={handleNext}
          aria-label={t('nextImage')}
          className="absolute right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        >
          <IoChevronForward className="text-2xl" />
        </button>
      )}
    </div>
  )
}

export default ImageGalleryModal
