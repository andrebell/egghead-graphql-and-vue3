<template>
    <li :class="craft.owner ? 'owned' : 'for-sale'">
        <p>
            {{ craft.name }}
            <span
                v-if="craft.owner"
            >This craft is owned by {{ craft.owner.firstName }} {{ craft.owner.lastName }}</span>
            <span
                v-else
            >This craft is available to buy and costs ${{ craft.price.toLocaleString('de') }}</span>
        </p>
    </li>
</template>

<script setup>
defineProps({
    craft: Object,
})
</script>

<style lang="scss" scoped>
.owned {
    background-color: rgba(20, 20, 20, 0.3);
}

.for-sale {
    font-weight: 800;
}

li {
    list-style: none;
    border: 1px solid black;
    border-radius: 4px;
    padding: 6px;
}
</style>