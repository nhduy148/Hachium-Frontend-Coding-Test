import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import TaskController from './controllers/task.controller';
import { seedDatabase } from './database';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3456',
    credentials: true,
  }),
);

app.use(morgan('dev'));

seedDatabase();

// app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to mock-server!' });
});

app.get('/api/seed', async (req, res) => {
  await seedDatabase();
  res.send({ success: true });
});

app.use('/api/tasks', TaskController.router);

const port = process.env.PORT || 2000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
