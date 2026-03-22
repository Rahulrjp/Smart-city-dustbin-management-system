import express from 'express';
import connectDB from './config/db.js';
import { authRouter } from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { verifyAuthentication } from './middlewares/auth.middleware.js';
import { binRouter } from './routes/bin.routes.js';



const app = express();
connectDB();

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use('/api/v1/auth', verifyAuthentication, authRouter);
app.use('/api', binRouter);

export default app;