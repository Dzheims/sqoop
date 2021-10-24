import { Maybe, SigninInput } from '../../types.generated';

export interface FormValues {
  userName?: Maybe<string> | undefined;
  password?: Maybe<string> | undefined;
}

// export interface SignInForm {
//   forms?: FormValues;
//   jwtIsNull?: Maybe<boolean>;
// }

export function validate(value: SigninInput) {
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
  //   if (jwtIsNull) {
  //     errors.nullMessage = 'User does not exist';
  //   }
  return errors;
}
