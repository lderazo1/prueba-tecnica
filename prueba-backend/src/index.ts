import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from './datasource';
import processRoutes from './routes/proceso.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/processes', processRoutes);
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => app.listen(process.env.PORT || 3000,
    () => console.log(`🚀 Server en puerto ${process.env.PORT || 3000}`)))
  .catch(console.error);