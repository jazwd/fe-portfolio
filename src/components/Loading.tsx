import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type LoadingProps = {
  message?: string
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-700"
    >
      <AiOutlineLoading3Quarters className="text-xl text-slate-600 animate-spin" />
      <span>{message}</span>
    </div>
  )
}

export default Loading
