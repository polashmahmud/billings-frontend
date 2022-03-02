export default {
    resetAndRedirectLoginForm(response) {
        this.setUser(response.data.user);
        this.setToken(response.data.token);
        this.setUserType(response.data.user_type);
        this.$router.push('/');
        this.loginForm = {
            email: '',
            password: ''
        };
    },
}