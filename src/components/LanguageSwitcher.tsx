import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      aria-label={i18n.language === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
      className=" hidden md:block rounded-md border border-white/30 px-3 min-h-10 text-lg leading-none transition hover:bg-white/10 cursor-pointer"
    >
      {i18n.language === 'en' ? '🇺🇸' : '🇪🇸'}
    </button>
  )
}

export default LanguageSwitcher
