import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { databaseConnection } from '@/config/database';
import { repositoryFactory } from '@/repositories/RepositoryFactory';

const app = express();
const PORT = process.env['PORT'] || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: databaseConnection.isConnectedToDatabase() ? 'connected' : 'disconnected'
  });
});

// Simple paper endpoint for testing
app.get('/api/papers', async (req, res) => {
  try {
    const paperRepository = repositoryFactory.getPaperRepository();
    const papers = await paperRepository.findAll(10);
    res.json({
      status: 'success',
      data: papers,
      count: papers.length
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Initialize database and start server
async function startServer() {
  try {
    // Connect to database
    await databaseConnection.connect();
    await repositoryFactory.initialize();
    
    console.log('✅ Database connected successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 Papers API: http://localhost:${PORT}/api/papers`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await repositoryFactory.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await repositoryFactory.close();
  process.exit(0);
});

// Start the server
startServer(); 