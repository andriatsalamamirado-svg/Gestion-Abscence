import CrudPage from '../CrudPage'
import { etudiantsApi, classesApi } from '../../api/resources'

const columns = [
  { key: 'matricule', label: 'Matricule', sortable: true },
  { key: 'nom', label: 'Nom', sortable: true },
  { key: 'prenom', label: 'Prénom', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'telephone', label: 'Téléphone', render: (r) => r.telephone || '-' },
  { key: 'classe_nom', label: 'Classe' },
]

const fields = [
  { name: 'matricule', label: 'Matricule', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'nom', label: 'Nom', required: true },
  { name: 'prenom', label: 'Prénom', required: true },
  { name: 'telephone', label: 'Téléphone' },
  {
    name: 'classe',
    label: 'Classe',
    as: 'select',
    required: true,
    optionsFrom: { api: classesApi, map: (c) => ({ value: c.id, label: c.nom }) },
  },
]

const emptyForm = { matricule: '', email: '', nom: '', prenom: '', telephone: '', classe: '' }

export default function EtudiantsPage() {
  return (
    <CrudPage
      title="Étudiants"
      subtitle="Gérez les étudiants inscrits"
      singular="Étudiant"
      api={etudiantsApi}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(r) => `${r.prenom} ${r.nom}`}
      defaultSort="nom"
      searchPlaceholder="Rechercher un étudiant (matricule, nom, email)..."
      exportColumns={columns}
    />
  )
}
