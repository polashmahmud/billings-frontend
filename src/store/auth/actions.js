export const setUser = ({commit}, user) => {
    localStorage.setItem('user', JSON.stringify(user));
    commit('SET_USER', user);
}

export const setToken = ({commit}, token) => {
    localStorage.setItem('token', token);
    commit('SET_TOKEN', token);
}

export const setUserType = ({commit}, userType) => {
    localStorage.setItem('user_type', userType);
    commit('SET_USER_TYPE', userType);
}

export const logout = ({commit}) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    commit('LOGOUT');
}