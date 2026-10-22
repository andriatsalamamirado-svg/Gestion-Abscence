import CrudPage from '../CrudPage'
import Badge from '../../components/Badge'
import { absencesApi, etudiantsApi, matieresApi } from '../../api/resources'
import { formatDate } from '../../utils/formatters'

const STATUTS = [
  { value: 'non_justifiee', label: 'Non justifiée' },
  { value: 'justifiee', label: 'Justifiée' },
]

const TONES = { justifiee: 'success', non_justifiee: 'danger' }

const columns = [
  { key: 'etudiant_nom', label: 'Étudiant' },
  { key: 'matricule', label: 'Matricule' },
  { key: 'classe_nom', label: 'Classe' },
  { key: 'matiere_nom', label: 'Matière' },
  { key: 'date_absence', label: 'Date', sortable: true, render: (r) => formatDate(r.date_absence) },
  { key: 'nb_heures', label: 'Heures', sortable: true },
  { key: 'statut', label: 'Statut', sortable: true, render: (r) => <Badge tone={TONES[r.statut]}>{r.statut_label}</Badge> },
  { key: 'motif', label: 'Motif', render: (r) => (r.motif ? (r.motif.length > 30 ? `${r.motif.slice(0, 30)}...` : r.motif) : '-') },
]

const fields = [
  {
    name: 'etudiant',
    label: 'Étudiant',
    as: 'select',
    required: true,
    full: true,
    optionsFrom: {
      api: etudiantsApi,
      map: (e) => ({ value: e.id, label: `${e.nom_complet} - ${e.matricule}` }),
    },
  },
  {
    name: 'matiere',
    label: 'Matière',
    as: 'select',
    required: true,
    optionsFrom: { api: matieresApi, map: (m) => ({ value: m.id, label: `${m.code} - ${m.nom}` }) },
  },
  { name: 'date_absence', label: "Date de l'absence", type: 'date', required: true },
  { name: 'nb_heures', label: "Nombre d'heures", type: 'number', required: true },
  { name: 'statut', label: 'Statut', as: 'select', options: STATUTS, required: true },
  { name: 'motif', label: 'Motif de la justification', as: 'textarea', full: true },
]

const today = () => new Date().toISOString().slice(0, 10)

const exportColumns = [
  { key: 'etudiant_nom', label: 'Étudiant' },
  { key: 'matricule', label: 'Matricule' },
  { key: 'matiere_nom', label: 'Matière' },
  { key: 'date_absence', label: 'Date', value: (r) => formatDate(r.date_absence) },
  { key: 'nb_heures', label: 'Heures' },
  { key: 'statut_label', label: 'Statut' },
]

export default function AbsencesPage() {
  return (
    <CrudPage
      title="Absences"
      subtitle="Enregistrez et suivez les absences des étudiants"
      singular="Absence"
      api={absencesApi}
      columns={columns}
      fields={fields}
      emptyForm={{ etudiant: '', matiere: '', date_absence: today(), nb_heures: 1, statut: 'non_justifiee', motif: '' }}
      itemLabel={(r) => `${r.etudiant_nom} - ${formatDate(r.date_absence)}`}
      defaultSort="date_absence"
      searchPlaceholder="Rechercher (étudiant, matricule, matière)..."
      exportColumns={exportColumns}
    />
  )
}
