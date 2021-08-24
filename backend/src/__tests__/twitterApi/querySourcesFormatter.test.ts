import { querySourceFormatter } from '../../api/twitterApi/queries';

test('query source formatter multiple sources', () => {
  const sources: string[] = [
    'cnnphilippines',
    'inquirerdotnet',
    'DOHgovph',
    'WHO',
  ];
  expect(querySourceFormatter(sources)).toBe(
    'from:cnnphilippines OR from:inquirerdotnet OR from:DOHgovph OR from:WHO'
  );
});
test('query source formatter empty sources', () => {
  const sources: string[] = [];
  expect(querySourceFormatter(sources)).toBe('');
});
test('query source formatter one source', () => {
  const sources: string[] = ['DOHgovph'];
  expect(querySourceFormatter(sources)).toBe('from:DOHgovph');
});
