import express from 'express';
import connectDB from './config/db.js';
import { authRouter } from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { verifyAuthentication } from './middlewares/auth.middleware.js';
import binRouter from './routes/bin.routes.js';
import userRouter from './routes/user.routes.js';
import iotRouter from './routes/iot.routes.js';
import driverRouter from './routes/driver.routes.js';
import pickupRouter from './routes/pickup.routes.js';
import driverLocationRouter from './routes/driverLocation.routes.js';
import alertRouter from './routes/alert.routes.js';
import routeRouter from './routes/route.routes.js';

const app = express();
connectDB();

app.use(cors({
    credentials: true,
    origin: "https://smart-city-dustbin-management.vercel.app/",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', verifyAuthentication, authRouter);
app.use('/api/bins', verifyAuthentication, binRouter);
app.use('/api/users', verifyAuthentication, userRouter);
app.use('/api/iot/esp-32', verifyAuthentication, iotRouter);
app.use('/api/drivers', verifyAuthentication, driverRouter);

app.use('/api/driver', verifyAuthentication, driverLocationRouter);
app.use('/api/pickups', verifyAuthentication, pickupRouter);
app.use('/api/alerts', verifyAuthentication, alertRouter);
app.use('/api.routes', verifyAuthentication, routeRouter);



export default app;