import { ApolloError } from '@apollo/client';
import { validate, FormValues } from '../pages/SignupPage/SignUpValidation';

describe('with and without user input', () => {
  test('empty username and password', () => {
    const values: FormValues = {
      userName: '',
      password: '',
      confirmedPassword: '',
    };
    const errors = {
      userName: 'Please enter your username',
      password: 'Please enter your password',
      confirmedPassword: 'Please confirm your password',
    };
    expect(validate(values, undefined)).toStrictEqual(errors);
  });

  test('valid username and password', () => {
    const values: FormValues = {
      userName: 'sqoopUser',
      password: '1234+ABc',
      confirmedPassword: '1234+ABc',
    };
    const errors = {
      userName: '',
      password: '',
      confirmedPassword: '',
    };
    expect(validate(values, undefined)).toStrictEqual(errors);
  });
});

describe('empty username and invalid password', () => {
  test('password less than minimum', () => {
    const values: FormValues = {
      userName: '',
      password: 'abc123',
      confirmedPassword: 'abc123',
    };
    const errors = {
      userName: 'Please enter your username',
      password: 'Password must be a minimum of 8 characters',
      confirmedPassword: '',
    };
    expect(validate(values, undefined)).toStrictEqual(errors);
  });
  test('password complexity', () => {
    const values: FormValues = {
      userName: '',
      password: 'abc123ABC',
      confirmedPassword: 'abc123ABC',
    };
    const errors = {
      userName: 'Please enter your username',
      password:
        'Password must include numbers, uppercased and lowercased letters and atleast a special character (! @ # $ & % + -)',
      confirmedPassword: '',
    };
    expect(validate(values, undefined)).toStrictEqual(errors);
  });
  test('password has white spaces', () => {
    const values: FormValues = {
      userName: '',
      password: 'abc   123A_BC@',
      confirmedPassword: 'abc   123A_BC@',
    };
    const errors = {
      userName: 'Please enter your username',
      password: 'Password must not have whitespaces or underscores',
      confirmedPassword: '',
    };
    expect(validate(values, undefined)).toStrictEqual(errors);
  });
});

describe('valid username and invalid password', () => {
  test('password less than minimum', () => {
    const values: FormValues = {
      userName: 'sqoopUser',
      password: 'abc123',
      confirmedPassword: 'abc123',
    };
    const errors = {
      userName: '',
      password: 'Password must be a minimum of 8 characters',
      confirmedPassword: '',
    };
    expect(validate(values, undefined)).toStrictEqual(errors);
  });
  test('password complexity', () => {
    const values: FormValues = {
      userName: 'sqoopUser',
      password: 'abc123ABC',
      confirmedPassword: 'abc123ABC',
    };
    const errors = {
      userName: '',
      password:
        'Password must include numbers, uppercased and lowercased letters and atleast a special character (! @ # $ & % + -)',
      confirmedPassword: '',
    };
    expect(validate(values, undefined)).toStrictEqual(errors);
  });
  test('password less than minimum', () => {
    const values: FormValues = {
      userName: 'sqoopUser',
      password: 'abc   123A_BC@',
      confirmedPassword: 'abc   123A_BC@',
    };
    const errors = {
      userName: '',
      password: 'Password must not have whitespaces or underscores',
      confirmedPassword: '',
    };
    expect(validate(values, undefined)).toStrictEqual(errors);
  });
  test('duplicate username', () => {
    const error = new ApolloError({
      errorMessage:
        'duplicate key value violates unique constraint "users_username_key"',
    });
    const values: FormValues = {
      userName: 'sqoopUser',
      password: '1234+ABc',
      confirmedPassword: '1234+ABc',
    };
    const errors = {
      userName: 'Username already exists',
      password: '',
      confirmedPassword: '',
    };
    expect(validate(values, error)).toStrictEqual(errors);
  });
});
