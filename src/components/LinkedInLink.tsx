import { useTranslation } from 'react-i18next'
import { FaLinkedinIn } from 'react-icons/fa'

type LinkedInLinkProps = {
  iconOnly?: boolean
  href?: string
}

const LinkedInLink = ({
  iconOnly = false,
  href = 'https://www.linkedin.com/in/jose-zamora-silva',
}: LinkedInLinkProps) => {
  const { t } = useTranslation('home')
  const sizeClasses = iconOnly ? 'p-2.5' : 'p-2.5 md:gap-2 md:px-4 md:py-2'

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t('visitLinkedIn')}
      className={`inline-flex items-center rounded-md border border-white/30 text-sm font-medium text-white transition hover:bg-white/10 min-h-10 ${sizeClasses}`}
    >
      <FaLinkedinIn className="text-base" aria-hidden="true" />
      {!iconOnly && <span className="hidden md:inline">LinkedIn</span>}
    </a>
  )
}

export default LinkedInLink
