/* eslint-disable no-unused-vars */

interface JwtService {
  validate(authorization?: string): Promise<string | undefined>;
}

export default JwtService;
