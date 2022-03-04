import Api from "./Api";

export default {
    index(customer) {
        return Api.get(`/customers/${customer}/bills`);
    },
    store(customer, data) {
        return Api.post(`/customers/${customer}/bills`, data);
    },
}