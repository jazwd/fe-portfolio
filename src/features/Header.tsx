import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import LinkedInLink from '@/components/LinkedInLink'

const Header = () => {
  const { t } = useTranslation('home')

  return (
    <header className="relative w-screen bg-amber-700 py-4 px-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <div>
          <p className="text-md uppercase text-white/30 tracking-widest md:tracking-[0.3em]">
            Jose Zamora - Full Stack Developer
          </p>
          <h1 className="text-3xl font-semibold tracking-[0.3em] md:tracking-[0.95em] text-white md:text-4xl">
            {t('headerTitle')}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LinkedInLink iconOnly={false} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

export default Header
