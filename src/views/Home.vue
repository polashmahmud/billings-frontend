<template>
    <div class="text-center mt-5">
        <div v-if="!isAuthenticated">
            <h1>Welcome to Awesome Billing App!</h1>
            <p class="mt-3">
                This is a simple billing app made with Vue.js. And Laravel.
            </p>
        </div>

        <div v-if="isAuthenticated">
            <h1>Welcome, {{ user.name }}!</h1>
            <p class="mt-3">
                This is a simple billing app made with Vue.js. And Laravel.
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "Home",
    computed: {
        ...mapGetters('auth', ['user', 'isUser', 'isCustomer', 'isAuthenticated'])
    },

}
</script>

<style scoped>

</style>