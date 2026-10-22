import CrudPage from '../CrudPage'
import { classesApi } from '../../api/resources'

const columns = [
  { key: 'nom', label: 'Classe', sortable: true },
  { key: 'niveau', label: 'Niveau', sortable: true, render: (r) => r.niveau || '-' },
  { key: 'nb_etudiants', label: 'Étudiants', sortable: true },
]

const fields = [
  { name: 'nom', label: 'Nom de la classe', required: true },
  { name: 'niveau', label: 'Niveau' },
]

export default function ClassesPage() {
  return (
    <CrudPage
      title="Classes"
      subtitle="Gérez les classes de l'établissement"
      singular="Classe"
      api={classesApi}
      columns={columns}
      fields={fields}
      emptyForm={{ nom: '', niveau: '' }}
      itemLabel={(r) => r.nom}
      defaultSort="nom"
      searchPlaceholder="Rechercher une classe..."
    />
  )
}
