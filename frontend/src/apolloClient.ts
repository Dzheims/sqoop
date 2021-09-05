/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import 'cross-fetch/polyfill';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import AUTH_TOKEN from './constants';

// --->> conventional HTTP-based request

// const token = localStorage.getItem(AUTH_TOKEN);

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
//   headers: {
//     authorization: token ? `Bearer ${token}` : '',
//   },
// });

const httpLink = createHttpLink({
  uri: '/graphql',
  // fetch,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (token) {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
