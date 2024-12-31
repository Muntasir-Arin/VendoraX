import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
            me: {
                read(existing) {
                  return existing;
                },
              },
        },
      },
    },
  });

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth_token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  
  
export const client = new ApolloClient({
    link: authLink.concat(httpLink), 
    cache,
  });
  
export function resetCache() {
    return client.resetStore();
  }
  
export function handleLogout() {
    localStorage.removeItem('auth_token');
    resetCache();
}