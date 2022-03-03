import Api from "./Api";

export default {
    all(page, search) {
        return Api.get(`/customers?page=${page}&search=${search}`);
    },
    show(id) {
        return Api.get(`/customers/${id}`);
    },
    add(customer) {
        return Api.post("/customers", customer);
    },
    edit(id, customer) {
        return Api.put(`/customers/${id}`, customer);
    },
    delete(id) {
        return Api.delete(`/customers/${id}`);
    },
    changePassword(id, password) {
        return Api.put(`/customers/${id}/password`, password);
    },
};
