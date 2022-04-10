<template>
    <h1>Welcome to the Kayak Store</h1>
    <h2>Current Crafts</h2>
    <ul>
        <Craft v-for="craft in data" :key="craft.id" :craft="craft" />
    </ul>
</template>

<script setup>
import { useQuery, useResult } from '@vue/apollo-composable';
import { gql } from '@apollo/client';

import Craft from './Craft.vue'

const craftQuery = gql`
query {
  Crafts {
    edges {
      id
      name
      type
      price
      age
      owner {
        id
        firstName
        lastName
      }
    }
  }
}
`;

const { result } = useQuery(craftQuery)
const data = useResult(result, null, data => data.Crafts.edges)
</script>

<style lang="scss" scoped>
ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8px;
    row-gap: 8px;
    padding: 0;
}
</style>
