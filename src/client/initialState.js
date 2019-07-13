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
        sortKey: null,
        sortOrder: null
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