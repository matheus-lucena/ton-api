jest.mock('aws-jwt-verify', () => {
  return {
    CognitoJwtVerifier: { create: jest.fn() },
  };
});
