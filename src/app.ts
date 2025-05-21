import {
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import route from '@/src/routes';
import mongoConnect from '@/src/dbs/mongo';
import 'dotenv/config';
import httpLogger from 'pino-http';
import logger from '@/src/dbs/logger';
import config from '@/config';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { swaggerConfig } from './config/swagger.config';

const app: Application = express();

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://3.109.123.217',
      undefined // Allow requests with no origin (like mobile apps or curl requests)
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200
};

// set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for Swagger UI
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" },
  crossOriginEmbedderPolicy: false
}));
app.use(morgan('dev')); // Add HTTP request logging

app.use(
  express.json({
    limit: '5mb', // TO be moved to config,
  })
);

// parse urlencoded request body
app.use(
  express.urlencoded({
    extended: false,
    parameterLimit: 10,
    limit: '5mb',
  })
);

// Apply CORS before other middleware
app.use(cors(corsOptions));

// enables the "gzip" / "deflate" compression for response
app.use(compression({ threshold: 2048 }));

// cookie
if (process.env.environment === 'production') {
  app.set('trust proxy', 1); // trust first proxy
}

// TODO sanitize request

// TODO connect dbs
if (config.env !== 'test') {
  mongoConnect();
}

// Swagger Documentation
app.use(['/api-docs', '/api-docs/'], swaggerUi.serve);
app.get(['/api-docs', '/api-docs/'], swaggerUi.setup(swaggerConfig, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Job Vacancy API Documentation"
}));

app.use('/ping', (req: Request, res: Response) => {
  return res.status(200).send({ message: 'Pong ' });
});

// add app routes
route(app);

// All unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Page not found!');
  error.status = 404;
  next(error);
});

// All unhandled errors
app.use((error: any, req: Request, res: Response) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

export default app;
