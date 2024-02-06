import express from 'express';
import { APP_PORT } from './config/app';
import { router as authRoute } from './routes/auth';
import { router as productsRoute } from './routes/products';
import { router as storeRoute } from './routes/store';
import { errorResponder, errorLogger, requestLogger } from './middleware/error';
import AuthMiddleware from './middleware/auth';
import bodyParser from 'body-parser';

const app = express();

app.use(requestLogger);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json(),
);

const authMiddleware = new AuthMiddleware();
app.use('/auth/', authRoute);
app.use('/products', authMiddleware.isAuthorized, productsRoute);
app.use('/store', authMiddleware.isAuthorized, storeRoute);

app.use(errorLogger);
app.use(errorResponder);

app.listen(APP_PORT, () => {
  console.log(`Example app listening on port ${APP_PORT}`);
});

export { app };
