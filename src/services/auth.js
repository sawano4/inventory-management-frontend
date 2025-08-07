import { authRequest, setAuthToken, removeAuthToken } from './api'

// Auth API endpoints
export const authAPI = {
  // Login user
  login: async (credentials) => {
    const response = await authRequest('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
      includeAuth: false
    })
    
    if (response.token) {
      setAuthToken(response.token)
    }
    
    return response
  },

  // Register new user
  register: async (userData) => {
    const response = await authRequest('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
      includeAuth: false
    })
    
    if (response.token) {
      setAuthToken(response.token)
    }
    
    return response
  },

  // Logout user
  logout: async () => {
    try {
      await authRequest('/auth/logout/', {
        method: 'POST'
      })
    } finally {
      removeAuthToken()
    }
  },

  // Get user profile
  getProfile: async () => {
    return await authRequest('/auth/profile/')
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await authRequest('/auth/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    })
  }
}
