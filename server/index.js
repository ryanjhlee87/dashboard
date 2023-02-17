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

// data import for initial data insertion
import User from './models/User.js';
import Transaction from './models/Transaction.js';
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
} from './data/index.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import OverallStat from './models/OverallStat.js';

// Config
dotenv.config();
const app = express();
app.use(express.json());
// helmet is for information security between client and server.
// it sends various HTTP headers automatically to do so
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
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

// Mongoose setup
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

const connectDBAndRunServer = async () => {
  try {
    mongoose.set('strictQuery', false);
    const database = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (database) {
      // MARK: - For the initial data insertion only
      // User.insertMany(dataUser);
      // Product.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);
      // Transaction.insertMany(dataTransaction);
      // OverallStat.insertMany(dataOverallStat);

      console.log('Mongoose Connected');
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    }
  } catch (error) {
    console.log(`${error}, did not connect`);
  }
};

connectDBAndRunServer();
