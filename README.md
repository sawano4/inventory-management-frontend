# Inventory Management System - Frontend

A modern React-based frontend for inventory management built with Vite, Tailwind CSS, and React Router. Features a responsive dark theme design and seamless integration with the Django REST API backend.

## 📋 Project Overview

This inventory management system frontend provides an intuitive interface for:
- User authentication (login/signup)
- Dashboard with real-time inventory statistics
- Complete item management (CRUD operations)
- Category and supplier management
- Low stock alerts and notifications
- Advanced search and filtering
- Responsive design for all devices

## 🏗️ Project Structure
```
client/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── FormInput.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── contexts/       # React contexts for state management
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── DashboardPage.jsx
│   │   ├── ItemDetailPage.jsx
│   │   ├── ItemListPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── SignupPage.jsx
│   ├── services/       # API service functions
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── inventory.js
│   │   └── users.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── docker-compose.yml  # Docker development setup
├── Dockerfile          # Docker development image
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite build configuration
├── .env.example        # Environment variables template
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Context API** - State management
- **Docker** - Containerization

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm package manager
- Docker and Docker Compose (for containerized setup)
- Backend API server running

### Quick Start with Docker

1. **Clone the repository:**
   ```bash
   git clone <your-frontend-repo-url>
   cd inventory-management-frontend
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Start with Docker Compose:**
   ```bash
   # Development mode
   docker-compose up --build
   ```

4. **Access the application:**
   - Development: `http://localhost:3000`

### Local Development Setup

1. **Navigate to the project directory:**
   ```bash
   cd inventory-management-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Update environment variables:**
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

5. **Start development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Access the application:**
   Open `http://localhost:3000` in your browser

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Docker Configuration

The application includes Docker configuration for easy development setup with hot reloading and volume mounting.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Docker commands
docker-compose up --build              # Development with Docker
```

## 📱 Features

### ✅ Implemented Features

- **Authentication System**
  - User login and registration
  - Token-based authentication
  - Protected routes
  - Auto-logout on token expiry

- **Dashboard**
  - Real-time inventory statistics
  - Low stock alerts
  - Recent items overview
  - Quick action buttons

- **Inventory Management**
  - Complete CRUD operations for items
  - Category and supplier management
  - Advanced search and filtering
  - Pagination for large datasets
  - Bulk operations

- **User Interface**
  - Responsive dark theme design
  - Mobile-friendly navigation
  - Loading states and error handling
  - Toast notifications
  - Modal dialogs

- **Data Visualization**
  - Interactive charts and graphs
  - Inventory statistics
  - Low stock indicators
  - Category distribution

### 🔮 Planned Features

- [ ] Advanced reporting
- [ ] Export functionality (PDF, Excel)
- [ ] Barcode scanning
- [ ] Multi-language support
- [ ] Real-time notifications
- [ ] Bulk import/export
- [ ] Advanced user roles

## 🔗 API Integration

This frontend integrates seamlessly with the Django REST API backend:

### API Endpoints Used

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Authentication | `/auth/login/`, `/auth/register/` | User authentication |
| Items | `/items/` | CRUD operations for inventory items |
| Categories | `/categories/` | Category management |
| Suppliers | `/suppliers/` | Supplier management |
| Users | `/users/` | User profile management |

### API Service Structure

```javascript
// Example API call
import { inventoryAPI } from './services/inventory'

// Get all items
const items = await inventoryAPI.items.getAll()

// Create new item
const newItem = await inventoryAPI.items.create(itemData)
```

## 🐳 Docker Usage

### Development Environment

```bash
# Start development environment
docker-compose up

# With rebuilding
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs frontend

# Stop services
docker-compose down
```

### Multi-Container Setup

To run both frontend and backend together:

```bash
# Create shared network
docker network create inventory-network

# Start backend (from backend directory)
docker-compose up -d

# Start frontend (from frontend directory)
docker-compose up -d
```

## 🎨 UI/UX Design

### Design System

- **Color Scheme**: Dark theme with blue accents
- **Typography**: Clean, readable fonts
- **Layout**: Responsive grid system
- **Components**: Consistent, reusable UI components

### Responsive Breakpoints

```css
sm: 640px    /* Mobile landscape */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Large desktop */
```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests (if configured)
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Testing Strategy

- Component unit tests
- Integration tests for API calls
- End-to-end testing for critical user flows

## 🚀 Deployment

### Development Build

```bash
# Build for development
npm run build

# Preview build
npm run preview
```

### Docker Development Deployment

```bash
# Build development image
docker build -t inventory-frontend:dev .

# Run development container
docker run -p 3000:3000 inventory-frontend:dev
```

## 🔒 Security Features

- **Authentication**: Token-based with automatic renewal
- **Route Protection**: Private routes require authentication
- **Input Validation**: Client-side validation for all forms
- **CORS**: Properly configured for backend communication
- **Environment Variables**: Sensitive data in environment files

## 📊 Performance Optimization

- **Code Splitting**: Lazy loading for routes
- **Bundle Optimization**: Vite's optimized bundling
- **Image Optimization**: Optimized asset delivery
- **Caching**: Browser caching strategies

## 🔗 Related Repositories

- **Backend API**: [Inventory Management Backend](link-to-backend-repo)


## 📝 Features

- ✅ User authentication (login/signup)
- ✅ Dashboard with inventory overview
- ✅ Item management (CRUD operations)
- ✅ Category and supplier management
- ✅ Low stock alerts
- ✅ Responsive design
- ✅ Real-time inventory updates
- ✅ Search and filtering
- ✅ Pagination

## 🔗 API Integration

This frontend integrates with a Django REST API backend. Make sure the backend server is running before starting the frontend application.

Default API endpoints:
- Authentication: `/api/v1/auth/`
- Items: `/api/v1/items/`
- Categories: `/api/v1/categories/`
- Suppliers: `/api/v1/suppliers/`

