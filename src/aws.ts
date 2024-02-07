import serverlessExpress from '@codegenie/serverless-express';
import app from './app';

export const handler = await serverlessExpress({ app });
