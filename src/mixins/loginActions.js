export default {
    methods: {
        resetAndRedirectLoginForm(response) {
            this.setUser(response.data.user);
            this.setToken(response.data.token);
            this.setUserType(response.data.user_type);
            this.redirectTo(response.data.user_type);
            this.resetLoginForm();
        },
        redirectTo(type) {
            if (type === 'admin') {
                this.$router.push('/customers');
            } else if (type === 'customer') {
                this.$router.push('/billings');
            }
        },
        resetLoginForm() {
            this.formData.email = '';
            this.formData.password = '';
        }
    }
}