import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data
    let message = 'Une erreur est survenue. Veuillez réessayer.'
    if (!error.response) {
      message = 'Impossible de joindre le serveur.'
    } else if (data && typeof data === 'object') {
      message =
        data.detail ||
        Object.values(data).map((v) => (Array.isArray(v) ? v.join(' ') : String(v))).join(' ') ||
        message
    }
    error.friendlyMessage = message
    return Promise.reject(error)
  }
)

export default api
