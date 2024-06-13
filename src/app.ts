import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// invalid routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'Not Found',
  });
});

export default app;
