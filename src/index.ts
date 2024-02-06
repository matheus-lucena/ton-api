import express from 'express';
import { router as authRoute } from './routes/auth';
import { router as productsRoute } from './routes/products';
import { router as shopRoute } from './routes/shop';
import { errorResponder, errorLogger, requestLogger } from './middleware/error';
import AuthMiddleware from './middleware/auth';
import bodyParser from 'body-parser';
import JwtServiceImpl from './services/impl/jwt';

const app = express();

app.use(requestLogger);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json(),
);

const jwtServiceImpl = new JwtServiceImpl();
const authMiddleware = new AuthMiddleware(jwtServiceImpl);
app.use('/auth/', authRoute);
app.use('/products', authMiddleware.isAuthorized, productsRoute);
app.use('/shop', authMiddleware.isAuthorized, shopRoute);

app.use(errorLogger);
app.use(errorResponder);

export { app };
