import { HttpResult } from '../src/utils/http';
import httpMocks from 'node-mocks-http';

import { describe, it, expect } from '@jest/globals';
import { mockClient } from 'aws-sdk-client-mock';
import { wrapFunction } from '../src/utils/wrapError';
import { LIST_MOCK_PRODUCT } from './mocks/product';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { list } from '../src/controllers/products';
import { NextFunction } from 'express';

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('Utils', () => {
  it('HttpResult', async () => {
    const message: string = 'teste';
    const httpResult = new HttpResult(message, {});
    expect(httpResult.data).toEqual({});
    expect(httpResult.message).toEqual(message);
  });

  it('HttpResultFields', async () => {
    const message: string = 'teste';
    const obj = {
      name: 'nome invalido',
    };
    const httpResult = new HttpResult(message, {}, obj);
    expect(httpResult.data).toEqual({});
    expect(httpResult.message).toEqual(message);
    expect(httpResult.fields).toEqual(obj);
  });

  it('wrapErrorFunction', async () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/teste',
    });
    const response = httpMocks.createResponse();
    ddbMock.on(QueryCommand).resolves({
      Items: LIST_MOCK_PRODUCT,
    });
    // eslint-disable-next-line no-unused-vars
    await wrapFunction(async (_req: Request, _res: Response, _next: NextFunction) => list(request, response));
  });
});
