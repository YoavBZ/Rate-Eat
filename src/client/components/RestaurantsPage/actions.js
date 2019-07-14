import {RestaurantsPageActionsConstants} from "./constants";

function changeLayout(layout) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_LAYOUT,
        layout
    }
}

function changeVisibility(visible) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_VISIBILITY,
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

let RestaurantsPageActions = {
    changeVisibility,
    changeLayout,
    onSortChange,
    getRestaurants,
    getRestaurantsSuccess,
    getRestaurantsFailure,
    selectRestaurant
};

export default RestaurantsPageActions