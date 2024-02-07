// lambda.js
const serverlessExpress = require('@codegenie/serverless-express')
import { app } from '.';
exports.handler = serverlessExpress({ app })
