import express from 'express';
import { APP_PORT } from './config/app';
import { router as authRoute } from './routes/auth';
import { router as productsRoute } from './routes/products';
import { errorResponder, errorLogger, requestLogger, invalidPathHandler } from './middleware/error';
import { clientErrorHandler } from './middleware/client';
import { isAuthorized } from './middleware/auth';
import bodyParser from 'body-parser';

const app = express();

app.use(requestLogger);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use('/auth/', authRoute);
app.use('/products', isAuthorized, productsRoute);

//app.use(clientErrorHandler);
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(APP_PORT, () => {
  console.log(`Example app listening on port ${APP_PORT}`);
});
