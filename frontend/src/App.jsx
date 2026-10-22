import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardPage from './features/dashboard/DashboardPage'
import AbsencesPage from './features/absences/AbsencesPage'
import EtudiantsPage from './features/etudiants/EtudiantsPage'
import ClassesPage from './features/classes/ClassesPage'
import MatieresPage from './features/matieres/MatieresPage'
import AboutPage from './features/about/AboutPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="absences" element={<AbsencesPage />} />
        <Route path="etudiants" element={<EtudiantsPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="matieres" element={<MatieresPage />} />
        <Route path="a-propos" element={<AboutPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
