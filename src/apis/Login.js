import Api from "./Api";

export default {
    user(data) {
        return Api.post('/login', data);
    },

    custom(data) {
        return Api.post('/login-customer', data);
    }
}