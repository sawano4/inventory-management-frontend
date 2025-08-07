export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <a 
          href="/dashboard" 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}
