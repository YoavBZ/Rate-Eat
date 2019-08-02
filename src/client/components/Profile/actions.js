import {EditPictureActionsConstats, EditReviewActionsConstats, ProfileActionsConstants} from './constants.js';

function updateUser(user, callback) {
    return {
        type: ProfileActionsConstants.UPDATE_USER,
        uri: '/api/users/',
        payload: user,
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

function editMyReview(review) {
    return {
        type: EditReviewActionsConstats.EDIT_MY_REVIEWS,
        uri: '/api/reviews/',
        review: {review}
    }
}

function editMyReviewSuccess(review) {
    return {
        type: EditReviewActionsConstats.EDIT_MY_REVIEWS_SUCCESS,
        review
    }
}

function editMyReviewFailure(msg) {
    return {
        type: EditReviewActionsConstats.EDIT_MY_REVIEWS_FAILURE,
        msg
    }
}

function deleteReview(review){
    return {
        type: EditReviewActionsConstats.DELETE_REVIEW,
        uri: 'api/reviews/',
        review: {review}
    }
}

function deleteReviewSuccess(id) {
    return {
        type: EditReviewActionsConstats.DELETE_REVIEW_SUCCESS,
        id
    }
}

function deleteReviewFailure(msg) {
    return {
        type: EditReviewActionsConstats.DELETE_REVIEW_FAILURE,
        msg
    }
}

function getRestaurantName(id, callback) {
    return {
        type: EditReviewActionsConstats.GET_RESTAURANT_NAME,
        uri: '/api/restaurants/getName',
        id: {id},
        callback
    }
}

function getRestaurantNameSuccess(name, callback) {
    return {
        type: EditReviewActionsConstats.GET_RESTAURANT_NAME_SUCCESS,
        name,
        callback
    }
}

function getRestaurantNameFailure(msg) {
    return {
        type: EditReviewActionsConstats.GET_RESTAURANT_NAME_FAILURE,
        msg
    }
}

function editMyReviewWithPictures(review) {
    return {
        type: EditReviewActionsConstats.EDIT_MY_REVIEWS_WITH_PICTURES,
        uri: '/api/reviews/updateWithPictures',
        review
    }
}

function editMyReviewWithPicturesSuccess(review) {
    return {
        type: EditReviewActionsConstats.EDIT_MY_REVIEWS_WITH_PICTURES_SUCCESS,
        review
    }
}

function editMyReviewWithPicturesFailure(msg) {
    return {
        type: EditReviewActionsConstats.EDIT_MY_REVIEWS_WITH_PICTURES_FAILURE,
        msg
    }
}

function updateAVG(oldReview, newReview) {
    return {
        type: EditReviewActionsConstats.UPDATE_AVG,
        uri: '/api/restaurants/updateRestaurantScore',
        body: {oldReview, newReview}

    }
}

function UpdateAVGSuccess(review) {
    return {
        type: EditReviewActionsConstats.UPDATE_AVG_SUCCESS,
        review
    }
}

function UpdateAVGFailure(msg) {
    return {
        type: EditReviewActionsConstats.UPDATE_AVG_FAILIRE,
        msg
    }
}

let EditReviewActions = {
    editMyReview,
    editMyReviewSuccess,
    editMyReviewFailure,
    deleteReview,
    deleteReviewSuccess,
    deleteReviewFailure,
    getRestaurantName,
    getRestaurantNameSuccess,
    getRestaurantNameFailure,
    editMyReviewWithPictures,
    editMyReviewWithPicturesSuccess,
    editMyReviewWithPicturesFailure,
    updateAVG,
    UpdateAVGSuccess,
    UpdateAVGFailure
};

function onDrop(files, preview) {
    return {
        type: EditPictureActionsConstats.EDIT_PICTURE_ON_DROP,
        files,
        preview
    }
}

let EditPictureActions = {
    onDrop,
};

export {ProfileActions, EditReviewActions, EditPictureActions} 