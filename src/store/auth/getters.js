export const user = state => state.user;
export const isAuthenticated = state => !!state.token;
export const token = state => state.token;
export const isCustomer = state => state.userType === 'customer';
export const isUser = state => state.userType === 'admin';