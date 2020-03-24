import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
  })
  const authLink = setContext(() => {
    const token = localStorage.getItem('access-token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });
  console.log(localStorage.getItem('access-token'))
  console.log(process.env.REACT_APP_GRAPHQL_ENDPOINT)
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

export { client }
