# MERN Stack Authentication App

A full-stack authentication application built with MongoDB, Express.js, React, and Node.js. Features user registration, login, and protected routes with JWT authentication.

## Features

- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ Protected Dashboard route
- ✅ Password hashing with bcrypt
- ✅ Responsive design
- ✅ Error handling and loading states
- ✅ TypeScript support in frontend
- ✅ Docker support for easy deployment

## Project Structure

```
├── backend/
│   ├── models/User.js          # User model with bcrypt password hashing
│   ├── routes/auth.js          # Authentication routes (login, register)
│   ├── server.js               # Express server with MongoDB connection
│   ├── package.json            # Backend dependencies
│   ├── .env                    # Environment variables
│   └── Dockerfile              # Docker configuration for backend
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.tsx       # Login form component
│   │   │   ├── Register.tsx    # Registration form component
│   │   │   └── Dashboard.tsx   # Protected dashboard component
│   │   ├── App.tsx             # Main app with routing
│   │   └── App.css             # Application styles
│   ├── package.json            # Frontend dependencies
│   └── Dockerfile              # Docker configuration for frontend
├── docker-compose.yml          # Docker compose configuration
└── README.md                   # This file
```

## Prerequisites

### Option 1: Local Development
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn

### Option 2: Docker (Recommended)
- Docker
- Docker Compose

## Installation & Setup

### 🐳 Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/balasrinivas41/mern-auth-app.git
   cd mern-auth-app
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27018

That's it! The application will be running with all services containerized.

### 🔧 Manual Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```
   MONGODB_URI=mongodb://localhost:27017/mern_auth
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Start MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongod
   
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   ```

5. **Start backend server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start frontend server**
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Request/Response Examples

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/mern_auth
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

### Frontend
No environment variables required for basic setup.

## Docker Commands

### Build and run all services
```bash
docker compose up --build
```

### Run in detached mode
```bash
docker compose up -d
```

### Stop all services
```bash
docker compose down
```

### View logs
```bash
docker compose logs -f
```

### Rebuild specific service
```bash
docker compose build backend
docker compose build frontend
```

### Check container status
```bash
docker compose ps
```

## Development Workflow

1. **Start the application**
   ```bash
   # With Docker
   docker compose up
   
   # Or manually
   # Terminal 1: Start MongoDB (sudo systemctl start mongod)
   # Terminal 2: cd backend && npm run dev
   # Terminal 3: cd frontend && npm start
   ```

2. **Make changes**
   - Backend changes will auto-reload with nodemon
   - Frontend changes will auto-reload with React dev server

3. **Test the application**
   - Register a new user
   - Login with credentials
   - Access protected dashboard

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - Frontend framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **nodemon** - Development auto-reload

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token authentication
- Input validation
- CORS configuration
- Environment variable protection

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```
   Solution: Ensure MongoDB is running
   - Check: mongo --version
   - Start: sudo systemctl start mongod
   ```

2. **Port Already in Use**
   ```
   Solution: Change ports in configuration
   - Backend: Update PORT in .env
   - Frontend: Set PORT=3001 in package.json scripts
   ```

3. **CORS Errors**
   ```
   Solution: Backend already configured for CORS
   - Check backend is running on port 5000
   - Verify frontend makes requests to http://localhost:5000
   ```

4. **Docker Build Fails**
   ```
   Solution: Clean Docker cache
   docker compose down
   docker system prune -a
   docker compose up --build
   ```

5. **Port Conflicts**
   ```
   If ports 3001, 5000, or 27018 are in use:
   - Modify ports in docker-compose.yml
   - Or stop conflicting services
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the logs: `docker-compose logs -f`
3. Create an issue in the repository

---

**Happy coding! 🚀**