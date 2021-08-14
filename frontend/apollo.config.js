module.exports = {
  client: {
    service: {
      name: 'backend',
      url: 'http://localhost:5050/graphql',
    },
    excludes: ['**/*.generated.ts'],
  },
};
