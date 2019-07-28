const {Map} = require('immutable');
import {AppPages} from './components/App/constants';
import {HomePages} from './components/Home/constants';

export default {
    dragAndDrop: Map({
        preview: undefined,
        files: undefined
    }),
    editPicture: Map({
        preview: undefined,
    }),
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
        restaurantsNames: [],
        restaurantsLocations: [],
        restaurantsNamesFilter: [],
        restaurantsLocationFilter: [],
        restaurantsNameSearch: '',
        restaurantsLocationSearch: '',
        restaurantsScale: 0,
        layout: 'list',
        selectedRestaurant: [],
        visibleRestaurant: false,
        visibleReview: false,
        sortKey: null,
        sortOrder: null,
    }),
    googleMap: Map({
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }),
    rates: Map({
        rates: [],
        userID: 0,
        restaurantID: 0,
        bathroomQuality: 0,
        staffKindness: 0,
        cleanliness: 0,
        driveThruQuality: 0,
        deliverySpeed: 0,
        foodQuality: 0,
        pictures: 0,
        newScore: 0
    }),
    usersPage: Map({
        users: [],
        search: '',
        searchLocation: '',
        searchNow: false,
        layout: 'list',
        selectedUser: null,
        visibleReview: false,
        sortKey: null,
        sortOrder: null,
        sortField: null,
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
        picture: []
    }),
    app: Map({
        page: AppPages.LOGIN
    })
};
