import { validate } from '../pages/SignInPage/SignInValidation';
import { SigninInput } from '../types.generated';

describe('on sign in', () => {
  test('empty username and password', () => {
    const values: SigninInput = {
      userName: '',
      password: '',
    };
    const errors = {
      userName: 'Please enter your username',
      password: 'Please enter your password',
      invalidInput: false,
    };
    expect(validate(values, true)).toStrictEqual(errors);
  });

  test('no password input ', () => {
    const values: SigninInput = {
      userName: 'sqoopUser',
      password: '',
    };
    const errors = {
      userName: '',
      password: 'Please enter your password',
      invalidInput: false,
    };
    expect(validate(values, true)).toStrictEqual(errors);
  });

  test('no username input', () => {
    const values: SigninInput = {
      userName: '',
      password: '1234+ABc',
    };
    const errors = {
      userName: 'Please enter your username',
      password: '',
      invalidInput: false,
    };
    expect(validate(values, true)).toStrictEqual(errors);
  });
  test('invalid credentials', () => {
    const values: SigninInput = {
      userName: 'sqoop@gmail.com',
      password: '1234+ABc',
    };
    const errors = {
      userName: '',
      password: '',
      invalidInput: true,
    };
    expect(validate(values, true)).toStrictEqual(errors);
  });
  test('valid credentials', () => {
    const values: SigninInput = {
      userName: 'sqoop@gmail.com',
      password: '1234+ABc',
    };
    const errors = {
      userName: '',
      password: '',
      invalidInput: false,
    };
    expect(validate(values, false)).toStrictEqual(errors);
  });
});
