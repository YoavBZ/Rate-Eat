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

function changeField(field, value) {
    console.log(field);
    console.log(value);


    return {
        type: LoginActionsConstants.CHANGE_FIELD,
        field,
        value
    }
}

let LoginActions = {
    setLoading,
    login,
    loginSuccess,
    loginFailure,
    changeField
};

export default LoginActions