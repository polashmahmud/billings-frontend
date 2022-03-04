import Api from "./Api";

export default {
    bills() {
        return Api.get('/customer/bills');
    }

}