import { validate, FormValues } from '../pages/SignupPage/SignUpValidation';

describe('with and without user input', () => {
  test('empty username and password', () => {
    const values: FormValues = { userName: '', password: '' };
    const errors = {
      userName: 'Please enter your username',
      password: 'Please enter your password',
    };
    expect(validate(values)).toStrictEqual(errors);
  });

  test('valid username and password', () => {
    const values: FormValues = { userName: 'sqoopUser', password: '1234+ABc' };
    const errors = {
      userName: '',
      password: '',
    };
    expect(validate(values)).toStrictEqual(errors);
  });
});

describe('empty username and invalid password', () => {
  test('password less than minimum', () => {
    let values: FormValues = { userName: '', password: 'abc123' };
    let errors = {
      userName: 'Please enter your username',
      password: 'Password must be a minimum of 8 characters',
    };
    expect(validate(values)).toStrictEqual(errors);
  });
  test('password complexity', () => {
    let values: FormValues = { userName: '', password: 'abc123ABC' };
    let errors = {
      userName: 'Please enter your username',
      password:
        'Password must include numbers, uppercased and lowercased letters and atleast a special character (! @ # $ & % + -)',
    };
    expect(validate(values)).toStrictEqual(errors);
  });
  test('password has white spaces', () => {
    let values: FormValues = { userName: '', password: 'abc   123A_BC@' };
    let errors = {
      userName: 'Please enter your username',
      password: 'Password must not have whitespaces or underscores',
    };
    expect(validate(values)).toStrictEqual(errors);
  });
});

describe('valid username and invalid password', () => {
  test('password less than minimum', () => {
    let values: FormValues = { userName: 'sqoopUser', password: 'abc123' };
    let errors = {
      userName: '',
      password: 'Password must be a minimum of 8 characters',
    };
    expect(validate(values)).toStrictEqual(errors);
  });
  test('password complexity', () => {
    let values: FormValues = { userName: 'sqoopUser', password: 'abc123ABC' };
    let errors = {
      userName: '',
      password:
        'Password must include numbers, uppercased and lowercased letters and atleast a special character (! @ # $ & % + -)',
    };
    expect(validate(values)).toStrictEqual(errors);
  });
  test('password less than minimum', () => {
    let values: FormValues = {
      userName: 'sqoopUser',
      password: 'abc   123A_BC@',
    };
    let errors = {
      userName: '',
      password: 'Password must not have whitespaces or underscores',
    };
    expect(validate(values)).toStrictEqual(errors);
  });
});
