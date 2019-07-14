import initialState from '../../initialState';
import {RestaurantsPageActionsConstants} from "./constants";

const RestaurantsPageReducer = (state = initialState.restaurantsPage, action) => {
    switch (action.type) {
        case RestaurantsPageActionsConstants.CHANGE_LAYOUT:
            return state.set('layout', action.layout);
        case RestaurantsPageActionsConstants.CHANGE_VISIBILITY:
            return state.set('visibility', action.visibility);
        case RestaurantsPageActionsConstants.CHANGE_VISIBILITY_REVIEW:
            return state.set('visibilityReview', action.visibility);
        case RestaurantsPageActionsConstants.ON_SORT_CHANGE:
            state = state.set('sortOrder', action.sortOrder);
            state = state.set('sortField', action.sortField);
            return state.set('sortKey', action.sortKey);
        case RestaurantsPageActionsConstants.SELECT_RESTAURANT:
            state = state.set('selectedRestaurant', action.restaurant);
            return state.set('visible', action.visibility);
        case RestaurantsPageActionsConstants.SELECT_REVIEW:
            state = state.set('selectedReview', action.restaurant);
            return state.set('visibleReview', action.visibility);
        case RestaurantsPageActionsConstants.SELECT_RATE:
            return state.set(action.category, action.rate);

         case RestaurantsPageActionsConstants.GET_RESTAURANTS_SUCCESS:
            return state.set('restaurants', action.restaurants);
        case RestaurantsPageActionsConstants.GET_RESTAURANTS_FAILURE:
            console.log(action.msg);
            return state;

        case RestaurantsPageActionsConstants.ADD_REVIEW_SUCCESS:
        //     // !!!!!!!!!!!!!! TODO WE NEED TO CLOSE WINDOW AND ZERO ALL PARAMETERS!!!!!!!!!!!!!!!

        case RestaurantsPageActionsConstants.ADD_REVIEW_FAILURE:
        //     // !!!!!!!!!!!!!! TODO WE NEED TO NOTIFY  AND ZERO ALL PARAMETERS!!!!!!!!!!!!!!!

        default: //otherwise state is lost!
            return state;
    }
};

export default RestaurantsPageReducer
