import initialState from '../../initialState';
import {RestaurantsPageActionsConstants, ReviewPicturesConstants} from "./constants";

const RestaurantsPageReducer = (state = initialState.restaurantsPage, action) => {
    switch (action.type) {
        case RestaurantsPageActionsConstants.CHANGE_LAYOUT:
            return state.set('layout', action.layout);
        case RestaurantsPageActionsConstants.CHANGE_VISIBILITY_RESTAURANT:
            return state.set('visibleRestaurant', action.visible);
        case RestaurantsPageActionsConstants.CHANGE_VISIBILITY_REVIEW:
            return state.set('visibleReview', action.visible);
        case RestaurantsPageActionsConstants.CHANGE_VISIBILITY_REVIEW_LIST:
            return state.set('visibleReviewList', action.visible);
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
        case RestaurantsPageActionsConstants.SELECT_REVIEW_LIST:
            state = state.set('selectedRestaurant', action.restaurant);
            return state.set('visibleReviewList', action.visible);
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
        case RestaurantsPageActionsConstants.GET_REVIEW_LIST_SUCCESS:
            return state.set('rates', action.review);
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
        case RestaurantsPageActionsConstants.CHANGE_AVG_SEARCH:
            return state.set('restaurantsAVGSearch', action.search);
        case RestaurantsPageActionsConstants.CHANGE_SCALE:
            return state.set('restaurantsScale', action.scale);
        case RestaurantsPageActionsConstants.CLEAR_RATE:
            return state.set( 'visibleReview' , false );
        default:
            return state;
    }
};

const RatesReducer = (state = initialState.rates, action) => {
    switch (action.type) {
        case RestaurantsPageActionsConstants.CHANGE_RATE:
            return state.set(action.category, action.rate);
        case RestaurantsPageActionsConstants.CLEAR_RATE:
            state = state.set( 'bathroomQuality' , 0 );
            state = state.set( 'staffKindness' , 0 );
            state = state.set( 'cleanliness' , 0 );
            state = state.set( 'driveThruQuality' , 0 );
            state = state.set( 'deliverySpeed' , 0 );
            return state.set( 'foodQuality' , 0);
        default:
            return state;
    }
};

const RatesListReducer = (state = initialState.rates, action) => {
    switch (action.type) {
        case RestaurantsPageActionsConstants.GET_REVIEW_LIST_SUCCESS:
            return state.set('rates', action.review);
        case RestaurantsPageActionsConstants.CHANGE_RATE_LIST:
            return state.set('rates', action.value);

        default:
            return state;
    }
};


const ReviewPicturesReducer = (state = initialState.reviewPictures, action) => {
    switch (action.type) {
        case ReviewPicturesConstants.ON_DROP:
            return state.set('files', action.files); 
        default: //otherwise state is lost!
            return state;
    }
};


export {RestaurantsPageReducer, RatesReducer, ReviewPicturesReducer, RatesListReducer}
