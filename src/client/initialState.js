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
        visible: false,
        visibleReview: false,
        sortKey: null,
        sortOrder: null,

        review: Map({
            Bathroom_Quality:0,
            Staff_Kindness: 0,
            Cleanliness: 0,
            Drive_thru: 0,
            Delivery_Speed: 0,
            Food_Quality: 0 })
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