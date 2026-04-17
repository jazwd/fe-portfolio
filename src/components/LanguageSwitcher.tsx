import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const isEnglish = i18n.language.startsWith('en')

  const switchLanguage = () => {
    i18n.changeLanguage(isEnglish ? 'es' : 'en')
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      aria-label={isEnglish ? 'Switch to Spanish' : 'Cambiar a inglés'}
      className=" hidden md:block rounded-md border border-white/30 px-3 min-h-10 text-lg leading-none transition hover:bg-white/10 cursor-pointer"
    >
      {isEnglish ? '🇺🇸' : '🇪🇸'}
    </button>
  )
}

export default LanguageSwitcher
