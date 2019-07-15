import {UsersPageActionsConstants} from "./constants";

function changeLayout(layout) {
    return {
        type: UsersPageActionsConstants.CHANGE_LAYOUT,
        layout
    }
}

function changeVisibilityReview(visible) {
    return {
        type: UsersPageActionsConstants.CHANGE_VISIBILITY_REVIEW,
        visible
    }
}

function onSortChange(sortOrder, sortField, sortKey) {
    return {
        type: UsersPageActionsConstants.ON_SORT_CHANGE,
        sortOrder, sortField, sortKey
    }
}

function getUsers() {
    return {
        type: UsersPageActionsConstants.GET_USERS,
        uri: 'api/users/all'

    }
}

function getReviews(user) {
    return {
        type: UsersPageActionsConstants.GET_REVIEWS,
        uri: 'api/users/allReview',
        payload: user
        // !!!!!TODO WE NEED TO ADD IN DB
    }
}

function getUsersSuccess(users) {
    return {
        type: UsersPageActionsConstants.GET_USERS_SUCCESS,
        users
    }
}

function getReviewSuccess(review) {
    return {
        type: UsersPageActionsConstants.GET_REVIEW_SUCCESS,
        review
    }
}

function getUsersFailure(msg) {
    return {
        type: UsersPageActionsConstants.GET_USERS_FAILURE,
        msg
    }
}

function getReviewFailure(msg) {
    return {
        type: UsersPageActionsConstants.GET_REVIEW_FAILURE,
        msg
    }
}

function selectReview(user, visible) {
    return {
        type: UsersPageActionsConstants.SELECT_REVIEW,
        user, visible
    }
}

let UsersPageActions = {
    changeVisibilityReview,
    changeLayout,
    onSortChange,
    getUsers,
    getReviews,
    getUsersSuccess,
    getUsersFailure,
    selectReview,
    getReviewSuccess,
    getReviewFailure
};

export default UsersPageActions