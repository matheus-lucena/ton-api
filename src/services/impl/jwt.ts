import JwtService from '../jwtService';

import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from '../../config/app';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

class JwtServiceImpl implements JwtService {
  client;
  constructor() {
    this.client = CognitoJwtVerifier.create({
      tokenUse: 'access',
      clientId: COGNITO_CLIENT_ID,
      userPoolId: COGNITO_USER_POOL_ID,
    });
  }
  async validate(authorization?: string): Promise<string | undefined> {
    const bearerToken = authorization?.split('Bearer ')[1];
    if (bearerToken) {
      try {
        return (await this.client.verify(bearerToken)).username;
      } catch {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
}

export default JwtServiceImpl;
