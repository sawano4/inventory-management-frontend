// API Configuration
const API_BASE_URL = 'http://localhost:8000/api/v1'
const AUTH_BASE_URL = 'http://localhost:8000/api/v1'

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken')

// Set auth token in localStorage
const setAuthToken = (token) => localStorage.setItem('authToken', token)

// Remove auth token from localStorage
const removeAuthToken = () => localStorage.removeItem('authToken')

// Create API headers with authentication
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  
  if (includeAuth) {
    const token = getAuthToken()
    if (token) {
      headers['Authorization'] = `Token ${token}`
    }
  }
  
  return headers
}

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: getHeaders(options.includeAuth !== false),
    ...options,
  }
  
  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`)
    }
    
    // Handle 204 No Content responses
    if (response.status === 204) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

// Auth API request function (uses different base URL)
const authRequest = async (endpoint, options = {}) => {
  const url = `${AUTH_BASE_URL}${endpoint}`
  
  const config = {
    headers: getHeaders(options.includeAuth !== false),
    ...options,
  }
  
  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Auth Request Error:', error)
    throw error
  }
}

export {
  API_BASE_URL,
  AUTH_BASE_URL,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getHeaders,
  apiRequest,
  authRequest
}
