import {ProfileActionsConstants} from './constants.js';

function updateUser(user, callback) {
    return {
        type: ProfileActionsConstants.UPDATE_USER,
        uri: '/api/users/',
        payload: {user},
        callback
    }
}

function toggleEdit(edit) {
    return {
        type: ProfileActionsConstants.TOGGLE_EDIT,
        edit
    }
}

function changeField(field, value) {
    return {
        type: ProfileActionsConstants.CHANGE_FIELD,
        field,
        value
    }
}

function updateUserSuccess(user, callback, msg) {
    return {
        type: ProfileActionsConstants.UPDATE_USER_SUCCESS,
        user,
        callback,
        msg
    }
}

function updateUserFailure(callback, msg) {
    return {
        type: ProfileActionsConstants.UPDATE_USER_FAILURE,
        msg,
        callback
    }
}

let ProfileActions = {
    toggleEdit,
    updateUser,
    changeField,
    updateUserSuccess,
    updateUserFailure
};

export default ProfileActions