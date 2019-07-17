import {combineReducers} from 'redux';
import AppReducer from './components/App/reducer';
import RegisterReducer from './components/Register/reducer';
import LoginReducer from './components/Login/reducer';
import HomeReducer from './components/Home/reducer';
import {EditReviewReducer, ProfileReducer} from './components/Profile/reducer'
import {RatesReducer, RestaurantsPageReducer} from "./components/RestaurantsPage/reducer";
<<<<<<< HEAD
import {UsersPageReducer, UsersRatesReducer } from "./components/UsersPage/reducer";
=======
import UsersPageReducer from "./components/UsersPage/reducer";
>>>>>>> 276e890bdef368d0d94ef616feaf0ac7083d5d68

export default combineReducers({
    app: AppReducer,
    register: RegisterReducer,
    login: LoginReducer,
    home: HomeReducer,
    profile: ProfileReducer,
    restaurantsPage: RestaurantsPageReducer,
    usersPage: UsersPageReducer,
    usersRatesPage: UsersRatesReducer,
    rates: RatesReducer,
    editReview: EditReviewReducer,
});
