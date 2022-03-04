<template>
    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>Bills</h3>
                <button
                    @click.prevent="$router.push('/customers')"
                    class="btn btn-secondary"
                >Back
                </button>
            </div>
        </div>

        <alert
            class="mt-5"
            v-if="!!message"
            type="success"
            :message="message"
            @close="message = ''"
        />

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
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-end">
                        <button
                            @click.prevent="showBillAddModal = true"
                            class="btn btn-primary btn-sm"
                        >Add Bill</button>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Bill No#</th>
                            <th scope="col">Month</th>
                            <th scope="col">Bill Amount</th>
                            <th scope="col">Bill Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="bill in bills" :key="bill.id">
                            <th scope="row">{{ bill.id }}</th>
                            <td>{{ bill.bill_no }}</td>
                            <td>{{ bill.bill_date | formatMonth }}</td>
                            <td>{{ bill.bill_amount }}</td>
                            <td>{{ bill.bill_status }}</td>
                            <td width="300">
                                <button
                                    @click.prevent="openModal(bill)"
                                    class="btn btn-secondary btn-sm"
                                >Show
                                </button>
                                <button
                                    class="btn btn-dark btn-sm ms-2"
                                >Make Paid
                                </button>
                                <button
                                    @click.prevent="deleteBill(bill)"
                                    class="btn btn-danger btn-sm ms-2"
                                >Delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <pagination
                        :page-count="pagination.pageCount"
                        :page-range="pagination.pageRange"
                        :margin-pages="pagination.marginPages"
                        @changePage="currentPage = $event"
                    />
                </div>
            </div>
        </div>

<!--        bill add modal-->
        <bill-add-modal
            :showModal="showBillAddModal"
            @close="showBillAddModal = false"
            @added="bills.unshift($event)"
            @message="message = $event"
        />
        <!--bill details modal-->
        <bill-details-modal
            :showModal="showBillDetailsModal"
            @close="showBillDetailsModal = false"
            :bill="bill"
        />
    </div>
</template>

<script>
import Pagination from "@/components/common/Pagination";
import Alert from "@/components/common/Alert";
import Bill from "@/apis/Bill";
import BillAddModal from "@/components/bills/AddModal";
import BillDetailsModal from "@/components/bills/BillDetailsModal";
import _ from "lodash";

export default {
    name: "Bill",
    components: {Pagination, BillAddModal, Alert, BillDetailsModal},
    props: ["id"],
    data() {
        return {
            pagination: {
                pageCount: 0,
                pageRange: 0,
                marginPages: 2
            },
            customer: {},
            bills: [],
            bill: {},
            showBillAddModal: false,
            showBillDetailsModal: false,
            message: ''
        }
    },
    mounted() {
        this.getBills();
    },
    methods: {
        async getBills() {
            await Bill.index(this.id)
                .then(response => {
                    this.customer = response.data.customer;
                    this.bills = response.data.bills.data;
                    this.pagination.pageCount = response.data.bills.last_page;
                    this.pagination.pageRange = response.data.bills.per_page;
                });
        },
        openModal(bill) {
            this.bill = _.cloneDeep(bill);
            this.showBillDetailsModal = true;
        },
        deleteBill(bill) {
            this.$swal({
                title: 'Are you sure?',
                text: 'You can\'t revert your action',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes Delete it!',
                cancelButtonText: 'No, Keep it!',
                showCloseButton: true,
                showLoaderOnConfirm: true
            }).then((result) => {
                if(result.value) {
                    this.callToDeleteBillApi(bill);
                }
            })
        },

        async callToDeleteBillApi(bill) {
            await Bill.destroy(this.id, bill.id)
                .then(response => {
                    let index = this.bills.findIndex(b => b.id === bill.id);
                    this.bills.splice(index, 1);
                    this.$swal('Deleted', 'You successfully deleted this bill', 'success')
                })
                .catch(error => {
                    this.$swal('Error', 'Something went wrong! please try again later.', 'error')
                })
        },
    },
    watch: {
        'message': {
            handler(value) {
                if (value) {
                    setTimeout(() => {
                        this.message = '';
                    }, 3000);
                }
            },
            immediate: true
        }
    }
}
</script>

<style scoped>

</style>