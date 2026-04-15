import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/Loading'
import Header from '@/features/Header'
import LatestProjects from '@/features/LatestProjects'
import { fetchPortfolioInformation } from '@/lib/portfolioApi'

const App = () => {
  const {
    data: portfolioData,
    error,
    isPending,
  } = useQuery({
    queryKey: ['portfolio-information'],
    queryFn: fetchPortfolioInformation,
  })

  return (
    <main className="flex min-h-screen w-full flex-col gap-4 pb-10">
      <Header />
      {isPending && (
        <Loading message="Loading portfolio data..." />
      )}

      {!isPending && error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
          {error instanceof Error ? error.message : 'Unexpected error'}
        </div>
      )}

      {!isPending && !error && (
        <LatestProjects projects={portfolioData?.data ?? []} />
      )}
    </main>
  )
}

export default App
