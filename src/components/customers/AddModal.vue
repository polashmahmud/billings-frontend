<template>
    <modal v-if="showModal">
        <h3>Add new customer</h3>
        <hr>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Customer name</label>
                <input v-model="formData.name" type="text" class="form-control" id="name" placeholder="Enter customer name">
                <div class="text-danger">{{ validationErrors.name }}</div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Customer email</label>
                <input v-model="formData.email" type="email" class="form-control" id="email" placeholder="Enter customer email">
                <div class="text-danger">{{ validationErrors.email }}</div>
            </div>
            <div class="mb-3">
                <label for="customer_address" class="form-label">Customer Address</label>
                <textarea v-model="formData.address" class="form-control" id="customer_address" rows="3" placeholder="Enter customer address"></textarea>
                <div class="text-danger">{{ validationErrors.address }}</div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Enter password">
                <div class="text-danger">{{ validationErrors.password }}</div>
            </div>
            <div class="mb-3">
                <label for="password_confirmation" class="form-label">Re-type password</label>
                <input v-model="formData.password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Enter re-type password">
                <div class="text-danger">{{ validationErrors.password_confirmation }}</div>
            </div>

            <div class="d-flex justify-content-end mt-5">
                <button
                    @click.prevent="$emit('close', false)"
                    :disabled="loading"
                    class="btn btn-secondary"
                >Close</button>
                <button
                    :disabled="loading"
                    type="submit"
                    class="btn btn-primary
                    ms-2"
                >Add Customer</button>
            </div>
        </form>
    </modal>
</template>

<script>
import Modal from "../common/Modal";
import Customers from "../../apis/Customers";

export default {
    name: "AddModal",
    components: {Modal},
    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: {
                name: "",
                email: "",
                address: "",
                password: "",
                password_confirmation: ""
            },
            loading: false,
            validationErrors: {
                name: "",
                email: "",
                address: "",
                password: "",
                password_confirmation: ""
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            await Customers.add(this.formData)
                .then(response => {
                    this.$emit("close", false);
                    this.$emit("added", response.data.customer);
                    this.$emit("message", response.data.message);
                    this.resetForm();
                    this.resetValidation();
                })
                .catch(error => {
                    this.validationErrors = this.$getValidationErrors(error, this.validationErrors);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        resetForm() {
            this.formData = {
                name: "",
                email: "",
                address: "",
                password: "",
                password_confirmation: ""
            };
        },
        resetValidation() {
            this.validationErrors = {
                name: "",
                email: "",
                address: "",
                password: "",
                password_confirmation: ""
            };
        }
    }
}
</script>

<style scoped>

</style>