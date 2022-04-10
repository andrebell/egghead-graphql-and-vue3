<script setup>
import { ref } from "vue";
import { gql } from '@apollo/client'
import { useQuery, useResult } from '@vue/apollo-composable'
import { useRoute } from "vue-router";

import UpdateCraftForm from "./UpdateCraftForm.vue";

const craftQuery = gql`query($id: ID) {
  Craft(id: $id) {
    id
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
const { result, refetch } = useQuery(craftQuery, { id: route.params.id })
const craft = useResult(result, null, data => data.Craft)

const showModal = ref(false)

function handleRefresh() {
    refetch()
}
</script>

<template>
    {{ JSON.stringify(craft) }}
    <h2 v-if="craft">{{ craft.name }} made by {{ craft.brand }}</h2>

    <p v-if="craft">This craft is {{ craft.age }} months old and costs ${{ craft.price }}.</p>

    <p v-if="craft && craft.owner">The craft is owned by {{ craft.owner.firstName }} {{ craft.owner.lastName }}.</p>
    <p v-else>The craft is available for purchase.</p>

    <button @click="showModal = !showModal">Update</button>

    <div v-if="showModal" class="modal">
        <div class="modal-inner"><UpdateCraftForm :craft="craft" @close="showModal=false" @updated="handleRefresh()"/></div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 400px;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 0 60px 10px rgba(0,0,0,0.6);
    z-index: 1000;
}

.modal-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // margin: 20px;
    padding: 20px;
    // border: 1px solid black;
    overflow: auto;
}
</style>