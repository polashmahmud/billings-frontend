<template>
    <modal v-if="showModal">
        <h3>Bill Details</h3>
        <hr>
        <div class="card">
            <div class="card-body text-center">
                <h3 v-if="bill.hasOwnProperty('bill_amount')" class="card-title">BDT - {{ bill.bill_amount }}</h3>
                <p v-if="bill.hasOwnProperty('bill_no')" class="text-muted">Bill No# {{ bill.bill_no }}</p>
                <p>
                    <span v-if="bill.hasOwnProperty('bill_month')">{{ bill.bill_month | formatMonth }}</span> -
                    <span v-if="bill.hasOwnProperty('bill_year')">{{ bill.bill_year }}</span>
                </p>
                <span
                    class="badge rounded-pill"
                    :class="bill.bill_status === 'paid' ? 'bg-primary' : 'bg-danger'"
                >{{ bill.bill_status | ucFirst }}
                </span>
            </div>
            <div v-if="bill.hasOwnProperty('created_at')" class="card-footer text-center">
                <small class="text-muted">Bill Generate: {{ bill.created_at | dateWithMonth }}</small>
            </div>
        </div>
        <div class="d-flex justify-content-end mt-5">
            <button
                @click.prevent="$emit('close', false)"
                class="btn btn-secondary"
            >Close
            </button>
        </div>
    </modal>
</template>

<script>
import Modal from "../common/Modal";


export default {
    name: "BillDetailsModal",
    components: {Modal},
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        bill: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style scoped>

</style>