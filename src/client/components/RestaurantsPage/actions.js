import {RestaurantsPageActionsConstants, ReviewPicturesConstants} from "./constants";

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

function searchRestaurantsSuccess(restaurants) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANTS_SUCCESS,
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

function filterRestaurantsNames() {
    return {
        type: RestaurantsPageActionsConstants.FILTER_NAMES
    }
}

function filterRestaurantsLocations() {
    return {
        type: RestaurantsPageActionsConstants.FILTER_LOCATIONS
    }
}

function changeRestaurantsNames(search) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_FILTER_NAMES,
        search
    }
}

function changeRestaurantsLocations(search) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_FILTER_LOCATIONS,
        search
    }
}

function setRestaurantsScale(scale) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_SCALE,
        scale
    }
}

function search(search) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT,
        uri: 'api/restaurants/some',
        payload: {search}
    }
}

function searchLocation(search) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT,
        uri: 'api/restaurants/someLocation',
        payload: {search}
    }
}

function searchNameLocation(search, location) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT,
        uri: 'api/restaurants/someNameLocation',
        payload: {search , location}
    }
}

let RestaurantsPageActions = {
    changeVisibilityRestaurant,
    changeVisibilityReview,
    changeLayout,
    onSortChange,
    getRestaurants,
    getRestaurantsSuccess,
    searchRestaurantsSuccess,
    getRestaurantsFailure,
    selectRestaurant,
    selectReview,
    addReview,
    addReviewSuccess,
    addReviewFailure,
    changeRate,
    filterRestaurantsNames,
    filterRestaurantsLocations,
    changeRestaurantsNames,
    changeRestaurantsLocations,
    setRestaurantsScale,
    search,
    searchLocation,
    searchNameLocation

};


function onDrop(files, previews) {
    return {
        type: ReviewPicturesConstants.ON_DROP,
        files,
        previews
    }
}

let ReviewPicturesActions = {
    onDrop
};

export {RestaurantsPageActions, ReviewPicturesActions}
