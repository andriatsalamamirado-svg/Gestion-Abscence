import CrudPage from '../CrudPage'
import { matieresApi } from '../../api/resources'

const columns = [
  { key: 'code', label: 'Code', sortable: true },
  { key: 'nom', label: 'Matière', sortable: true },
  { key: 'enseignant', label: 'Enseignant', sortable: true, render: (r) => r.enseignant || '-' },
]

const fields = [
  { name: 'code', label: 'Code' , required: true },
  { name: 'nom', label: 'Nom de la matière', required: true },
  { name: 'enseignant', label: 'Enseignant', full: true },
]

export default function MatieresPage() {
  return (
    <CrudPage
      title="Matières"
      subtitle="Gérez les matières enseignées"
      singular="Matière"
      api={matieresApi}
      columns={columns}
      fields={fields}
      emptyForm={{ code: '', nom: '', enseignant: '' }}
      itemLabel={(r) => `${r.code} - ${r.nom}`}
      defaultSort="nom"
      searchPlaceholder="Rechercher une matière (code, nom, enseignant)..."
    />
  )
}
