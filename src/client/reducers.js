import {combineReducers} from 'redux';
import AppReducer from './components/App/reducer';
import RegisterReducer from './components/Register/reducer';
import LoginReducer from './components/Login/reducer';
import HomeReducer from './components/Home/reducer';
import {EditReviewReducer, ProfileReducer} from './components/Profile/reducer'
import {RatesReducer, RestaurantsPageReducer} from "./components/RestaurantsPage/reducer";
import {UsersPageReducer, UsersRatesReducer } from "./components/UsersPage/reducer";

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
