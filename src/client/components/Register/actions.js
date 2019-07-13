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
        payload: {user}
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

function changeField(field, value) {
    console.log(field);
    console.log(value);


    return {
        type: RegisterActionsConstants.CHANGE_FIELD,
        field,
        value
    }
}

let RegisterActions = {
    setLoading,
    register,
    registerSuccess,
    registerFailure,
    changeField
};

export default RegisterActions