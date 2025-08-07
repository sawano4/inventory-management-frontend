 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm package manager
- Git
- Backend API running at `http://localhost:8000`


### Installation Management System - Frontend

A modern React-based frontend for inventory management built with Vite, Tailwind CSS, and React Router.

## � Quick Start

### Prerequisites
- Node.js (v16+)
- Backend API running at `http://localhost:8000`

### Installation

```bash
git clone https://github.com/sawano4/inventory-management-frontend.git
cd inventory-management-frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000` in your browser.

### Docker Setup

**Additional prerequisites for Docker:**
- Docker and Docker Compose
- 4GB+ RAM available
- Port 3000 free

```bash
docker-compose up --build
```

## ✨ Features

- User authentication (login/signup)
- Dashboard with inventory statistics
- Item management (CRUD operations)
- Category and supplier management
- Low stock alerts
- Search and filtering
- Responsive design

## 🛠️ Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router
- Context API
- Docker

## 📁 Project Structure

```
src/
├── components/     # UI components
├── pages/          # Page components
├── services/       # API calls
├── contexts/       # State management
└── App.jsx         # Main app
```

## � Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview build
npm run lint     # Run ESLint
```

## 🔗 API Integration

Connects to Django REST API backend:
- Authentication: `/api/v1/auth/`
- Items: `/api/v1/items/`
- Categories: `/api/v1/categories/`
- Suppliers: `/api/v1/suppliers/`

## 🐛 Troubleshooting

**API connection issues:**
```bash
# Check if backend is running
curl http://localhost:8000/api/v1/
```

**Docker issues:**
```bash
docker-compose down
docker-compose up --build
```

## 🔗 Related Repositories

- [Backend API](https://github.com/sawano4/inventory-management-backend)


