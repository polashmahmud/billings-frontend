export default {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    token: localStorage.getItem('token') || '',
    userType: localStorage.getItem('user_type') || '',
}