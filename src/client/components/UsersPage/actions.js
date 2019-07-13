import {UsersPageActionsConstants} from "./constants";

function changeLayout(layout) {
    return {
        type: UsersPageActionsConstants.CHANGE_LAYOUT,
        layout
    }
}
function onSortChange(sortOrder, sortField, sortKey) {
    return {
        type: UsersPageActionsConstants.ON_SORT_CHANGE,
        sortOrder, sortField, sortKey
    }
}

function getRestaurants() {
    return {
        type: UsersPageActionsConstants.GET_RESTAURANTS,
        uri: 'api/restaurants/all'
    }
}

function getRestaurantsSuccess(restaurants) {
    return {
        type: UsersPageActionsConstants.GET_RESTAURANTS_SUCCESS,
        restaurants
    }
}

function getRestaurantsFailure(msg) {
    return {
        type: UsersPageActionsConstants.GET_RESTAURANTS_FAILURE,
        msg
    }
}

let UsersPageActions = {
    changeLayout,
    onSortChange,
    getRestaurants,
    getRestaurantsSuccess,
    getRestaurantsFailure,
};

export default UsersPageActions