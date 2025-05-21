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
import { swaggerDocs } from './config/swagger';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { swaggerConfig } from './config/swagger.config';

const app: Application = express();
// set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for Swagger UI
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

app.use(cors());

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

// Swagger documentation
if (config.env !== 'prod') {
  swaggerDocs(app);
}

// app.use(httpLogger({ logger }));

app.use('/ping', (req: Request, res: Response) => {
  return res.status(200).send({ message: 'Pong ' });
});

// Swagger Documentation
app.use(['/api-docs', '/api-docs/'], swaggerUi.serve);
app.get(['/api-docs', '/api-docs/'], swaggerUi.setup(swaggerConfig, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Job Vacancy API Documentation"
}));

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
