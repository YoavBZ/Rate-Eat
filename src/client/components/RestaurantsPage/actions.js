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

function getRestaurantsFailure(msg) {
    return {
        type: RestaurantsPageActionsConstants.GET_RESTAURANTS_FAILURE,
        msg
    }
}

function selectRestaurant(restaurant, visible) {
    return {
        type: RestaurantsPageActionsConstants.SELECT_RESTAURANT,
        restaurant, visible
    }
}

function selectReview(review, visible) {
    return {
        type: RestaurantsPageActionsConstants.SELECT_REVIEW,
        review, visible
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
    selectReview
};

export default RestaurantsPageActions