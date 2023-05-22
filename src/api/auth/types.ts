export type UserDto = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  accessToken: string;
};

export type SignInBody = {
  name: string;
  password: string;
};

export type SignUpBody = {
  email: string;
  confirmPassword: string;
} & SignInBody;

export type UpdateUserBody = {
  name: string;
  email: string;
  avatar: File;
};
