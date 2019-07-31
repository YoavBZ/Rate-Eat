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

function changeVisibilityReviewList(visible) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_VISIBILITY_REVIEW_LIST,
        visible
    }
}

function onSortChange(sortOrder, sortField, sortKey) {
    return {
        type: RestaurantsPageActionsConstants.ON_SORT_CHANGE,
        sortOrder, sortField, sortKey
    }
}

function onSortChangeRestaurant(sortKeyRestaurant) {
    return {
        type: RestaurantsPageActionsConstants.ON_SORT_CHANGE_RESTAURANT,
        sortKeyRestaurant
    }
}

function onSortChangeRating(sortOrder, sortField, sortKey) {
    return {
        type: RestaurantsPageActionsConstants.ON_SORT_CHANGE_RATING,
        sortOrder, sortField, sortKey
    }
}

function getRestaurants() {
    return {
        type: RestaurantsPageActionsConstants.GET_RESTAURANTS,
        uri: 'api/restaurants/all'
    }
}

function getReviewsList(restaurantID) {
    return {
        type: RestaurantsPageActionsConstants.GET_REVIEWS_LIST,
        uri: '/api/reviews/getRestaurantReviews',
        payload: {restaurantID}
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

function getReviewListSuccess(review) {
    return {
        type: RestaurantsPageActionsConstants.GET_REVIEW_LIST_SUCCESS,
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

function selectReviewList(restaurant, visible) {
    return {
        type: RestaurantsPageActionsConstants.SELECT_REVIEW_LIST,
        restaurant, visible
    }
}

function changeRate(rate, category) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_RATE,
        rate, category
    }
}

function clearReview() {
    return {
        type: RestaurantsPageActionsConstants.CLEAR_RATE
    }
}

function addReview(review) {
    return {
        type: RestaurantsPageActionsConstants.ADD_RATE,
        uri: '/api/reviews',
        review
    }
}

function addAVG(review) {
    return {
        type: RestaurantsPageActionsConstants.ADD_AVG,
        uri: '/api/restaurants/updateScore',
        payload: { review }
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

function changeRestaurantsAVG(search) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_AVG_SEARCH,
        search
    }
}

function changeRestaurantsAVGRating(search) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_AVG_SEARCH_RATING,
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

function searchAVGHandler(search) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT,
        uri: 'api/restaurants/someAVG',
        payload: {search}
    }
}

function searchAVGRatingHandler(restaurantID, search) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT_RATING,
        uri: 'api/reviews/someAvg',
        payload: {restaurantID, search}
    }
}

function searchDayRatingHandler(restaurantID, search) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT_DATE,
        uri: 'api/reviews/someDate',
        payload: { restaurantID , search}
    }
}

function searchWeekRatingHandler(restaurantID, search) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT_DATE,
        uri: 'api/reviews/someDate',
        payload: { restaurantID , search}
    }
}

function searchMonthRatingHandler(restaurantID, search) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT_DATE,
        uri: 'api/reviews/someDate',
        payload: { restaurantID , search}
    }
}

function searchNameLocation(search, location, avg) {
    return {
        type: RestaurantsPageActionsConstants.SEARCH_RESTAURANT,
        uri: 'api/restaurants/someAll',
        payload: {search , location, avg}
    }
}

function onRateChange(value) {
    return {
        type: RestaurantsPageActionsConstants.CHANGE_RATE_LIST,
        value
    }
}

let RestaurantsPageActions = {
    changeVisibilityRestaurant,
    changeVisibilityReview,
    changeVisibilityReviewList,
    changeLayout,
    onSortChange,
    onSortChangeRestaurant,
    getRestaurants,
    getReviewsList,
    getRestaurantsSuccess,
    searchRestaurantsSuccess,
    getRestaurantsFailure,
    selectRestaurant,
    selectReview,
    selectReviewList,
    addReview,
    addAVG,
    addReviewSuccess,
    getReviewListSuccess,
    addReviewFailure,
    changeRate,
    clearReview,
    filterRestaurantsNames,
    filterRestaurantsLocations,
    changeRestaurantsNames,
    changeRestaurantsLocations,
    changeRestaurantsAVG,
    changeRestaurantsAVGRating,
    setRestaurantsScale,
    search,
    searchLocation,
    searchAVGHandler,
    searchAVGRatingHandler,
    searchDayRatingHandler,
    searchWeekRatingHandler,
    searchMonthRatingHandler,
    searchNameLocation,

    onRateChange,
    onSortChangeRating

};


function onDrop(files) {
    return {
        type: ReviewPicturesConstants.ON_DROP,
        files
    }
}

let ReviewPicturesActions = {
    onDrop
};

export {RestaurantsPageActions, ReviewPicturesActions}
