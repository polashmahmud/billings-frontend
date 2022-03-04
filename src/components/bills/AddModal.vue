<template>
    <modal v-if="showModal">
        <h3>Add bill</h3>
        <hr>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="bill_no" class="form-label">Bill No</label>
                <input v-model="formData.bill_no" type="text" class="form-control" id="bill_no" placeholder="Enter bill no">
                <div class="text-danger">{{ validationErrors.bill_no }}</div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Bill Month</label>
                        <select class="form-select" v-model="formData.bill_month">
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">June</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label class="form-label">Bill Year</label>
                        <select class="form-select" v-model="formData.bill_year">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label for="bill_amount" class="form-label">Bill Amount</label>
                <input v-model="formData.bill_amount" type="number" class="form-control" id="bill_amount" placeholder="Enter amount">
                <div class="text-danger">{{ validationErrors.password }}</div>
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
                >Add Bill</button>
            </div>
        </form>
    </modal>
</template>

<script>
import Modal from "../common/Modal";
import Bill from "../../apis/Bill";


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
                bill_no: "",
                bill_month: "01",
                bill_year: "2020",
                bill_amount: "",
                customer_id: this.$route.params.id
            },
            loading: false,
            validationErrors: {
                bill_no: "",
                bill_month: "",
                bill_year: "",
                bill_amount: "",
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            await Bill.store(this.$route.params.id, this.formData)
                .then(response => {
                    this.$emit("close", false);
                    this.$emit("added", response.data.bill);
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
                bill_no: "",
                bill_amount: "",
            };
        },
        resetValidation() {
            this.validationErrors = {
                bill_no: "",
                bill_month: "",
                bill_year: "",
                bill_amount: "",
            };
        }
    }
}
</script>

<style scoped>

</style>