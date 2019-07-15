import {ProfileActionsConstants, EditReviewActionsConstats} from './constants.js';

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

function changeProfileField(field, value) {
    return {
        type: ProfileActionsConstants.CHANGE_PROFILE_FIELD,
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

function getUserReviews(userID) {
    return {
        type: ProfileActionsConstants.GET_USER_REVIEWS,
        uri: '/api/reviews/getUserReviews',
        payload: {userID}
    }
}

function getUserReviewsSuccess(reviews) {
    return {
        type: ProfileActionsConstants.GET_USER_REVIEWS_SUCCESS,
        reviews
    }
}

function getUserReviewsFailure(msg) {
    return {
        type: ProfileActionsConstants.GET_USER_REVIEWS_FAILURE,
        msg
    }
}

function changeVisibilityMyReview(visible) {
    return {
        type: ProfileActionsConstants.CHANGE_VISIBILITY_MY_REVIEWS,
        visible
    }
}

function changeLayout(layout) {
    return {
        type: ProfileActionsConstants.CHANGE_REVIEWS_LAYOUT,
        layout
    }
}



let ProfileActions = {
    toggleEdit,
    updateUser,
    changeProfileField,
    updateUserSuccess,
    updateUserFailure,
    getUserReviews,
    getUserReviewsSuccess,
    getUserReviewsFailure,
    changeVisibilityMyReview,
    changeLayout,

};


function editMyReview() {
    console.log(2)
    return {
        type: EditReviewActionsConstats.EDIT_MY_REVIEWS,
        
    }
}

let EditReviewActions = {
    editMyReview,
}

export {ProfileActions, EditReviewActions} 