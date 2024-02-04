import express from 'express';
import { APP_PORT } from './config/app';
import { router as authRoute } from './routes/auth';
import { router as productsRoute } from './routes/products';
import { logErrors } from './middleware/log';
import { errorHandler } from './middleware/error';
import { clientErrorHandler } from './middleware/client';
import { isAuthorized } from './middleware/auth';

const app = express();

app.use('/auth/', authRoute);
app.use('/products', isAuthorized, productsRoute);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(APP_PORT, () => {
  console.log(`Example app listening on port ${APP_PORT}`);
});
