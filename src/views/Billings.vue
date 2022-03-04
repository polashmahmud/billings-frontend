<template>
    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>My Bills</h3>
            </div>
        </div>

        <div class="col-4 mt-5">
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
        </div>

        <div class="col-8 mt-5">
            <div class="card mb-2">
                <div class="card-body d-flex justify-content-end align-items-center">
                    <button
                        @click.prevent="filterByStatus('all')"
                        class="btn btn-primary btn-sm"
                    >All</button>
                    <button
                        @click.prevent="filterByStatus('paid')"
                        class="btn btn-success btn-sm ms-2"
                    >Paid</button>
                    <button
                        @click.prevent="filterByStatus('unpaid')"
                        class="btn btn-warning btn-sm ms-2"
                    >Unpaid</button>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Bill No#</th>
                            <th scope="col">Month</th>
                            <th scope="col">Bill Amount</th>
                            <th scope="col">Bill Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="bill in bills" :key="bill.id">
                            <th scope="row">{{ bill.id }}</th>
                            <td>{{ bill.bill_no }}</td>
                            <td>{{ bill.bill_date | formatMonth }}</td>
                            <td>{{ bill.bill_amount }}</td>
                            <td>
                                <span
                                    class="badge rounded-pill"
                                    :class="{
                                        'bg-success': bill.bill_status === 'paid',
                                        'bg-danger': bill.bill_status === 'unpaid',
                                    }"
                                >{{ bill.bill_status | ucFirst }}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Customer from "@/apis/Customer";
import _ from "lodash";

export default {
    name: "Billing",
    data() {
        return {
            customer: {},
            bills: [],
            tempBills: [],
        }
    },
    mounted() {
        this.getBills();
    },
    methods: {
        async getBills() {
            await Customer.bills()
                .then(response => {
                    this.customer = response.data.customer;
                    this.bills = response.data.bills;
                    this.tempBills = response.data.bills;
                })
                .catch(error => {
                    this.$swal('Error', 'Something went wrong! please try again later.', 'error')
                });
        },
        filterByStatus(status) {
            if (status === 'all') {
                this.bills = this.tempBills;
            } else {
                this.bills = _.filter(this.tempBills, ['bill_status', status]);
            }
        },
    }
}
</script>

<style scoped>

</style>