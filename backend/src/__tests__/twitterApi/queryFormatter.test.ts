import { queryFormatter } from '../../plugins/twitterApi/queries';

test('query for multiple sources', () => {
  const sources: string[] = [
    'cnnphilippines',
    'inquirerdotnet',
    'DOHgovph',
    'WHO',
  ];
  expect(queryFormatter({ sources, keyword: '' })).toBe(
    '(from:cnnphilippines OR from:inquirerdotnet OR from:DOHgovph OR from:WHO)'
  );
});
test('query source formatter empty sources', () => {
  const sources: string[] = [];
  expect(queryFormatter({ sources, keyword: '' })).toBe('');
});
test('query source formatter one source', () => {
  const sources: string[] = ['DOHgovph'];
  expect(queryFormatter({ sources, keyword: '' })).toBe('(from:DOHgovph)');
});
test('query for keywords', () => {
  expect(queryFormatter({ sources: [], keyword: 'duterte' })).toBe('duterte');
});
test('query for multiple sources and keywords', () => {
  const sources: string[] = ['DOHgovph', 'WHO'];
  expect(queryFormatter({ sources, keyword: 'bong go duterte' })).toBe(
    'bong go duterte (from:DOHgovph OR from:WHO)'
  );
});
test('removing @ on source usernames', () => {
  const sources: string[] = [
    '@@@cnnphilippines',
    'inquirerdotnet',
    '@DOHgovph',
    '@@WHO',
  ];
  expect(queryFormatter({ sources, keyword: '@duterte' })).toBe(
    '@duterte (from:cnnphilippines OR from:inquirerdotnet OR from:DOHgovph OR from:WHO)'
  );
});
