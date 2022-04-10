<script setup>
import { gql } from "@apollo/client";
import { reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";

const props = defineProps({
    craft: Object,
})

const emit = defineEmits(['close', 'updated'])

const updateFields = reactive({ ...props.craft })

const updateMutation = gql`
  mutation (
    $name: String
    $type: String
    $brand: String
    $price: String
    $age: Int
    $id: ID!
  ) {
    updateCraft(
      name: $name
      type: $type
      brand: $brand
      price: $price
      age: $age
      id: $id
    ) {
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
  }
`;

const craftQuery = gql`
  query ($id: ID) {
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
  }
`;

const { mutate: updateCraft, onError } = useMutation(updateMutation, () => {
  return {
    variables: {
      id: updateFields.id,
      name: updateFields.name,
      type: updateFields.type,
      brand: updateFields.brand,
      age: Number(updateFields.age),
      price: updateFields.price,
    },
    optimisticResponse: {
      updateCraft: {
        ...updateFields
      }
    }
  };
});

async function handleSubmit(e) {
    emit('close');
    await updateCraft();
    emit('updated')
}
</script>

<template>
    <form @submit.prevent>
        <div class="form-field">
            <label for="craftName">Name of the craft:</label>
            <input id="craftName" type="text" v-model="updateFields.name" />
        </div>
        <div class="form-field">
            <label for="craftType">Type of the craft:</label>
            <input id="craftType" type="text" v-model="updateFields.type" />
        </div>
        <div class="form-field">
            <label for="craftBrand">Brand of the craft:</label>
            <input id="craftBrand" type="text" v-model="updateFields.brand" />
        </div>
        <div class="form-field">
            <label for="craftPrice">Price of the craft:</label>
            <input id="craftPrice" type="text" v-model="updateFields.price" />
        </div>
        <div class="form-field">
            <label for="craftAge">Age of the craft:</label>
            <input id="craftAge" type="text" v-model="updateFields.age" />
        </div>
    </form>
    <button @click="emit('close')">Cancel</button>
    <button @click="handleSubmit()">Update</button>
</template>
    
<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
}

.form-field {
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    margin-bottom: 18px;
    align-items: center;
}

label {
    margin-bottom: 4px;
}
</style>