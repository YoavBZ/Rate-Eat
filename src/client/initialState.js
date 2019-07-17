const {Map} = require('immutable');
import {AppPages} from './components/App/constants';
import {HomePages} from './components/Home/constants';

export default {
    editReview: Map({
        editReview: false,
        review: undefined
        }),
    profile: Map({
        edit: false,
        username: undefined,
        password: undefined,
        location: undefined,
        picture: undefined,
        reviews: undefined,
        visibleReview: false,
        selectedReview: null,
        layout: 'list',
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
        visibleReview: false,
        sortKey: null,
        sortOrder: null,
    }),
    rates: Map({
        rates: [],
        layout: 'list',
        userID: 0,
        restaurantID: 0,
        bathroomQuality: 0,
        staffKindness: 0,
        cleanliness: 0,
        driveThruQuality: 0,
        deliverySpeed: 0,
        foodQuality: 0,
        pictures: 0
    }),
    usersPage: Map({
        users: [],
        layout: 'list',
        selectedUser: null,
        visibleReview: false,
        sortKey: null,
        sortOrder: null,
        rates: []
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