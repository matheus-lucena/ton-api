import * as dotenv from 'dotenv';

dotenv.config();

export const APP_PORT = process.env.APP_PORT || 3000;
export const AWS_REGION = process.env.AWS_DEFAULT_REGION || 'us-east-1';
export const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID || 'default';
export const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID || 'default';
export const COGNITO_SECRET = process.env.COGNITO_SECRET || 'default';

export const DYNAMODB_PRODUCTS_TABLE = process.env.DYNAMODB_PRODUCTS_TABLE || 'default';
export const DYNAMODB_HISTORY_TABLE = process.env.DYNAMODB_HISTORY_TABLE || 'default';
export const DYNAMODB_PRODUCTS_ACTIVE_GSI = process.env.DYNAMODB_PRODUCTS_ACTIVE_GSI || 'default';
