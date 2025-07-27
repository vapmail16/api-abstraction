# ScholarWeave Backend

A modern academic research management platform backend with PostgreSQL and MongoDB support, built with TypeScript, Express, and Prisma.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- npm or yarn

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL database
./scripts/setup-database.sh
```

#### Option B: Manual Setup

1. Install PostgreSQL locally
2. Create databases:
   ```sql
   CREATE DATABASE scholar_weave;
   CREATE DATABASE scholar_weave_test;
   ```
3. Update `.env` file with your database credentials

### 3. Environment Configuration

Copy the example environment file and update it:

```bash
cp env.example .env
```

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/scholar_weave"
TEST_DATABASE_URL="postgresql://username:password@localhost:5432/scholar_weave_test"
```

### 4. Database Migrations

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## 🏗️ Architecture

### Database Abstraction Layer

The backend implements a plug-and-play database architecture:

- **Repository Pattern**: Abstract interfaces for database operations
- **Factory Pattern**: Easy switching between PostgreSQL and MongoDB
- **TDD Approach**: Test-driven development with comprehensive test coverage

### Project Structure

```
backend/
├── src/
│   ├── config/           # Database and app configuration
│   ├── interfaces/       # Repository interfaces
│   ├── repositories/     # Database implementations
│   │   ├── postgres/     # PostgreSQL implementations
│   │   └── mongodb/      # MongoDB implementations (future)
│   ├── services/         # Business logic layer
│   ├── controllers/      # API endpoints
│   ├── middleware/       # Express middleware
│   ├── types/           # TypeScript type definitions
│   └── __tests__/       # Test files
├── prisma/              # Database schema and migrations
├── database/            # Database initialization scripts
├── scripts/             # Setup and utility scripts
└── docker-compose.yml   # Database containers
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage
```

### Test Database

The test suite uses a separate test database:

```bash
# Start test database
docker-compose --profile test up -d postgres-test
```

## 📊 Database Schema

### Core Entities

- **Papers**: Research papers with metadata, authors, and citations
- **Authors**: Paper authors with affiliations
- **Citations**: Citation relationships between papers
- **Notes**: Research notes with annotations
- **Annotations**: Highlights, comments, and bookmarks

### Key Features

- Full-text search with PostgreSQL
- Citation network analysis
- Flexible metadata storage (JSON)
- Optimized indexes for performance

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:migrate       # Run migrations
npm run db:generate      # Generate Prisma client
npm run db:seed          # Seed database
npm run db:reset         # Reset database

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Linting
npm run lint             # Check code style
npm run lint:fix         # Fix code style issues
```

### Database Operations

```bash
# Start database
docker-compose up -d postgres

# Stop database
docker-compose down

# View logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d postgres
npm run db:migrate
```

## 🚀 Deployment

### Production Setup

1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations: `npm run db:migrate`
4. Build application: `npm run build`
5. Start server: `npm start`

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/scholar_weave` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `JWT_SECRET` | JWT signing secret | Required for auth |

## 🤝 Contributing

1. Follow TDD approach (write tests first)
2. Ensure all tests pass
3. Follow TypeScript strict mode
4. Use conventional commit messages

## 📝 License

MIT License - see LICENSE file for details 