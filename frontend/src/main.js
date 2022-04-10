import { createApp, provide, h } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache, gql } from "@apollo/client"
import { DefaultApolloClient } from "@vue/apollo-composable"

import App from './App.vue'

const httpLink = createHttpLink({ uri: "http://localhost:3000/graphql" })

const cache = new InMemoryCache();

const defaultClient = new ApolloClient({
    link: httpLink,
    cache,
});

createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient)
  },
  render: () => h(App)
}).mount('#app')
