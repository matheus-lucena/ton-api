import { Request, Response } from 'express';
import { APP_PORT } from './config/app';
import { app } from '.';
import { HttpResult } from './utils/http';

export const healthcheck = async (_req: Request, res: Response) => res.status(200).json(new HttpResult('ok', {}));
// eslint-disable-next-line no-unused-vars
app.use('/healthcheck', healthcheck);
export default app.listen(APP_PORT);
