import initialState from '../../initialState';
import {RestaurantsPageActionsConstants} from "./constants";

const RestaurantsPageReducer = (state = initialState.restaurantsPage, action) => {
    switch (action.type) {
        case RestaurantsPageActionsConstants.CHANGE_LAYOUT:
            return state.set('layout', action.layout);
        case RestaurantsPageActionsConstants.CHANGE_VISIBILITY_RESTAURANT:
            return state.set('visibleRestaurant', action.visible);
        case RestaurantsPageActionsConstants.CHANGE_VISIBILITY_REVIEW:
            return state.set('visibleReview', action.visible);
        case RestaurantsPageActionsConstants.ON_SORT_CHANGE:
            state = state.set('sortOrder', action.sortOrder);
            state = state.set('sortField', action.sortField);
            return state.set('sortKey', action.sortKey);
        case RestaurantsPageActionsConstants.SELECT_RESTAURANT:
            state = state.set('selectedRestaurant', action.restaurant);
            return state.set('visibleRestaurant', action.visible);
        case RestaurantsPageActionsConstants.SELECT_REVIEW:
            state = state.set('selectedReview', action.review);
            return state.set('visibleReview', action.visible);
        case RestaurantsPageActionsConstants.GET_RESTAURANTS_SUCCESS:
            return state.set('restaurants', action.restaurants);
        case RestaurantsPageActionsConstants.GET_RESTAURANTS_FAILURE:
            console.log(action.msg);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};

export default RestaurantsPageReducer
