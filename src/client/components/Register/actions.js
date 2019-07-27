import {RegisterActionsConstants} from './constants.js';

function setLoading() {
    return {
        type: RegisterActionsConstants.SET_LOADING
    }
}

function register(user) {
    return {
        type: RegisterActionsConstants.REGISTER,
        uri: '/api/users',
        user
    }
}

function registerSuccess(user) {
    return {
        type: RegisterActionsConstants.REGISTER_SUCCESS,
        user
    }
}

function registerFailure(msg) {
    return {
        type: RegisterActionsConstants.REGISTER_FAILURE,
        msg
    }
}

function changeRegisterField(field, value) {
    return {
        type: RegisterActionsConstants.CHANGE_REGISTER_FIELD,
        field,
        value
    }
}

let RegisterActions = {
    setLoading,
    register,
    registerSuccess,
    registerFailure,
    changeRegisterField
};

export default RegisterActions