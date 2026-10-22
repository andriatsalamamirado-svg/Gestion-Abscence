import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-6xl font-bold text-slate-300">404</p>
      <p className="text-slate-600">Cette page n'existe pas.</p>
      <Link to="/" className="focus-ring rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
        Retour au tableau de bord
      </Link>
    </div>
  )
}
