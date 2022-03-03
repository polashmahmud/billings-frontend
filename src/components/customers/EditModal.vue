<template>
    <modal v-if="showModal">
        <h3>Edit customer</h3>
        <hr>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Customer name</label>
                <input v-model="customer.name" type="text" class="form-control" id="name" placeholder="Enter customer name">
                <div class="text-danger">{{ validationErrors.name }}</div>
            </div>
            <div class="mb-3">
                <label for="customer_address" class="form-label">Customer Address</label>
                <textarea v-model="customer.address" class="form-control" id="customer_address" rows="3" placeholder="Enter customer address"></textarea>
                <div class="text-danger">{{ validationErrors.address }}</div>
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
                >Edit Customer</button>
            </div>
        </form>
    </modal>
</template>

<script>
import Modal from "../common/Modal";
import Customers from "../../apis/Customers";

export default {
    name: "EditModal",
    components: {Modal},
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        customer: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            loading: false,
            validationErrors: {
                name: "",
                address: "",
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            await Customers.edit(this.customer.id, this.customer)
                .then(response => {
                    this.$emit("close", false);
                    this.$emit("updated", response.data.customer);
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