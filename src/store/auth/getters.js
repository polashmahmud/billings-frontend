export const user = state => state.user;
export const isAuthenticated = state => !!state.token;
export const token = state => state.token;
export const isCustomer = state => state.user.user_type === 'customer';
export const isUser = state => state.user.user_type === 'admin';