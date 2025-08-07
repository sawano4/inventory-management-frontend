import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { inventoryAPI } from '../services/inventory'
import { ArrowLeft, Edit, Trash2, Package, AlertTriangle } from 'lucide-react'

export default function ItemDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [category, setCategory] = useState(null)
  const [supplier, setSupplier] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItem()
  }, [id])

  const fetchItem = async () => {
    try {
      setLoading(true)
      const response = await inventoryAPI.items.getById(id)
      setItem(response)
      
      // Fetch related data
      if (response.category) {
        try {
          const categoryResponse = await inventoryAPI.categories.getById(response.category)
          setCategory(categoryResponse)
        } catch (err) {
          console.error('Category fetch error:', err)
        }
      }
      
      if (response.supplier) {
        try {
          const supplierResponse = await inventoryAPI.suppliers.getById(response.supplier)
          setSupplier(supplierResponse)
        } catch (err) {
          console.error('Supplier fetch error:', err)
        }
      }
    } catch (error) {
      setError('Failed to fetch item details')
      console.error('Item fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      await inventoryAPI.items.delete(id)
      navigate('/items')
    } catch (error) {
      setError('Failed to delete item')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-800 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/items"
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Item Details</h1>
        </div>
        <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg">
          {error || 'Item not found'}
        </div>
      </div>
    )
  }

  const isLowStock = item.quantity <= item.low_stock_threshold

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/items"
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{item.name}</h1>
            <p className="text-gray-400">Category: {category?.name || 'No category'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {isLowStock && (
        <div className="bg-red-600/20 border border-red-600 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div>
              <h3 className="text-red-400 font-semibold">Low Stock Alert</h3>
              <p className="text-red-300 text-sm">
                This item is running low on stock. Current quantity ({item.quantity}) is at or below the low stock threshold ({item.low_stock_threshold}).
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Item Image */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <Package className="h-16 w-16 text-gray-600" />
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
            <p className="text-gray-300 leading-relaxed">
              {item.description || 'No description available for this item.'}
            </p>
          </div>

          {/* Stock Information */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Stock Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Current Stock</span>
                <span className={`font-medium ${isLowStock ? 'text-red-400' : 'text-white'}`}>
                  {item.quantity} units
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Low Stock Threshold</span>
                <span className="text-white font-medium">{item.low_stock_threshold} units</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Stock Status</span>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  isLowStock 
                    ? 'bg-red-900 text-red-400' 
                    : 'bg-green-900 text-green-400'
                }`}>
                  {isLowStock ? 'Low Stock' : 'In Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Item Info */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Item Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Price</label>
                <p className="text-2xl font-bold text-white">${item.price}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Category</label>
                <p className="text-white">{category?.name || 'No category'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Supplier</label>
                <p className="text-white">{supplier?.name || 'No supplier'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Quantity</label>
                <p className={`text-white ${isLowStock ? 'text-red-400' : ''}`}>
                  {item.quantity} units
                </p>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Timestamps</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Created</label>
                <p className="text-white">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Last Updated</label>
                <p className="text-white">{new Date(item.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <div className="font-medium text-white">Duplicate Item</div>
                <div className="text-sm text-gray-400">Create a copy of this item</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <div className="font-medium text-white">View History</div>
                <div className="text-sm text-gray-400">See all changes made</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}