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
import Cookies from 'js-cookie';

import AUTH_TOKEN from './constants';

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
  const token = Cookies.get(AUTH_TOKEN);

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
  link: from([errorLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
