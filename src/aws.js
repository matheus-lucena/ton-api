const serverlessExpress = require('@codegenie/serverless-express');
const app = require('.');
exports.handler = serverlessExpress({ app });
