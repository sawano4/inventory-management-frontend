import { apiRequest } from './api'

// Users API endpoints
export const usersAPI = {
  // Users
  users: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams()
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== '') {
          searchParams.append(key, params[key])
        }
      })
      const queryString = searchParams.toString()
      return apiRequest(`/users/${queryString ? '?' + queryString : ''}`)
    },
    getById: (id) => apiRequest(`/users/${id}/`),
    create: (data) => apiRequest('/users/', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiRequest(`/users/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiRequest(`/users/${id}/`, {
      method: 'DELETE'
    })
  },

  // User Profiles
  profiles: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams()
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== '') {
          searchParams.append(key, params[key])
        }
      })
      const queryString = searchParams.toString()
      return apiRequest(`/profiles/${queryString ? '?' + queryString : ''}`)
    },
    getById: (id) => apiRequest(`/profiles/${id}/`),
    create: (data) => apiRequest('/profiles/', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiRequest(`/profiles/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiRequest(`/profiles/${id}/`, {
      method: 'DELETE'
    })
  }
}
