import { createApp } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache, gql } from "@apollo/client"

import App from './App.vue'

const httpLink = createHttpLink({ uri: "http://localhost:3000/graphql" })

const cache = new InMemoryCache();

const defaultClient = new ApolloClient({
    link: httpLink,
    cache,
});

const query = gql`
  query {
    Crafts {
      edges {
        name
      }
    }
  }
`;

defaultClient.query({ query }).then(data => console.log(data));

createApp(App).mount('#app')
