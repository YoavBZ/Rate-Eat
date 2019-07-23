import {UsersPageActionsConstants} from "./constants";
import {RegisterActionsConstants} from "../Register/constants";

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
        uri: 'api/users/all',
        payload: 'NULL'

    }
}

function getReviews(userID){
    return {
        type: UsersPageActionsConstants.GET_REVIEWS,
        uri: '/api/reviews/getUserReviews',
        payload: {userID}
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

function selectReview(user, visible, rates ) {
    return {
        type: UsersPageActionsConstants.SELECT_REVIEW,
        user, visible, rates
    }
}

function onRateChange(value) {
    return {
        type: UsersPageActionsConstants.CHANGE_RATE,
        value
    }
}

function changeSearch(field, value) {
    return {
        type: UsersPageActionsConstants.CHANGE_SEARCH_FIELD,
        field,
        value
    }
}

function search(search) {
    return {
        type: UsersPageActionsConstants.SEARCH_USERS,
        search
    }
}

let UsersPageActions = {
    getUsers,
    getReviews,

    changeLayout,
    changeVisibilityReview,
    onSortChange,
    selectReview,
    getUsersSuccess,
    getUsersFailure,
    changeSearch,
    search,

    onRateChange,
    getReviewSuccess,
    getReviewFailure
};

export default UsersPageActions
