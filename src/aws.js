const serverlessExpress = require('@codegenie/serverless-express');
const app = require('./index');
exports.handler = serverlessExpress({ app });
