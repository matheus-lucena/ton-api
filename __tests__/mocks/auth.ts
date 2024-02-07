import {
  AdminCreateUserResponse,
  AdminGetUserResponse,
  AdminSetUserPasswordResponse,
  AuthenticationResultType,
} from '@aws-sdk/client-cognito-identity-provider';

export const AuthenticationResult: AuthenticationResultType = {
  AccessToken: 'teste',
  RefreshToken: 'teste',
  ExpiresIn: 300,
};

export const GetUser: AdminGetUserResponse = {
  Username: 'teste',
  UserAttributes: [
    {
      Name: 'sub',
      Value: 'ae304956-0230-4106-99c6-17663e943ac1',
    },
    {
      Name: 'email',
      Value: 'teste@teste.com',
    },
    {
      Name: 'name',
      Value: 'teste',
    },
    {
      Name: 'family_name',
      Value: 'teste',
    },
  ],
  Enabled: true,
};

export const UserPassword: AdminSetUserPasswordResponse = {
  UserPoolId: 'teste',
  Username: 'teste',
  Password: 'teste',
  Permanent: true,
};

export const CreateUser: AdminCreateUserResponse = {
  User: UserPassword,
};
