import express from 'express';
import bodyPerser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// Config
dotenv.config();
const app = express();
app.use(express.json());
// helmet is for information security between client and server.
// it sends various HTTP headers automatically to do so
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-orgin' }));
// morgan is to have better logs
app.use(morgan('common'));
app.use(bodyPerser.json());
app.use(bodyPerser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);
