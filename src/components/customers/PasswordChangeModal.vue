<template>
    <modal v-if="showModal">
        <h3>Change Password</h3>
        <hr>
        <form @submit.prevent="handleSubmit">
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
                >Change Password</button>
            </div>
        </form>
    </modal>
</template>

<script>
import Modal from "../common/Modal";
import Customers from "../../apis/Customers";

export default {
    name: "PasswordChangeModal",
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
            formData: {
                password: "",
                password_confirmation: ""
            },
            loading: false,
            validationErrors: {
                password: "",
                password_confirmation: ""
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            await Customers.changePassword(this.customer.id, this.formData)
                .then(response => {
                    this.$emit("close", false);
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
                password: "",
                password_confirmation: ""
            };
        },
        resetValidation() {
            this.validationErrors = {
                password: "",
                password_confirmation: ""
            };
        }
    }
}
</script>

<style scoped>

</style>