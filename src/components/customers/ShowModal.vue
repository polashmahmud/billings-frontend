<template>
    <modal v-if="showModal">
        <h3>User Details</h3>
        <hr>
        <div class="card">
            <div class="card-body">
                <h5 v-if="customer.hasOwnProperty('name')" class="card-title">{{ customer.name }}</h5>
                <p v-if="customer.hasOwnProperty('email')" class="text-muted">{{ customer.email }}</p>
                <p v-if="customer.hasOwnProperty('address')" class="card-text">{{ customer.address }}</p>
            </div>
            <div v-if="customer.hasOwnProperty('created_at')" class="card-footer">
                <small class="text-muted">Join: {{ customer.created_at | diffForHuman }}</small>
            </div>
        </div>
        <div class="d-flex justify-content-end mt-5">
            <button
                @click.prevent="$emit('close', false)"
                class="btn btn-secondary"
            >Close</button>
        </div>
    </modal>
</template>

<script>
import Modal from "../common/Modal";
import Customers from "../../apis/Customers";

export default {
    name: "ShowModal",
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
    }
}
</script>

<style scoped>

</style>