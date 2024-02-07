import {
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AdminSetUserPasswordCommandInput,
  AdminSetUserPasswordCommand,
  AdminGetUserCommand,
  AdminGetUserCommandInput,
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';

import { AWS_REGION, COGNITO_CLIENT_ID, COGNITO_SECRET, COGNITO_USER_POOL_ID } from '../../config/app';

import crypto from 'crypto';
import AuthService from '../authService';

class CognitoServiceImpl implements AuthService {
  client: CognitoIdentityProviderClient;
  constructor() {
    this.client = new CognitoIdentityProviderClient({ region: AWS_REGION });
  }

  createUser = async (email: string, name: string, family_name: string) => {
    const params: AdminCreateUserCommandInput = {
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: email,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: [
        // AttributeListType
        {
          Name: 'name', // required
          Value: name,
        },
        {
          Name: 'family_name', // required
          Value: family_name,
        },
      ],
    };
    const command = new AdminCreateUserCommand(params);
    return await this.client.send(command).then(value => value);
  };

  setUserPassword = async (username: string, password: string) => {
    const params: AdminSetUserPasswordCommandInput = {
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: username,
      Password: password,
      Permanent: true,
    };
    const command = new AdminSetUserPasswordCommand(params);
    return await this.client.send(command).then(value => value);
  };

  getUser = async (username: string) => {
    const params: AdminGetUserCommandInput = {
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: username,
    };
    const command = new AdminGetUserCommand(params);
    return await this.client
      .send(command)
      .then(value => value)
      .catch(() => undefined);
  };

  login = async (username: string, password: string) => {
    const secret_hash = crypto
      .createHmac('SHA256', COGNITO_SECRET)
      .update(username + COGNITO_CLIENT_ID)
      .digest('base64');

    const command = new AdminInitiateAuthCommand({
      ClientId: COGNITO_CLIENT_ID,
      UserPoolId: COGNITO_USER_POOL_ID,
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      AuthParameters: { USERNAME: username, PASSWORD: password, SECRET_HASH: secret_hash },
    });

    return (
      await this.client
        .send(command)
        .then(value => value)
        .catch(() => undefined)
    )?.AuthenticationResult;
  };
}

export default CognitoServiceImpl;
