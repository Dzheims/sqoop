import { SigninInput } from '../../types.generated';

export function validate(value: SigninInput, jwtIsNull: boolean) {
  const errors = {
    userName: '',
    password: '',
  };

  if (!value.userName) {
    errors.userName = 'Please enter your username';
  }
  if (!value.password) {
    errors.password = 'Please enter your password';
  }
  if (jwtIsNull && value.userName && value.password) {
    errors.userName = 'Invalid username or password';
  }
  return errors;
}
