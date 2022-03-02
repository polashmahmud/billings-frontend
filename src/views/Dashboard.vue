<template>
<div>
    <h1>Dashboard</h1>
    <p>{{ isAuthenticated }}</p>
    <p>{{ isUser }}</p>
    <p>{{ isCustomer }}</p>
    <p>{{ user }}</p>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "Dashboard",
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'isUser', 'isCustomer', 'user'])
    },
}
</script>

<style scoped>

</style>