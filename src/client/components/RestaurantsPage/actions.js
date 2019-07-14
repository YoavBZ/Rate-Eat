import {RestaurantsPageActionsConstants} from "./constants";

function changeLayout(layout) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_LAYOUT,
        layout
    }
}

function changeVisibilityRestaurant(visible) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_VISIBILITY_RESTAURANT,
        visible
    }
}

function changeVisibilityReview(visible) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_VISIBILITY_REVIEW,
        visible
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

function selectReview(visible) {
    return {
        type: RestaurantsPageActionsConstants.SELECT_REVIEW,
        visible
    }
}

function changeRate(rate, category) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_RATE,
        rate, category
    }
}

function addReview(review) {
    return {
        type: RestaurantsPageActionsConstants.ADD_RATE,
        uri: '/api/reviews',
        payload: review
    }
}

let RestaurantsPageActions = {
    changeVisibilityRestaurant,
    changeVisibilityReview,
    changeLayout,
    onSortChange,
    getRestaurants,
    getRestaurantsSuccess,
    getRestaurantsFailure,
    selectRestaurant,
    selectReview,
    addReview,
    addReviewSuccess,
    addReviewFailure,
    changeRate
};

export default RestaurantsPageActions