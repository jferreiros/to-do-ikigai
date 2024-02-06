import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import connectDB from './utils/database';
import routes from './routes';

const app = express();
const httpServer: HTTPServer = createServer(app);
const io = new SocketIOServer(httpServer);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use('/api', routes);


const startServer = async () => {
    await connectDB(); 
    httpServer.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  };
  
  startServer().catch(console.error);

  io.on('connection', (socket) => {
    console.log('A user connected');
  });

  app.set('io', io); 
