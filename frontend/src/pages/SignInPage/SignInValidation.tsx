import { Maybe } from '../../types.generated';

export interface FormValues {
  userName?: Maybe<string> | undefined;
  password?: Maybe<string> | undefined;
}

export interface Errors {
  userName?: Maybe<string> | undefined;
  password?: Maybe<string> | undefined;
  invalidInput?: boolean | undefined;
}

export interface LoginInput {
  userName: string;
  password: string;
  showPassword: boolean;
}

export function validate(value: LoginInput, jwtIsNull: boolean) {
  const errors = {
    userName: '',
    password: '',
    invalidInput: false,
  };

  if (!value.userName) {
    errors.userName = 'Please enter your username';
  }
  if (!value.password) {
    errors.password = 'Please enter your password';
  }
  if (jwtIsNull && value.userName && value.password) {
    errors.invalidInput = true;
  }
  return errors;
}
