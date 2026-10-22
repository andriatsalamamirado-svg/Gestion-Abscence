import api from './axios'

const crud = (path) => ({
  list: (params) => api.get(`/${path}/`, { params }),
  create: (data) => api.post(`/${path}/`, data),
  update: (id, data) => api.patch(`/${path}/${id}/`, data),
  remove: (id) => api.delete(`/${path}/${id}/`),
})

export const classesApi = crud('classes')
export const matieresApi = crud('matieres')
export const etudiantsApi = crud('etudiants')
export const absencesApi = crud('absences')
export const dashboardApi = {
  stats: () => api.get('/dashboard/stats/'),
}
