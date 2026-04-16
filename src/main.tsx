import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/locales/i18n-config'
import './index.css'
import App from '@/App.tsx'

const getCacheTimeMs = () => {
  const value = import.meta.env.VITE_PORTFOLIO_CACHE_TIME_MS
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(
      'Invalid VITE_PORTFOLIO_CACHE_TIME_MS value. It must be a positive number in milliseconds.',
    )
  }

  return parsed
}

const portfolioCacheTimeMs = getCacheTimeMs()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: portfolioCacheTimeMs,
      gcTime: portfolioCacheTimeMs,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
