<template>
    <div class="row mt-5">
        <div class="col-12 text-center mb-5">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" value="user" v-model="loginType" id="loginType1" autocomplete="off" :checked="loginType === 'user'">
                <label class="btn btn-outline-primary" for="loginType1">I'm User</label>

                <input type="radio" class="btn-check" value="customer" v-model="loginType" id="loginType2" autocomplete="off" :checked="loginType === 'customer'">
                <label class="btn btn-outline-primary"  for="loginType2">I'm Customer</label>
            </div>
        </div>


        <div class="col-6 offset-3">
            <div class="card mb-4 rounded-3 shadow-sm border-primary">
                <div class="card-header py-3 text-white bg-primary border-primary">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="my-0 fw-normal">Sign in with credentials</h4>
                        <h4>{{ loginType | ucFirst }} Login Form</h4>
                    </div>

                </div>
                <div class="card-body">
                    <form ref="loginForm" @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input v-model="formData.email" type="email" class="form-control"
                                   placeholder="username@example.com" id="email">
                            <div class="text-danger">{{ validationErrors.email }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input @keyup.enter="handleSubmit" v-model="formData.password" type="password" class="form-control"
                                   placeholder="********" id="password">
                            <div class="text-danger">{{ validationErrors.password }}</div>
                        </div>
                        <button
                            :disabled="loading"
                            type="submit"
                            class="btn btn-primary"
                        >Login {{ loginType | ucFirst}}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import Login from "../apis/Login";
import loginActions from "../mixins/loginActions";

export default {
    name: "Login",
    mixins: [loginActions],
    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            loginType: 'user',
            validationErrors: {
                email: '',
                password: ''
            },
            loading: false
        }
    },
    methods: {
        ...mapActions('auth', ['setUser', 'setToken', 'setUserType']),
        handleSubmit() {
            this.loading = true;
             if (this.loginType === 'user') {
                 this.handleUserLogin();
             } else {
                 this.handleCustomerLogin();
             }
        },
        async handleUserLogin() {
            await Login.user(this.formData)
                .then(response => {
                    this.resetAndRedirectLoginForm(response)
                })
                .catch(error => {
                    console.log(error)
                    this.validationErrors = this.$getValidationErrors(error, this.validationErrors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async handleCustomerLogin() {
            await Login.custom(this.formData)
                .then(response => {
                    this.resetAndRedirectLoginForm(response)
                })
                .catch(error => {
                    this.validationErrors = this.$getValidationErrors(error, this.validationErrors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    }
}
</script>

<style scoped>

</style>