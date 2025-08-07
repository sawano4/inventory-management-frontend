import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { inventoryAPI } from '../services/inventory'
import { AlertTriangle, Package, TrendingUp, DollarSign } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStock: 0,
    categories: 0,
    totalValue: 0
  })
  const [recentItems, setRecentItems] = useState([])
  const [lowStockItems, setLowStockItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        console.log('Fetching dashboard data...')
        
        // Fetch items and categories
        const [itemsResponse, categoriesResponse] = await Promise.all([
          inventoryAPI.items.getAll(),
          inventoryAPI.categories.getAll()
        ])
        
        console.log('Items response:', itemsResponse)
        console.log('Categories response:', categoriesResponse)
        
        const items = itemsResponse.results || itemsResponse || []
        const categories = categoriesResponse.results || categoriesResponse || []
        
        console.log('Processed items:', items)
        console.log('Processed categories:', categories)
        
        // Calculate stats
        const totalItems = itemsResponse.count
        const lowStockItemsList = items.filter(item => 
          item.quantity !== undefined && 
          item.low_stock_threshold !== undefined && 
          item.quantity <= item.low_stock_threshold
        )
        const lowStock = lowStockItemsList.length
        const totalCategories = categories.length
        const totalValue = items.reduce((sum, item) => {
          const price = parseFloat(item.price) || 0
          const quantity = parseInt(item.quantity) || 0
          return sum + (price * quantity)
        }, 0)
        
        const newStats = {
          totalItems,
          lowStock,
          categories: totalCategories,
          totalValue
        }
        
        console.log('Calculated stats:', newStats)
        
        setStats(newStats)
        
        // Get recent items (last 5)
        const sortedItems = items
          .filter(item => item.created_at)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setRecentItems(sortedItems.slice(0, 5))
        
        // Set low stock items (first 5)
        setLowStockItems(lowStockItemsList.slice(0, 5))
        
      } catch (error) {
        console.error('Dashboard error:', error)
        setError('Failed to fetch dashboard data: ' + error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-800 h-24 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Low Stock Alert Banner */}
      {stats.lowStock > 0 && (
        <div className="bg-red-600/20 border border-red-600 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div>
              <h3 className="text-red-400 font-semibold">Low Stock Alert</h3>
              <p className="text-red-300 text-sm">
                {stats.lowStock} item{stats.lowStock > 1 ? 's' : ''} running low on stock. 
                <Link to="/items" className="ml-1 underline hover:text-red-200">
                  View all items
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Total Items</h3>
              <p className="text-2xl font-bold text-white mt-2">{stats.totalItems}</p>
            </div>
            <Package className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Low Stock</h3>
              <p className="text-2xl font-bold text-red-400 mt-2">{stats.lowStock}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Categories</h3>
              <p className="text-2xl font-bold text-white mt-2">{stats.categories}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Total Value</h3>
              <p className="text-2xl font-bold text-green-400 mt-2">${stats.totalValue.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Items */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Items</h2>
            <Link to="/items" className="text-blue-400 hover:text-blue-300 text-sm">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentItems.length > 0 ? (
              recentItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                  <div>
                    <Link to={`/items/${item.id}`} className="text-white hover:text-blue-400 font-medium">
                      {item.name}
                    </Link>
                    <p className="text-gray-400 text-sm">{item.quantity} units • ${item.price}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No items found</p>
            )}
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Low Stock Items</h2>
            {stats.lowStock > 0 && (
              <Link to="/items?filter=lowstock" className="text-red-400 hover:text-red-300 text-sm">
                View all
              </Link>
            )}
          </div>
          <div className="space-y-3">
            {lowStockItems.length > 0 ? (
              lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                  <div>
                    <Link to={`/items/${item.id}`} className="text-white hover:text-red-400 font-medium">
                      {item.name}
                    </Link>
                    <p className="text-red-400 text-sm">
                      {item.quantity} / {item.low_stock_threshold} units
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-400">
                    Low Stock
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">All items are well stocked</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
