import { useState } from 'react'
import type { PortfolioProject } from '@/lib/portfolioApi'
import ImageGalleryModal from '@/components/ImageGalleryModal'

type LatestProjectsProps = {
  projects: PortfolioProject[]
}

type ProjectImageSliderProps = {
  projectName: string
  images: PortfolioProject['images']
}

const ProjectImageSlider = ({ projectName, images }: ProjectImageSliderProps) => {
  const [index, setIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  if (images.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500">
        No images available
      </div>
    )
  }

  const currentImage = images[index]
  const hasMultipleImages = images.length > 1

  const handlePrev = () => {
    setIndex((value) => (value - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setIndex((value) => (value + 1) % images.length)
  }

  return (
    <div className="space-y-3">
      <img
        src={currentImage.path}
        alt={`${projectName} - ${currentImage.title}`}
        className="block h-52 w-full rounded-xl border border-slate-200 object-cover md:hidden"
        loading="lazy"
      />
      <button
        type="button"
        onClick={() => setIsGalleryOpen(true)}
        className="hidden w-full cursor-pointer md:block"
      >
        <img
          src={currentImage.path}
          alt={`${projectName} - ${currentImage.title}`}
          className="h-52 w-full rounded-xl border border-slate-200 object-cover"
          loading="lazy"
        />
      </button>

      {hasMultipleImages && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            Prev
          </button>

          <p className="text-xs text-slate-500">
            {index + 1} / {images.length}
          </p>

          <button
            type="button"
            onClick={handleNext}
            className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      )}

      {isGalleryOpen && (
        <ImageGalleryModal
          images={images}
          initialIndex={index}
          projectName={projectName}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </div>
  )
}

const LatestProjects = ({ projects }: LatestProjectsProps) => {
  const renderProjectLnkButton = (project: PortfolioProject) => {
    return (
      <a
        href={project.link.url}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center rounded-md w-fit bg-amber-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
      >
        {project.link.label}
      </a>
    )
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-10">
      <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Latest Projects</h2>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 p-4 shadow-sm">
            <ProjectImageSlider projectName={project.name} images={project.images} />

            <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>

            <p className="text-sm text-slate-500">
              {project.company} • {project.year}
            </p>

            <p className="text-slate-700">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.technologyTags.map((tech) => (
                <span
                  key={`${project.id}-${tech}`}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            {renderProjectLnkButton(project)}
          </article>
        ))}
      </div>
    </section>
  )
}

export default LatestProjects
