import { Database, KeyRound, UserRound } from 'lucide-react'
import mldImg from '../../assets/mld.png'
import mpdImg from '../../assets/mpd.png'

const TABLES = [
  {
    name: 'classe',
    description: 'Regroupe les étudiants par classe.',
    fields: [
      ['id', 'BigAutoField', 'Clé primaire'],
      ['nom', 'varchar(80)', 'Unique, obligatoire'],
      ['niveau', 'varchar(30)', 'Facultatif'],
      ['created_at', 'datetime', 'Date de création'],
    ],
  },
  {
    name: 'etudiant',
    description: 'Contient les informations administratives des étudiants.',
    fields: [
      ['id', 'BigAutoField', 'Clé primaire'],
      ['matricule', 'varchar(30)', 'Unique, obligatoire'],
      ['nom', 'varchar(100)', 'Obligatoire'],
      ['prenom', 'varchar(100)', 'Obligatoire'],
      ['email', 'varchar(254)', 'Unique, obligatoire'],
      ['telephone', 'varchar(20)', 'Facultatif'],
      ['classe_id', 'BigInteger', 'Clé étrangère vers classe.id'],
      ['created_at', 'datetime', 'Date de création'],
    ],
  },
  {
    name: 'matiere',
    description: 'Référence les matières et leurs enseignants.',
    fields: [
      ['id', 'BigAutoField', 'Clé primaire'],
      ['nom', 'varchar(100)', 'Obligatoire'],
      ['code', 'varchar(20)', 'Unique, obligatoire'],
      ['enseignant', 'varchar(100)', 'Facultatif'],
      ['created_at', 'datetime', 'Date de création'],
    ],
  },
  {
    name: 'absence',
    description: 'Enregistre les absences d’un étudiant dans une matière.',
    fields: [
      ['id', 'BigAutoField', 'Clé primaire'],
      ['etudiant_id', 'BigInteger', 'Clé étrangère vers etudiant.id'],
      ['matiere_id', 'BigInteger', 'Clé étrangère vers matiere.id'],
      ['date_absence', 'date', 'Obligatoire'],
      ['nb_heures', 'smallint', 'De 1 à 12, défaut : 1'],
      ['statut', 'varchar(15)', 'justifiee ou non_justifiee'],
      ['motif', 'text', 'Facultatif'],
      ['created_at', 'datetime', 'Date de création'],
    ],
  },
]

const RELATIONS = [
  {
    from: 'classe',
    to: 'etudiant',
    cardinality: '1 à N',
    rule: 'Une classe peut contenir plusieurs étudiants. Suppression protégée si des étudiants y sont rattachés.',
  },
  {
    from: 'etudiant',
    to: 'absence',
    cardinality: '1 à N',
    rule: 'Un étudiant peut avoir plusieurs absences. La suppression de l’étudiant supprime ses absences.',
  },
  {
    from: 'matiere',
    to: 'absence',
    cardinality: '1 à N',
    rule: 'Une matière peut apparaître dans plusieurs absences. Sa suppression est protégée si elle est utilisée.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-medium text-indigo-700">Gestion des absences</p>
        <h1 className="mt-1 text-xl font-semibold text-slate-900">À propos</h1>
        <p className="mt-1 text-sm text-slate-500">
          Présentation du projet et étude du schéma de base de données relationnelle (SBDR).
        </p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <UserRound size={18} className="text-indigo-700" />
          <h2 className="text-sm font-semibold text-slate-900">Informations</h2>
        </div>
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Nom</dt>
            <dd className="mt-1 font-medium text-slate-900">Mirado</dd>
          </div>
          <div>
            <dt className="text-slate-500">Matricule</dt>
            <dd className="mt-1 font-medium text-slate-900">3334/24</dd>
          </div>
          <div>
            <dt className="text-slate-500">Classe</dt>
            <dd className="mt-1 font-medium text-slate-900">IGFIB</dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database size={18} className="text-indigo-700" />
          <h2 className="text-sm font-semibold text-slate-900">Tables</h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {TABLES.map((table) => (
            <article key={table.name} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="border-b border-slate-100 px-4 py-3">
                <h3 className="font-mono text-sm font-semibold text-slate-900">{table.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{table.description}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-2 font-medium">Champ</th>
                      <th className="px-4 py-2 font-medium">Type</th>
                      <th className="px-4 py-2 font-medium">Contraintes / rôle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {table.fields.map(([field, type, detail]) => (
                      <tr key={field}>
                        <td className="whitespace-nowrap px-4 py-2 font-mono text-slate-800">{field}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-slate-600">{type}</td>
                        <td className="px-4 py-2 text-slate-600">{detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <KeyRound size={18} className="text-indigo-700" />
          <h2 className="text-sm font-semibold text-slate-900">Relations entre les tables</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {RELATIONS.map((relation) => (
            <div
              key={`${relation.from}-${relation.to}`}
              className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_5rem_2fr] sm:items-center sm:gap-4"
            >
              <p className="font-mono text-sm text-slate-800">
                {relation.from} <span className="text-slate-400">→</span> {relation.to}
              </p>
              <p className="text-xs font-medium text-indigo-700">{relation.cardinality}</p>
              <p className="text-xs leading-5 text-slate-600">{relation.rule}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
          Les clés étrangères assurent l’intégrité référentielle. Aucune relation directe n’est définie entre les tables classe et matiere.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database size={18} className="text-indigo-700" />
          <h2 className="text-sm font-semibold text-slate-900">Modèle Logique de Données (MLD)</h2>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <img
            src={mldImg}
            alt="Modèle Logique de Données"
            className="w-full rounded-md"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database size={18} className="text-indigo-700" />
          <h2 className="text-sm font-semibold text-slate-900">Modèle Physique de Données (MPD)</h2>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <img
            src={mpdImg}
            alt="Modèle Physique de Données"
            className="w-full rounded-md"
          />
        </div>
      </section>
    </div>
  )
}