<template>
    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <h3>Dashboard</h3>
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
                    <div class="d-flex align-items-center border bg-white">
                        <input type="text" class="w-100 border-0 p-2" placeholder="Search customer ...">
                        <svg style="width: 20px; height: 20px; margin-left: 15px; margin-right: 15px" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>

                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="customer in customers" :key="customer.id">
                            <th scope="row">{{ customer.id }}</th>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.email }}</td>
                            <td>{{ customer.address }}</td>
                            <td width="200">
                                <button class="btn btn-info btn-sm">Show</button>
                                <button
                                    @click.prevent="openEditModal(customer)"
                                    class="btn btn-primary btn-sm ms-2"
                                >Edit</button>
                                <button class="btn btn-danger btn-sm ms-2">Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <paginate
                        :page-count="pagination.pageCount"
                        :page-range="pagination.pageRange"
                        :margin-pages="pagination.marginPages"
                        :click-handler="functionName"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :container-class="'pagination'"
                        :page-class="'page-item'"
                        :page-link-class="'page-link'"
                        :prev-class="'page-item'"
                        :prev-link-class="'page-link'"
                        :next-class="'page-item'"
                        :next-link-class="'page-link'"
                        :active-class="'active'"
                        :disabled-class="'disabled'"
                    >
                    </paginate>
                </div>
            </div>
        </div>

<!--    add customer modal-->
        <customer-add-modal
            :show-modal="showAddModal"
            @close="showAddModal = $event"
            @added="customers.unshift($event)"
            @message="message = $event"
        />

<!--        edit customer modal-->
        <customer-edit-modal
            :show-modal="showEditModal"
            @close="showEditModal = $event"
            @updated="updateCustomer($event)"
            @message="message = $event"
            :customer="customer"
        />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Paginate from 'vuejs-paginate'
import Customers from "@/apis/Customers";
import CustomerAddModal from "@/components/customers/AddModal";
import CustomerEditModal from "@/components/customers/EditModal";
import Alert from "../components/common/Alert";
import _ from "lodash";

export default {
    name: "Dashboard",
    components: {Alert, Paginate, CustomerAddModal, CustomerEditModal},
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
            message: '',
        }
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'isUser', 'isCustomer', 'user'])
    },
    mounted() {
        this.getCustomers();
    },
    methods: {
        async getCustomers() {
            await Customers.all()
                .then(response => {
                    this.customers = response.data.data;
                    this.pagination.pageCount = response.data.last_page;
                    this.pagination.pageRange = response.data.per_page;
                })
        },
        openEditModal(customer) {
            this.customer = _.cloneDeep(customer);
            this.showEditModal = true;
        },
        updateCustomer(customer) {
            let index = this.customers.findIndex(c => c.id === customer.id);
            this.customers[index].name = customer.name;
            this.customers[index].address = customer.address;
        },
        functionName() {
            console.log('functionName')
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