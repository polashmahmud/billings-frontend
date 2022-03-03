import Api from "./Api";

export default {
    all() {
        return Api.get("/customers");
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
    }
};
