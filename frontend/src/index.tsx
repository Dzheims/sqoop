import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CookiesProvider } from 'react-cookie';

import App from './App';
import reportWebVitals from './reportWebVitals';
import client from './apolloClient';
// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
