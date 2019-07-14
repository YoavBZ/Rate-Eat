import {RestaurantsPageActionsConstants} from "./constants";
import {RegisterActionsConstants} from "../Register/constants";

function changeLayout(layout) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_LAYOUT,
        layout
    }
}

function changeVisibility(visibility) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_VISIBILITY,
        visibility
    }
}

function changeVisibilityReview(visibility) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_VISIBILITY,
        visibility
    }
}

function onSortChange(sortOrder, sortField, sortKey) {
    return {
        type: RestaurantsPageActionsConstants.ON_SORT_CHANGE,
        sortOrder, sortField, sortKey
    }
}

function getRestaurants() {
    return {
        type: RestaurantsPageActionsConstants.GET_RESTAURANTS,
        uri: 'api/restaurants/all'
    }
}

function getRestaurantsSuccess(restaurants) {
    return {
        type: RestaurantsPageActionsConstants.GET_RESTAURANTS_SUCCESS,
        restaurants
    }
}

function addReviewSuccess(review) {
    return {
        type: RestaurantsPageActionsConstants.ADD_REVIEW_SUCCESS,
        review
    }
}

function getRestaurantsFailure(msg) {
    return {
        type: RestaurantsPageActionsConstants.GET_RESTAURANTS_FAILURE,
        msg
    }
}

function addReviewFailure(msg) {
    return {
        type: RestaurantsPageActionsConstants.ADD_REVIEW_FAILURE,
        msg
    }
}

function selectRestaurant(restaurant, visible) {
    return {
        type: RestaurantsPageActionsConstants.SELECT_RESTAURANT,
        restaurant, visible
    }
}

function selectReview(restaurant, visible) {
    return {
        type: RestaurantsPageActionsConstants.SELECT_REVIEW,
        restaurant, visible
    }
}

function rateReview(rate, category) {
    return {
        type: RestaurantsPageActionsConstants.SELECT_RATE,
        rate, category
    }
}

function addReview(review) {
    return {
        type: RestaurantsPageActionsConstants.ADD_RATE,
        uri: '/api/reviews',
        payload: {review}
    }
}

let RestaurantsPageActions = {
    changeVisibility,
    changeVisibilityReview,
    changeLayout,
    onSortChange,
    getRestaurants,
    getRestaurantsSuccess,
    addReviewSuccess,
    getRestaurantsFailure,
    addReviewFailure,
    selectRestaurant,
    selectReview,
    rateReview,
    addReview
};

export default RestaurantsPageActions