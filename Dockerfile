# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package*.json pnpm-lock.yaml* ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port that Vite uses
EXPOSE 3000

# Start the development server
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "3000"]
