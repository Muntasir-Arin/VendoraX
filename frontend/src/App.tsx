import React from 'react';
import AppRoutes from './routes';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo-client';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <AppRoutes />
  </ApolloProvider>
);

export default App;