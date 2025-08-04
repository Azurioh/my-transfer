# MyTransfer

A modern, full-stack transfer application built with React, Fastify, and MongoDB. This monorepo contains a frontend application, admin panel, and backend API service.

## 🏗️ Architecture

This project follows a monorepo structure with the following components:

- **Frontend** (`apps/frontend/`) - React application with Vite
- **Admin Panel** (`apps/admin-panel/`) - React-based admin interface
- **Backend** (`apps/backend/`) - Fastify API server with MongoDB
- **Shared Packages** (`packages/`) - Common configurations and utilities

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm
- Docker (for backend development)
- MongoDB (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-transfer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example environment files
   cp .env_example .env
   cp apps/backend/.env_example apps/backend/.env
   ```

4. **Configure your environment variables**
   - Update `.env` with your API URL
   - Update `apps/backend/.env` with your database configuration

## 🛠️ Development

### Running the Applications

#### Frontend
```bash
cd apps/frontend
npm run dev
```
Access at: http://localhost:3000

#### Admin Panel
```bash
cd apps/admin-panel
npm run dev
```
Access at: http://localhost:3000

#### Backend
```bash
cd apps/backend
npm run dev
```
Access at: http://localhost:8080

### Using Docker (Backend)

The backend can also be run with Docker Compose, which includes MongoDB:

```bash
cd apps/backend
docker-compose --env-file .env up --build
```

This will start:
- MongoDB on port 27017
- Backend API on port 8080

## 📁 Project Structure

```
my-transfer/
├── apps/
│   ├── frontend/          # React frontend application
│   ├── admin-panel/       # React admin interface
│   └── backend/           # Fastify API server
├── packages/
│   ├── biome-config/      # Shared Biome configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   └── vite-config/       # Shared Vite configuration
├── .env_example          # Environment variables template
└── README.md            # This file
```

## 🛠️ Available Scripts

### Root Level
- `npm install` - Install all dependencies across the monorepo

### Frontend & Admin Panel
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check:all` - Run Biome linting
- `npm run check:fix` - Fix linting issues
- `npm run typescript:check` - Type-check TypeScript

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript
- `npm run start` - Start production server
- `npm run format:check` - Check code formatting
- `npm run format:fix` - Fix code formatting

## 🔧 Configuration

### Environment Variables

#### Frontend/Admin Panel
- `VITE_API_URL` - Backend API URL (default: http://localhost:8080)

#### Backend
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `API_BASE_URL` - API base URL
- `MONGO_URI` - MongoDB connection string
- `MONGO_DATABASE` - MongoDB database name

### Code Quality

This project uses:
- **Biome** for linting and formatting
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Fastify** for high-performance API development

## 🌐 API Documentation

When the backend is running, you can access the API documentation at:
- Swagger UI: http://localhost:8080/docs
- Health Check: http://localhost:8080/health

## 🚀 Deployment

### Frontend (AWS)
The frontend includes Serverless Framework configuration for AWS deployment:
- S3 bucket for static hosting
- CloudFront for CDN
- Automatic invalidation on deployment

```bash
cd apps/frontend
npm run build
serverless deploy
```

### Backend
The backend can be deployed using Docker:

```bash
cd apps/backend
docker build -t my-transfer-backend .
docker run -p 8080:8080 my-transfer-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email contact@mytransfer.com or create an issue in the repository.
