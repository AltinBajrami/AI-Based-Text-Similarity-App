import 'express-async-errors';
import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//routers
import compareRouter from './routes/compareRoutes.js';

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/compare', compareRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
