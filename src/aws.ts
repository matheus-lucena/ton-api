import { app } from '.';
import serverless from 'serverless-http';

exports.handler = serverless(app);
