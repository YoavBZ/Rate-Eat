const {Map} = require('immutable');
import {AppPages} from './components/App/constants';
import {HomePages} from './components/Home/constants';

export default {
    profile: Map({
        edit: false,
        username: undefined,
        password: undefined,
        location: undefined,
        picture: undefined
    }),
    home: Map({
        user: undefined,
        page: HomePages.SEARCH_RESTAURANTS
    }),
    restaurantsPage: Map({
        restaurants: [],
        layout: 'list',
        selectedRestaurants: null,
        visibleRestaurant: false,
        selectedReview: null,
        visibleReview: false,
        sortKey: null,
        sortOrder: null,
        review: Map({
            userID: 0,
            restaurantID: 0,
            bathroomQuality: 0,
            staffKindness: 0,
            cleanliness: 0,
            driveThruQuality: 0,
            deliverySpeed: 0,
            foodQuality: 0,
            pictures: 0
        })
    }),
    login: Map({
        username: undefined,
        password: undefined
    }),
    register: Map({
        username: undefined,
        password: undefined,
        location: undefined,
        picture: undefined
    }),
    app: Map({
        page: AppPages.LOGIN
    })
};