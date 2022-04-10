<template>
    {{ JSON.stringify(data) }}
</template>

<script setup>
import { gql } from '@apollo/client'
import { useQuery, useResult } from '@vue/apollo-composable'
import { useRoute } from "vue-router";

const craftQuery = gql`query($id: ID) {
  Craft(id: $id) {
    name
    type
    brand
    price
    age
    owner {
      id
      firstName
      lastName
    }
  }
}`;

const route = useRoute()
const { result } = useQuery(craftQuery, {id: route.params.id })
const data = useResult(result, null, data => data.Craft)
</script>

<style lang="scss" scoped>

</style>