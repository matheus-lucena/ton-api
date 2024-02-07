export interface UserRequestBody {
  email: string;
  password: string;
  name: string;
  family_name: string;
}

export const UserLoginRequestRule = {
  email: 'required|string|min:3',
  password: 'required|string|min:8',
};

export const UserRegisterRequestRule = {
  name: 'required|string|min:3',
  family_name: 'required|string|min:3',
  email: 'required|string|min:3',
  password: 'required|string|min:8',
};

