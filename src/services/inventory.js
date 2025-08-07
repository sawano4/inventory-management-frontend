import { apiRequest } from './api'

// Inventory API endpoints
export const inventoryAPI = {
  // Categories
  categories: {
    getAll: () => apiRequest('/categories/'),
    getById: (id) => apiRequest(`/categories/${id}/`),
    create: (data) => apiRequest('/categories/', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiRequest(`/categories/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiRequest(`/categories/${id}/`, {
      method: 'DELETE'
    })
  },

  // Suppliers
  suppliers: {
    getAll: () => apiRequest('/suppliers/'),
    getById: (id) => apiRequest(`/suppliers/${id}/`),
    create: (data) => apiRequest('/suppliers/', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiRequest(`/suppliers/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiRequest(`/suppliers/${id}/`, {
      method: 'DELETE'
    })
  },

  // Items
  items: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams()
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== '') {
          searchParams.append(key, params[key])
        }
      })
      const queryString = searchParams.toString()
      return apiRequest(`/items/${queryString ? '?' + queryString : ''}`)
    },
    getById: (id) => apiRequest(`/items/${id}/`),
    create: (data) => apiRequest('/items/', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => apiRequest(`/items/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => apiRequest(`/items/${id}/`, {
      method: 'DELETE'
    }),
    // Custom actions for items
    lowStock: () => apiRequest('/items/low_stock/'),
    byCategory: (categoryId) => apiRequest(`/items/by_category/?category=${categoryId}`),
    search: (query) => apiRequest(`/items/?search=${encodeURIComponent(query)}`)
  }
}
