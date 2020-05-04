import React from 'react';

import Pages from './pages/index.js';

import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import Layout from './components/layout';

const uri = process.env.API_URI || 'http://localhost:4000/api';
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  uri,
  credentials: 'include',
  link: authLink.concat(httpLink),
  resolvers: {},
  cache,
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Pages />
      </Layout>
    </ApolloProvider>
  );
}

export default App;
