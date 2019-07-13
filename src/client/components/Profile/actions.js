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

let ProfileActions = {
    toggleEdit,
    updateUser,
    changeField
};

export default ProfileActions