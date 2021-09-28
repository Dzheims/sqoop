import { Maybe } from '../../types.generated';

export interface FormValues {
  userName?: Maybe<string> | undefined;
  password?: Maybe<string> | undefined;
  confirmedPassword?: Maybe<string> | undefined;
}

export function validate(value: FormValues) {
  const errors = {
    userName: '',
    password: '',
    confirmedPassword: '',
  };

  if (!value.userName) {
    errors.userName = 'Please enter your username';
  }
  if (!value.password) {
    errors.password = 'Please enter your password';
  } else if (value.password.length < 8) {
    errors.password = 'Password must be a minimum of 8 characters';
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value.password)) {
    errors.password =
      'Password must include numbers, uppercased and lowercased letters and atleast a special character (! @ # $ & % + -)';
  } else if (!/^[^_\s]*$/.test(value.password)) {
    errors.password = 'Password must not have whitespaces or underscores';
  }
  if (!value.confirmedPassword) {
    errors.confirmedPassword = 'Please confirm your password';
  } else if (value.password !== value.confirmedPassword) {
    errors.confirmedPassword = "Passwords dont't match";
  }
  return errors;
}
