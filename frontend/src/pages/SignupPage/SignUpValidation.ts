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
  } else if (value.password !== value.confirmedPassword) {
    errors.password = "Passwords don't match";
  }
  return errors;
}
