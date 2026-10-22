import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, pageSize, count, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(count / pageSize))

  return (
    <div className="flex items-center justify-between px-1 py-2">
      <p className="text-sm text-slate-500">
        {count} résultat{count > 1 ? 's' : ''} — page {page} / {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="focus-ring rounded-md border border-slate-300 bg-white p-1.5 text-slate-700 disabled:opacity-40"
          aria-label="Page précédente"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="focus-ring rounded-md border border-slate-300 bg-white p-1.5 text-slate-700 disabled:opacity-40"
          aria-label="Page suivante"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
