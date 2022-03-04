import Api from "./Api";

export default {
    index(customer) {
        return Api.get(`/customers/${customer}/bills`);
    },
    store(customer, data) {
        return Api.post(`/customers/${customer}/bills`, data);
    },
    destroy(customer, id) {
        return Api.delete(`/customers/${customer}/bills/${id}`);
    },
    pay(customer, id) {
        return Api.post(`/customers/${customer}/bills/${id}/pay`);
    },
}