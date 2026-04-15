import LinkedInLink from '@/components/LinkedInLink'

const Header = () => {
  return (
    <header className="relative w-screen bg-amber-700 py-4 px-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <div>
          <p className="text-md uppercase text-white/30 tracking-widest md:tracking-[0.3em]">
            Jose Zamora - Full Stack Developer
          </p>
          <h1 className="text-3xl font-semibold tracking-[0.3em] md:tracking-[0.95em] text-white md:text-4xl">
            PORTFOLIO
          </h1>
        </div>

        <LinkedInLink iconOnly={false} />
      </div>
    </header>
  )
}

export default Header
