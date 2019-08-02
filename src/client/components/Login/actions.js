import {LoginActionsConstants} from './constants.js';

function setLoading() {
    return {
        type: LoginActionsConstants.SET_LOADING
    }
}

function login(user, callback) {
    return {
        type: LoginActionsConstants.LOGIN,
        uri: '/api/users/login',
        payload: {user},
        callback
    }
}

function fbLogin(user, callback) {
    return {
        type: LoginActionsConstants.FB_LOGIN,
        uri: '/api/users/fbLogin',
        payload: {user},
        callback
    }
}

function loginSuccess(user) {
    return {
        type: LoginActionsConstants.LOGIN_SUCCESS,
        user
    }
}

function loginFailure(callback, msg) {
    return {
        type: LoginActionsConstants.LOGIN_FAILURE,
        msg,
        callback
    }
}

function changeLoginField(field, value) {
    return {
        type: LoginActionsConstants.CHANGE_LOGIN_FIELD,
        field,
        value
    }
}

let LoginActions = {
    setLoading,
    login,
    fbLogin,
    loginSuccess,
    loginFailure,
    changeLoginField
};

export default LoginActions