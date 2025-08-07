#!/bin/bash

# Frontend Repository Setup Script
# This script prepares the frontend repository for GitHub

echo "🚀 Preparing Frontend Repository for GitHub..."

# Remove any existing git repository
if [ -d ".git" ]; then
    echo "📁 Removing existing .git directory..."
    rm -rf .git
fi

# Initialize new git repository
echo "🔧 Initializing new Git repository..."
git init

# Add all files
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: React inventory management frontend

✨ Features:
- Modern React 18 with Vite
- Tailwind CSS for styling
- Complete inventory management UI
- User authentication
- Dashboard with real-time stats
- Docker support for development and production
- Responsive design

🛠️ Tech Stack:
- React 18
- Vite
- Tailwind CSS
- React Router
- Docker
- Nginx (production)"

echo "✅ Frontend repository prepared!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Add remote origin: git remote add origin <your-repo-url>"
echo "3. Push to GitHub: git push -u origin main"
echo ""
echo "🌐 Make sure to:"
echo "   - Set repository description: 'Modern React frontend for inventory management'"
echo "   - Add topics: react, vite, tailwind, inventory, frontend, docker"
echo "   - Create .env file from .env.example after cloning"
