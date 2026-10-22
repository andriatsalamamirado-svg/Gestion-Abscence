import { useEffect, useState } from 'react'
import { BookOpen, CalendarX, FileCheck, School, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { dashboardApi } from '../../api/resources'
import Card from '../../components/Card'
import Loader from '../../components/Loader'
import Badge from '../../components/Badge'
import { formatDate } from '../../utils/formatters'

const TONES = { justifiee: 'success', non_justifiee: 'danger' }

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardApi
      .stats()
      .then((res) => setStats(res.data))
      .catch((err) => toast.error(err.friendlyMessage))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Chargement..." />
  if (!stats) return <p className="text-slate-500">Statistiques indisponibles pour le moment.</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Tableau de bord</h1>
        <p className="text-sm text-slate-500">Vue d'ensemble des absences</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Étudiants" value={stats.total_etudiants} icon={Users} />
        <Card title="Classes" value={stats.total_classes} icon={School} />
        <Card title="Matières" value={stats.total_matieres} icon={BookOpen} />
        <Card title="Absences" value={stats.total_absences} subtitle={`${stats.total_heures} heures au total`} icon={CalendarX} />
        <Card title="Non justifiées" value={stats.non_justifiees} icon={CalendarX} />
        <Card title="Justifiées" value={stats.justifiees} icon={FileCheck} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Étudiants les plus absents</h2>
          {stats.plus_absents.length === 0 ? (
            <p className="text-sm text-slate-400">Aucune absence enregistrée.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {stats.plus_absents.map((e) => (
                <li key={e.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-medium text-slate-900">{e.prenom} {e.nom}</p>
                    <p className="text-slate-500">{e.matricule} · {e.classe__nom}</p>
                  </div>
                  <p className="text-slate-700">{e.total_heures} h · {e.nb_absences} absence(s)</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Dernières absences</h2>
          {stats.dernieres_absences.length === 0 ? (
            <p className="text-sm text-slate-400">Aucune absence enregistrée.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {stats.dernieres_absences.map((a) => (
                <li key={a.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-medium text-slate-900">{a.etudiant_nom} - {a.matiere_nom}</p>
                    <p className="text-slate-500">{formatDate(a.date_absence)} · {a.nb_heures} h</p>
                  </div>
                  <Badge tone={TONES[a.statut]}>{a.statut_label}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
