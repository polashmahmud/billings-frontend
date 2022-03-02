<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="check" viewBox="0 0 16 16">
                <title>Check</title>
                <path
                    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </symbol>
        </svg>

        <div class="container py-3">
            <navbar />

            <main>
                <div class="row mt-5">
                    <div class="col-12 d-flex justify-content-center mb-5">
                        <select class="form-select w-50" aria-label="Default select example">
                            <option value="user">User Login</option>
                            <option value="customer">Customer Login</option>
                        </select>
                    </div>

                    <div class="col-6 offset-3">
                        <div class="card mb-4 rounded-3 shadow-sm border-primary">
                            <div class="card-header py-3 text-white bg-primary border-primary">
                                <h4 class="my-0 fw-normal">Sign in with credentials</h4>
                            </div>
                            <div class="card-body">
                                <form @submit.prevent="handleSubmit">
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email address</label>
                                        <input v-model="formData.email" type="email" class="form-control"
                                               placeholder="username@example.com" id="email">
                                        <div class="text-danger">{{ validationErrors.email }}</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input v-model="formData.password" type="password" class="form-control"
                                               placeholder="********" id="password">
                                        <div class="text-danger">{{ validationErrors.password }}</div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import Login from "../apis/Login";
import Alert from "../components/common/Alert";
import Navbar from "../components/layouts/Navbar";
import loginActions from "../mixins/loginActions";

export default {
    name: "Login",
    mixins: [loginActions],
    components: {Navbar, Alert},
    data() {
        return {
            formData: {
                email: 'newton62@example.net',
                password: 'password'
            },
            loginType: 'customer',
            validationErrors: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions('auth', ['setUser', 'setToken', 'setUserType']),
        handleSubmit() {
             if (this.loginType === 'user') {
                 this.handleUserLogin();
                 console.log('user')
             } else {
                 this.handleCustomerLogin();
                 console.log('customer')
             }
        },
        async handleUserLogin() {
            await Login.user(this.formData)
                .then(response => {
                    this.resetAndRedirectLoginForm(response)
                })
                .catch(error => {
                    this.validationErrors = this.$getValidationErrors(error, this.validationErrors);
                });
        },
        async handleCustomerLogin() {
            await Login.custom(this.formData)
                .then(response => {
                    this.resetAndRedirectLoginForm(response)
                })
                .catch(error => {
                    this.validationErrors = this.$getValidationErrors(error, this.validationErrors);
                });
        },
    }
}
</script>

<style scoped>

</style>