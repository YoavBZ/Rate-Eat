import initialState from '../../initialState';
import {RestaurantsPageActionsConstants} from "./constants";

const RestaurantsPageReducer = (state = initialState.restaurantsPage, action) => {
    switch (action.type) {
        case RestaurantsPageActionsConstants.CHANGE_LAYOUT:
            return state.set('layout', action.layout);
        case RestaurantsPageActionsConstants.CHANGE_VISIBILITY:
            return state.set('visibility', action.visibility);
        case RestaurantsPageActionsConstants.ON_SORT_CHANGE:
            let set = state.set('sortOrder', action.sortOrder);
            set = state.set('sortField', action.sortField);
            return state.set('sortKey', action.sortKey);
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
