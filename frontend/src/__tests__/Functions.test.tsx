import MockDate from 'mockdate';
import {
  truncateName,
  convertDate,
  get30DaysPriorDate,
} from '../components/Common/Functions/Functions';

describe('truncate name on cards', () => {
  test('on names more than length', () => {
    expect(truncateName('Department of Tourism', 10)).toStrictEqual(
      'Departmen...'
    );
  });
  test('on names less than length', () => {
    expect(truncateName('Inquirer', 10)).toStrictEqual('Inquirer');
  });
  test('on null and undefined', () => {
    expect(truncateName(null, 10)).toStrictEqual('');
  });
});

describe('convert twitter search date', () => {
  test('null input', () => {
    expect(convertDate(null)).toStrictEqual(null);
  });
  test('valid date input', () => {
    expect(convertDate('2021-12-30')).toStrictEqual('202112300000');
  });
});

describe('get date 30 days before', () => {
  test('within the same month', () => {
    MockDate.set('2021-12-31');
    expect(get30DaysPriorDate()).toStrictEqual('2021-12-01');
  });

  test('different months', () => {
    MockDate.set('2021-12-23');
    expect(get30DaysPriorDate()).toStrictEqual('2021-11-23');
  });
});
