import {combineReducers} from 'redux';
import AppReducer from './components/App/reducer';
import RegisterReducer from './components/Register/reducer';
import LoginReducer from './components/Login/reducer';
import HomeReducer from './components/Home/reducer';
import {ProfileReducer, EditReviewReducer} from './components/Profile/reducer'
import {RatesReducer, RestaurantsPageReducer} from "./components/RestaurantsPage/reducer";
import {UsersPageReducer} from "./components/UsersPage/reducer";

export default combineReducers({
    app: AppReducer,
    register: RegisterReducer,
    login: LoginReducer,
    home: HomeReducer,
    profile: ProfileReducer,
    restaurantsPage: RestaurantsPageReducer,
    usersPage: UsersPageReducer,
    rates: RatesReducer,
    editReview:EditReviewReducer,
});
