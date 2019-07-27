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
            state = state.set('selectedRestaurant', action.restaurant);
            return state.set('visibleReview', action.visible);
        case RestaurantsPageActionsConstants.GET_RESTAURANTS_SUCCESS:
            state = state.set('restaurants', action.restaurants);
            let restaurantsNames = action.restaurants;
            let names = restaurantsNames.map( a => a.name );
            let locations = restaurantsNames.map( a => a.location );
            state = state.set('restaurantsLocations', locations);
            return state.set('restaurantsNames', names);
        case RestaurantsPageActionsConstants.SEARCH_RESTAURANTS_SUCCESS:
            return state.set('restaurants', action.restaurants);
        case RestaurantsPageActionsConstants.GET_RESTAURANTS_FAILURE:
            console.log(action.msg);
            return state;
        case RestaurantsPageActionsConstants.ADD_REVIEW_SUCCESS:
            // !!!!!!!!!!!!!! TODO WE NEED TO CLOSE WINDOW AND ZERO ALL PARAMETERS!!!!!!!!!!!!!!!
            return state;
        case RestaurantsPageActionsConstants.ADD_REVIEW_FAILURE:
            // !!!!!!!!!!!!!! TODO WE NEED TO NOTIFY  AND ZERO ALL PARAMETERS!!!!!!!!!!!!!!!
            return state;
        case RestaurantsPageActionsConstants.FILTER_NAMES:
            let oldNames = state.get('restaurantsNames');
            oldNames = oldNames.filter((v,i) => oldNames.indexOf(v) === i);
            let search = state.get('restaurantsNameSearch');
            let newNames = oldNames.filter((name) => {
                    return name.toLowerCase().startsWith(search.toLowerCase());
                });
            return state.set( 'restaurantsNamesFilter' , newNames );
        case RestaurantsPageActionsConstants.FILTER_LOCATIONS:
            let oldLocations = state.get('restaurantsLocations');
            oldLocations = oldLocations.filter((v,i) => oldLocations.indexOf(v) === i);
            let searchLocation = state.get('restaurantsLocationSearch');
            let newLocations = oldLocations.filter((location) => {
                    return location.toLowerCase().startsWith(searchLocation.toLowerCase());
                });
            return state.set( 'restaurantsLocationFilter' , newLocations );
        case RestaurantsPageActionsConstants.CHANGE_FILTER_NAMES:
            return state.set('restaurantsNameSearch', action.search);
        case RestaurantsPageActionsConstants.CHANGE_FILTER_LOCATIONS:
            return state.set('restaurantsLocationSearch', action.search);
        case RestaurantsPageActionsConstants.CHANGE_SCALE:
            return state.set('restaurantsScale', action.scale);
        default:
            return state;
    }
};

const RatesReducer = (state = initialState.rates, action) => {
    switch (action.type) {
        case RestaurantsPageActionsConstants.CHANGE_RATE:
            return state.set(action.category, action.rate);
        default:
            return state;
    }
};

export {RestaurantsPageReducer, RatesReducer}
