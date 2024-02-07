import { app } from '.';
import serverless from 'serverless-http';

const handler = serverless(app);
export default handler;
