<template>
    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>Customers</h3>
                <button @click.prevent="showAddModal = true" class="btn btn-primary">Add new customer</button>
            </div>

            <alert
                class="mt-5"
                v-if="!!message"
                type="success"
                :message="message"
                @close="message = ''"
            />

            <div class="card mt-5">
                <div class="card-header">
                    <search
                        @change="searchWithPaginationCustomer"
                        :currentPage="currentPage"
                    />
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="customer in customers" :key="customer.id">
                            <th scope="row">{{ customer.id }}</th>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.email }}</td>
                            <td width="400">
                                <button
                                    class="btn btn-secondary btn-sm"
                                    @click.prevent="openModal(customer, 'show')"
                                >Show</button>
                                <button
                                    @click.prevents="$router.push(`/customers/${customer.id}/bills`)"
                                    class="btn btn-dark btn-sm ms-2"
                                >Bill</button>
                                <button
                                    class="btn btn-info btn-sm ms-2"
                                    @click.prevent="openModal(customer, 'password')"
                                >Change Password</button>
                                <button
                                    @click.prevent="openModal(customer, 'edit')"
                                    class="btn btn-primary btn-sm ms-2"
                                >Edit</button>
                                <button
                                    @click.prevent="deleteCustomer(customer)"
                                    class="btn btn-danger btn-sm ms-2"
                                >Delete</button>
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

        <!-- add customer modal-->
        <customer-add-modal
            :show-modal="showAddModal"
            @close="showAddModal = $event"
            @added="customers.unshift($event)"
            @message="message = $event"
        />

        <!--edit customer modal-->
        <customer-edit-modal
            :show-modal="showEditModal"
            @close="showEditModal = $event"
            @updated="updateCustomer($event)"
            @message="message = $event"
            :customer="customer"
        />

        <!--show customer modal-->
        <customer-show-modal
            :show-modal="showShowModal"
            @close="showShowModal = $event"
            :customer="customer"
        />

        <!--customer password change modal-->
        <customer-password-change-modal
            :show-modal="showPasswordModal"
            @close="showPasswordModal = $event"
            :customer="customer"
            @message="message = $event"
        />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Customers from "@/apis/Customers";
import CustomerAddModal from "@/components/customers/AddModal";
import CustomerEditModal from "@/components/customers/EditModal";
import CustomerShowModal from "@/components/customers/ShowModal";
import CustomerPasswordChangeModal from "@/components/customers/PasswordChangeModal";
import Alert from "@/components/common/Alert";
import Pagination from "@/components/common/Pagination";
import _ from "lodash";
import Search from "@/components/common/Search";

export default {
    name: "Customers",
    components: {Search, Pagination, Alert, CustomerAddModal, CustomerEditModal, CustomerShowModal, CustomerPasswordChangeModal},
    data() {
        return {
            customers: [],
            customer: {},
            pagination: {
                pageCount: 0,
                pageRange: 0,
                marginPages: 2,
            },
            showAddModal: false,
            showEditModal: false,
            showShowModal: false,
            showPasswordModal: false,

            message: '',
            search: '',
            currentPage: 1,
        }
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'isUser', 'isCustomer', 'user'])
    },
    mounted() {
        this.getCustomers();
    },
    methods: {
        async getCustomers(page=1, search='') {
            await Customers.all(page, search)
                .then(response => {
                    this.customers = response.data.data;
                    this.pagination.pageCount = response.data.last_page;
                    this.pagination.pageRange = response.data.per_page;
                })
        },

        openModal(customer, type) {
            this.customer = _.cloneDeep(customer);

            if (type === 'edit') {
                this.showEditModal = true;
            } else if (type === 'show') {
                this.showShowModal = true;
            } else if (type === 'password') {
                this.showPasswordModal = true;
            }
        },

        updateCustomer(customer) {
            let index = this.customers.findIndex(c => c.id === customer.id);
            this.customers[index].name = customer.name;
            this.customers[index].address = customer.address;
        },

        deleteCustomer(customer) {
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
                    this.deleteCustomerApi(customer);
                }
            })
        },

        async deleteCustomerApi(customer) {
            await Customers.delete(customer.id)
                .then(response => {
                    let index = this.customers.findIndex(c => c.id === customer.id);
                    this.customers.splice(index, 1);
                    this.$swal('Deleted', 'You successfully deleted this customer', 'success')
                })
                .catch(error => {
                    this.$swal('Error', 'Something went wrong! please try again later.', 'error')
                })
        },

        searchWithPaginationCustomer(value) {
            this.getCustomers(value.page, value.search);
        }
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