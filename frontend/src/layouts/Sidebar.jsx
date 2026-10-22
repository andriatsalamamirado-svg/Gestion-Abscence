import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarX, GraduationCap, Users, School, BookOpen, Info } from 'lucide-react'

const LIENS = [
  { to: '/', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/absences', label: 'Absences', icon: CalendarX },
  { to: '/etudiants', label: 'Étudiants', icon: Users },
  { to: '/classes', label: 'Classes', icon: School },
  { to: '/matieres', label: 'Matières', icon: BookOpen },
  { to: '/a-propos', label: 'À propos', icon: Info },
]

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-5">
        <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
          <GraduationCap size={20} />
        </div>
        <span className="font-semibold text-slate-900">Gestion des absences</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {LIENS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
