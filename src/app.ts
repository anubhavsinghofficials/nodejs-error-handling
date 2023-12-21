import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/user-routes.js';
import { getErrorDetails } from './utils/error-handlers/get-error-details.js';
import connectToDatabase from './config/db-connection.js';
const PORT = process.env.PORT || 8000;

const app = express();
connectToDatabase();

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const { message, statusCode } = getErrorDetails(err);
  res.status(statusCode).json({ message });
});

const server = app.listen(PORT, () => {
  console.log(`> listening at port ${PORT}`);
});

// Shutting the application asap is necessary here
process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('> Shutting down the server due to Uncaught Exception');
  server.close(() => {
    console.log('> Server closed, Now exiting node process');
    process.exit(1);
  });
});

// Shutting the application is not always a necessity here (depending on the case)
process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('> Shutting down the server due to Unhandled Promise Rejection');
  server.close(() => {
    console.log('> Server closed, Now exiting node process');
    process.exit(1);
  });
});

export default server;
