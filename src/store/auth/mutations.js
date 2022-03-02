export const SET_USER = (state, user) => {
  state.user = user;
}

export const SET_TOKEN = (state, token) => {
    state.token = token;
}

export const SET_USER_TYPE = (state, usertype) => {
    state.userType = usertype;
}

export const LOGOUT = (state) => {
    state.user = {};
    state.token = '';
    state.userType = '';
}