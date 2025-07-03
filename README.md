# 🔐 MERN Stack Authentication Application

A comprehensive, production-ready full-stack authentication system built with the MERN (MongoDB, Express.js, React, Node.js) stack. This application demonstrates modern web development practices including JWT authentication, password hashing, Docker containerization, and responsive design.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Prerequisites](#️-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📦 Manual Installation](#-manual-installation)
- [🐳 Docker Deployment](#-docker-deployment)
- [🔧 Configuration](#-configuration)
- [📡 API Documentation](#-api-documentation)
- [🔒 Security Implementation](#-security-implementation)
- [🎨 Frontend Components](#-frontend-components)
- [🗄️ Database Schema](#️-database-schema)
- [🔄 Authentication Flow](#-authentication-flow)
- [🛠️ Development Workflow](#️-development-workflow)
- [📊 Technology Stack](#-technology-stack)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Overview

This MERN authentication application provides a complete user authentication system with secure registration, login, and protected routes. It's designed as a foundation for building scalable web applications that require user management.

### What This Application Does:

1. **User Registration**: Allows new users to create accounts with username and password
2. **User Authentication**: Secure login system with JWT tokens
3. **Protected Routes**: Dashboard access only for authenticated users
4. **Session Management**: Automatic token validation and refresh
5. **Responsive Design**: Works seamlessly across desktop and mobile devices

### Key Highlights:

- **Security First**: Implements industry-standard security practices
- **Production Ready**: Includes Docker containerization and environment configuration
- **Developer Friendly**: Hot-reloading, clear code structure, and comprehensive documentation
- **Modern Stack**: Uses latest versions of MERN technologies with TypeScript

## ✨ Features

### 🔐 Authentication & Security
- ✅ **Secure User Registration** with input validation
- ✅ **JWT Token Authentication** with expiration handling
- ✅ **Password Hashing** using bcrypt with salt rounds
- ✅ **Protected Routes** with authentication middleware
- ✅ **CORS Configuration** for secure cross-origin requests
- ✅ **Input Sanitization** to prevent injection attacks

### 🎨 User Interface
- ✅ **Responsive Design** that works on all devices
- ✅ **Modern UI/UX** with clean, intuitive interface
- ✅ **Loading States** for better user experience
- ✅ **Error Handling** with user-friendly messages
- ✅ **Form Validation** with real-time feedback
- ✅ **TypeScript Support** for type safety

### 🚀 Development & Deployment
- ✅ **Docker Containerization** for easy deployment
- ✅ **Hot Reloading** for development efficiency
- ✅ **Environment Configuration** for different stages
- ✅ **Production Optimization** with multi-stage builds
- ✅ **Health Checks** for container monitoring
- ✅ **Logging System** for debugging and monitoring

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React)       │    │   (Express)     │    │   (MongoDB)     │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Login/Register│ │    │ │Auth Routes  │ │    │ │Users        │ │
│ │Components   │ │    │ │             │ │    │ │Collection   │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │                 │
│ │Dashboard    │ │    │ │JWT Middleware│ │    │                 │
│ │Component    │ │    │ │             │ │    │                 │
│ └─────────────┘ │    │ └─────────────┘ │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │                 │
│ │React Router │ │    │ │User Model   │ │    │                 │
│ │             │ │    │ │             │ │    │                 │
│ └─────────────┘ │    │ └─────────────┘ │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │   HTTP/HTTPS          │   MongoDB             │
         │   Requests            │   Protocol            │
         └───────────────────────┼───────────────────────┘
                                │
         ┌─────────────────────────────────────┐
         │           Docker Network            │
         │                                     │
         │  frontend:3001  backend:5000  db:27018
         └─────────────────────────────────────┘
```

### Request Flow

1. **User Action**: User interacts with React frontend
2. **API Request**: Frontend sends HTTP request to Express backend
3. **Authentication**: Backend validates JWT token (for protected routes)
4. **Database Query**: Backend queries MongoDB for user data
5. **Response**: Backend sends response back to frontend
6. **UI Update**: Frontend updates interface based on response

## 🗂️ Project Structure

```
mern-auth-app/
├── 📁 backend/                     # Express.js backend application
│   ├── 📁 models/                  # Database models
│   │   └── 📄 User.js              # User schema with bcrypt integration
│   ├── 📁 routes/                  # API route handlers
│   │   └── 📄 auth.js              # Authentication endpoints
│   ├── 📄 server.js                # Main server entry point
│   ├── 📄 package.json             # Backend dependencies
│   ├── 📄 .env.example             # Environment variables template
│   ├── 📄 Dockerfile               # Production Docker configuration
│   ├── 📄 Dockerfile.dev           # Development Docker configuration
│   └── 📄 .dockerignore            # Docker ignore patterns
├── 📁 frontend/                    # React.js frontend application
│   ├── 📁 public/                  # Public assets
│   ├── 📁 src/                     # Source code
│   │   ├── 📁 components/          # React components
│   │   │   ├── 📄 Login.tsx        # Login form component
│   │   │   ├── 📄 Register.tsx     # Registration form component
│   │   │   └── 📄 Dashboard.tsx    # Protected dashboard component
│   │   ├── 📄 App.tsx              # Main application component
│   │   ├── 📄 App.css              # Application styles
│   │   ├── 📄 index.tsx            # React entry point
│   │   └── 📄 index.css            # Global styles
│   ├── 📄 package.json             # Frontend dependencies
│   ├── 📄 tsconfig.json            # TypeScript configuration
│   ├── 📄 Dockerfile               # Production Docker configuration
│   ├── 📄 Dockerfile.dev           # Development Docker configuration
│   ├── 📄 nginx.conf               # Nginx configuration for production
│   └── 📄 .dockerignore            # Docker ignore patterns
├── 📄 docker-compose.yml           # Production Docker Compose
├── 📄 docker-compose.dev.yml       # Development Docker Compose
├── 📄 mongo-init.js                # MongoDB initialization script
├── 📄 .gitignore                   # Git ignore patterns
└── 📄 README.md                    # This documentation file
```

## ⚙️ Prerequisites

### Option 1: Local Development
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **MongoDB**: v5.0 or higher
- **Git**: Latest version

### Option 2: Docker (Recommended)
- **Docker**: v20.10.0 or higher
- **Docker Compose**: v2.0.0 or higher

### System Requirements
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free space
- **OS**: Windows 10/11, macOS 10.15+, or Linux

## 🚀 Quick Start

### One-Command Setup with Docker

```bash
# Clone the repository
git clone https://github.com/balasrinivas41/mern-auth-app.git
cd mern-auth-app

# Start all services
docker compose up --build

# Access the application
# Frontend: http://localhost:3001
# Backend: http://localhost:5000
# MongoDB: localhost:27018
```

That's it! Your complete MERN authentication system is now running.

## 📦 Manual Installation

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (edit `.env` file)
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/mern_auth
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   
   # Server Configuration
   PORT=5000
   
   # Environment
   NODE_ENV=development
   ```

5. **Start MongoDB service**
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongod
   sudo systemctl enable mongod
   
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   ```

6. **Verify MongoDB connection**
   ```bash
   mongosh
   # Should connect without errors
   ```

7. **Start backend server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

   **Expected output:**
   ```
   Server running on port 5000
   Connected to MongoDB
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

   **Expected output:**
   ```
   Compiled successfully!
   
   Local:            http://localhost:3000
   On Your Network:  http://192.168.x.x:3000
   ```

### Verification

1. **Backend Health Check**
   ```bash
   curl http://localhost:5000/health
   # Expected: {"status":"OK","timestamp":"..."}
   ```

2. **Frontend Access**
   - Open browser to `http://localhost:3000`
   - Should see login page

## 🐳 Docker Deployment

### Production Deployment

```bash
# Build and start all services
docker compose up --build -d

# View running containers
docker compose ps

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

### Development with Hot Reload

```bash
# Use development configuration
docker compose -f docker-compose.dev.yml up --build

# This enables:
# - Hot reloading for both frontend and backend
# - Volume mounting for live code changes
# - Development-optimized builds
```

### Docker Services Breakdown

| Service | Port | Description |
|---------|------|-------------|
| **frontend** | 3001 | React application with Nginx |
| **backend** | 5000 | Express.js API server |
| **mongodb** | 27018 | MongoDB database |

### Container Management

```bash
# Rebuild specific service
docker compose build backend
docker compose build frontend

# View container logs
docker compose logs backend
docker compose logs frontend
docker compose logs mongodb

# Execute commands in containers
docker compose exec backend npm run test
docker compose exec frontend npm run build

# Clean up everything
docker compose down -v
docker system prune -a
```

## 🔧 Configuration

### Environment Variables

#### Backend Configuration (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/mern_auth` | Yes |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `PORT` | Server port number | `5000` | No |
| `NODE_ENV` | Environment mode | `development` | No |

#### Frontend Configuration

The frontend uses environment variables for API endpoints:

```env
# .env (in frontend directory)
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NODE_ENV=development
```

### Database Configuration

MongoDB configuration for different environments:

```javascript
// Development
mongodb://localhost:27017/mern_auth

// Production (with authentication)
mongodb://username:password@localhost:27017/mern_auth?authSource=admin

// Docker
mongodb://mongodb:27017/mern_auth

// Cloud (MongoDB Atlas)
mongodb+srv://username:password@cluster.mongodb.net/mern_auth
```

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://your-domain.com`

### Authentication Endpoints

#### 1. User Registration

**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "string (3-20 characters, required)",
  "password": "string (6+ characters, required)"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "608c4b2c5f1b4f001f647820",
    "username": "testuser"
  }
}
```

**Error Responses:**
```json
// 400 - Validation Error
{
  "message": "Username and password are required"
}

// 400 - User Exists
{
  "message": "Username already exists"
}

// 500 - Server Error
{
  "message": "Server error"
}
```

**Example Usage:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepassword123"
  }'
```

#### 2. User Login

**POST** `/api/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "608c4b2c5f1b4f001f647820",
    "username": "testuser"
  }
}
```

**Error Responses:**
```json
// 400 - Invalid Credentials
{
  "message": "Invalid credentials"
}

// 400 - Missing Fields
{
  "message": "Username and password are required"
}
```

**Example Usage:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepassword123"
  }'
```

#### 3. Health Check

**GET** `/health`

Check API server status.

**Success Response (200):**
```json
{
  "status": "OK",
  "timestamp": "2023-12-07T10:30:00.000Z"
}
```

### JWT Token Usage

Include the JWT token in the Authorization header for protected routes:

```bash
curl -X GET http://localhost:5000/api/protected \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Token Payload:**
```json
{
  "userId": "608c4b2c5f1b4f001f647820",
  "username": "testuser",
  "iat": 1639735800,
  "exp": 1639822200
}
```

## 🔒 Security Implementation

### Password Security

1. **Hashing Algorithm**: bcrypt with salt rounds of 10
2. **Salt Generation**: Automatic per-password salt generation
3. **Timing Attack Protection**: Constant-time comparison

```javascript
// Password hashing implementation
const bcrypt = require('bcrypt');

// Before saving user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password verification
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

### JWT Security

1. **Secret Key**: Strong, environment-specific secret
2. **Expiration**: 24-hour token lifetime
3. **Payload**: Minimal user information only

```javascript
// JWT token generation
const token = jwt.sign(
  { 
    userId: user._id, 
    username: user.username 
  },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
```

### Input Validation

1. **Username**: 3-20 characters, alphanumeric
2. **Password**: Minimum 6 characters
3. **Sanitization**: MongoDB injection prevention

### CORS Configuration

```javascript
// CORS settings
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Security Headers

```javascript
// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

## 🎨 Frontend Components

### Component Architecture

```
App.tsx
├── Login.tsx
├── Register.tsx
└── Dashboard.tsx
```

### Login Component

**File**: `frontend/src/components/Login.tsx`

**Purpose**: User authentication interface

**Key Features**:
- Form validation
- Loading states
- Error handling
- Automatic redirect after login

**State Management**:
```typescript
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```

**Authentication Flow**:
1. User enters credentials
2. Form validation
3. API request to `/api/auth/login`
4. Store JWT token in localStorage
5. Redirect to dashboard

### Register Component

**File**: `frontend/src/components/Register.tsx`

**Purpose**: New user registration interface

**Key Features**:
- Username availability checking
- Password confirmation
- Real-time validation
- Automatic login after registration

**Validation Rules**:
- Username: 3-20 characters
- Password: 6+ characters
- Password confirmation must match

### Dashboard Component

**File**: `frontend/src/components/Dashboard.tsx`

**Purpose**: Protected user interface

**Key Features**:
- Authentication verification
- User information display
- Logout functionality
- Route protection

**Security Implementation**:
```typescript
useEffect(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');

  if (!token || !userData) {
    navigate('/login');
    return;
  }

  setUser(JSON.parse(userData));
}, [navigate]);
```

### Routing Configuration

**File**: `frontend/src/App.tsx`

**Routes**:
- `/` → Redirect to `/login`
- `/login` → Login component
- `/register` → Register component
- `/dashboard` → Dashboard component (protected)

```typescript
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/" element={<Navigate to="/login" />} />
</Routes>
```

### Styling System

**CSS Architecture**:
- Component-based styling
- Responsive design patterns
- CSS variables for theming
- Mobile-first approach

**Key Style Features**:
- Flexbox layouts
- CSS Grid for complex layouts
- Hover effects and transitions
- Form styling with focus states

## 🗄️ Database Schema

### User Collection

**Collection Name**: `users`

**Schema Definition**:
```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});
```

**Indexes**:
```javascript
// Unique index on username
db.users.createIndex({ "username": 1 }, { unique: true });

// Index on creation date for sorting
db.users.createIndex({ "createdAt": 1 });
```

**Sample Document**:
```json
{
  "_id": "ObjectId('608c4b2c5f1b4f001f647820')",
  "username": "johndoe",
  "password": "$2b$10$ZxBxjkO7OqN9xH8V3vNZieMC4fGzJhT...",
  "createdAt": "2023-12-07T10:30:00.000Z",
  "updatedAt": "2023-12-07T10:30:00.000Z",
  "__v": 0
}
```

### Database Operations

**Create User**:
```javascript
const user = new User({ username, password });
await user.save();
```

**Find User**:
```javascript
const user = await User.findOne({ username });
```

**Update User**:
```javascript
await User.findByIdAndUpdate(userId, { $set: updateData });
```

## 🔄 Authentication Flow

### Registration Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database

    U->>F: Enter username/password
    F->>F: Validate input
    F->>B: POST /api/auth/register
    B->>B: Validate data
    B->>D: Check username exists
    D-->>B: Username available
    B->>B: Hash password
    B->>D: Save user
    D-->>B: User created
    B->>B: Generate JWT
    B-->>F: Return token + user data
    F->>F: Store token in localStorage
    F->>F: Redirect to dashboard
```

### Login Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database

    U->>F: Enter credentials
    F->>B: POST /api/auth/login
    B->>D: Find user by username
    D-->>B: Return user data
    B->>B: Compare passwords
    B->>B: Generate JWT
    B-->>F: Return token + user data
    F->>F: Store token in localStorage
    F->>F: Redirect to dashboard
```

### Protected Route Access

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant L as localStorage

    U->>F: Access dashboard
    F->>L: Check for token
    L-->>F: Token exists
    F->>F: Verify token validity
    alt Token valid
        F->>F: Render dashboard
    else Token invalid/expired
        F->>F: Redirect to login
    end
```

## 🛠️ Development Workflow

### Development Setup

1. **Clone and Setup**
   ```bash
   git clone https://github.com/balasrinivas41/mern-auth-app.git
   cd mern-auth-app
   ```

2. **Environment Configuration**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your settings
   
   # Frontend (if needed)
   cd ../frontend
   echo "REACT_APP_API_URL=http://localhost:5000" > .env
   ```

3. **Development Servers**
   ```bash
   # Terminal 1 - MongoDB
   mongod
   
   # Terminal 2 - Backend
   cd backend && npm run dev
   
   # Terminal 3 - Frontend
   cd frontend && npm start
   ```

### Code Organization

**Backend Structure**:
- `server.js`: Express server setup
- `models/`: Database schemas
- `routes/`: API endpoints
- `middleware/`: Custom middleware (future)

**Frontend Structure**:
- `src/components/`: React components
- `src/hooks/`: Custom hooks (future)
- `src/utils/`: Utility functions (future)
- `src/contexts/`: React contexts (future)

### Development Commands

**Backend Commands**:
```bash
npm start        # Production server
npm run dev      # Development with nodemon
npm test         # Run tests (future)
npm run lint     # Code linting (future)
```

**Frontend Commands**:
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
npm run eject    # Eject from Create React App
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Testing Strategy

**Backend Testing** (future implementation):
- Unit tests for models
- Integration tests for routes
- Authentication middleware tests

**Frontend Testing** (future implementation):
- Component unit tests
- Integration tests
- E2E tests with Cypress

## 📊 Technology Stack

### Backend Technologies

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **Node.js** | 18+ | JavaScript runtime | [nodejs.org](https://nodejs.org/) |
| **Express.js** | 4.18+ | Web framework | [expressjs.com](https://expressjs.com/) |
| **MongoDB** | 5.0+ | NoSQL database | [mongodb.com](https://www.mongodb.com/) |
| **Mongoose** | 7.5+ | MongoDB ODM | [mongoosejs.com](https://mongoosejs.com/) |
| **bcrypt** | 5.1+ | Password hashing | [npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt) |
| **jsonwebtoken** | 9.0+ | JWT implementation | [npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |
| **cors** | 2.8+ | CORS middleware | [npmjs.com/package/cors](https://www.npmjs.com/package/cors) |
| **dotenv** | 16.3+ | Environment variables | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) |

### Frontend Technologies

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **React** | 18+ | UI framework | [reactjs.org](https://reactjs.org/) |
| **TypeScript** | 4.9+ | Type safety | [typescriptlang.org](https://www.typescriptlang.org/) |
| **React Router** | 6+ | Client-side routing | [reactrouter.com](https://reactrouter.com/) |
| **Axios** | 1.5+ | HTTP client | [axios-http.com](https://axios-http.com/) |
| **CSS3** | - | Styling | [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS) |

### DevOps & Tools

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **Docker** | 20+ | Containerization | [docker.com](https://www.docker.com/) |
| **Docker Compose** | 2+ | Multi-container orchestration | [docs.docker.com](https://docs.docker.com/compose/) |
| **Nginx** | 1.21+ | Web server (production) | [nginx.org](https://nginx.org/) |
| **Git** | 2.30+ | Version control | [git-scm.com](https://git-scm.com/) |

### Development Dependencies

**Backend**:
- `nodemon`: Development auto-restart
- `eslint`: Code linting (future)
- `jest`: Testing framework (future)
- `supertest`: API testing (future)

**Frontend**:
- `@types/*`: TypeScript type definitions
- `@testing-library/*`: Testing utilities
- `eslint`: Code linting
- `prettier`: Code formatting (future)

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. MongoDB Connection Failed

**Error**:
```
MongoNetworkError: failed to connect to server
```

**Solutions**:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Verify port availability
netstat -tlnp | grep 27017
```

#### 2. Port Already in Use

**Error**:
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions**:
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

#### 3. JWT Token Invalid

**Error**:
```
JsonWebTokenError: invalid token
```

**Solutions**:
- Clear localStorage: `localStorage.clear()`
- Check JWT_SECRET consistency
- Verify token expiration
- Ensure proper token format

#### 4. CORS Errors

**Error**:
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions**:
```javascript
// Update CORS configuration in server.js
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
```

#### 5. Docker Build Failures

**Error**:
```
ERROR [internal] load metadata for docker.io/library/node:18-alpine
```

**Solutions**:
```bash
# Clean Docker cache
docker system prune -a

# Rebuild with no cache
docker compose build --no-cache

# Check Docker daemon
sudo systemctl status docker
```

#### 6. Frontend Build Issues

**Error**:
```
Module not found: Can't resolve 'axios'
```

**Solutions**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for peer dependency issues
npm ls
```

### Environment-Specific Issues

#### Development Environment

**Issue**: Hot reloading not working
**Solution**:
```bash
# For backend (nodemon)
npm install -g nodemon
npm run dev

# For frontend (React)
CHOKIDAR_USEPOLLING=true npm start
```

#### Production Environment

**Issue**: Static files not serving
**Solution**:
```nginx
# Update nginx.conf
location / {
    try_files $uri $uri/ /index.html;
}
```

#### Docker Environment

**Issue**: Container can't connect to MongoDB
**Solution**:
```yaml
# Use service name in docker-compose.yml
MONGODB_URI=mongodb://mongodb:27017/mern_auth
```

### Debugging Tips

1. **Enable Detailed Logging**:
   ```javascript
   // Backend
   app.use((req, res, next) => {
     console.log(`${req.method} ${req.path}`, req.body);
     next();
   });
   ```

2. **Check Network Connectivity**:
   ```bash
   # Test API endpoints
   curl -v http://localhost:5000/health
   
   # Test database connection
   mongosh mongodb://localhost:27017/mern_auth
   ```

3. **Monitor Docker Logs**:
   ```bash
   # Real-time logs
   docker compose logs -f
   
   # Specific service logs
   docker compose logs backend
   ```

### Performance Optimization

1. **Database Indexing**:
   ```javascript
   // Add indexes for frequently queried fields
   db.users.createIndex({ "username": 1 });
   db.users.createIndex({ "createdAt": -1 });
   ```

2. **Frontend Optimization**:
   ```bash
   # Analyze bundle size
   npm run build
   npx webpack-bundle-analyzer build/static/js/*.js
   ```

3. **Memory Usage**:
   ```bash
   # Monitor container resources
   docker stats
   ```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/YOUR_USERNAME/mern-auth-app.git
   cd mern-auth-app
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Contribution Guidelines

#### Code Style
- Use meaningful variable names
- Follow existing patterns
- Add comments for complex logic
- Maintain consistent indentation

#### Commit Messages
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/updates

#### Pull Request Process
1. Update README.md if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Update version numbers if applicable
5. Request review from maintainers

### Development Setup for Contributors

```bash
# Install development dependencies
npm install --include=dev

# Run tests
npm test

# Check code style
npm run lint

# Format code
npm run format
```

### Reporting Issues

When reporting bugs, please include:
- Operating system and version
- Node.js and npm versions
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

### What This Means
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ Liability protection
- ❌ Warranty provided

---

## 🙏 Acknowledgments

- **React Team** for the amazing frontend framework
- **Express.js Team** for the lightweight backend framework
- **MongoDB Team** for the flexible database solution
- **JWT.io** for JWT token standards
- **Docker Team** for containerization technology
- **Open Source Community** for continuous inspiration

---

## 📞 Support & Contact

- **GitHub Issues**: [Create an issue](https://github.com/balasrinivas41/mern-auth-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/balasrinivas41/mern-auth-app/discussions)
- **Email**: balasrinivas41@example.com

---

**⭐ If you find this project helpful, please give it a star on GitHub!**

**🔗 Repository**: https://github.com/balasrinivas41/mern-auth-app

**📝 Last Updated**: December 2023

**🏷️ Version**: 1.0.0