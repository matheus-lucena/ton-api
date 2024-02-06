import { app } from '.';
import serverless from 'serverless-http';

module.exports.handler = serverless(app);
