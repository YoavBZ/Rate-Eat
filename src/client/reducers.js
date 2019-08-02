import {combineReducers} from 'redux';
import AppReducer from './components/App/reducer';
import RegisterReducer from './components/Register/reducer';
import LoginReducer from './components/Login/reducer';
import HomeReducer from './components/Home/reducer';
import {EditPictureReducer, EditReviewReducer, ProfileReducer} from './components/Profile/reducer'
import {
    RatesListReducer,
    RatesReducer,
    RestaurantsPageReducer,
    ReviewPicturesReducer
} from "./components/RestaurantsPage/reducer";
import {UsersPageReducer, UsersRatesReducer} from "./components/UsersPage/reducer";
import DragAndDropReducer from './components/DragAndDrop/reducer';

/*
    Combining all app reducers using Redux combineReducers.
*/

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
    ratesList: RatesListReducer,
    editReview: EditReviewReducer,
    dragAndDrop: DragAndDropReducer,
    editPicture: EditPictureReducer,
    reviewPictures: ReviewPicturesReducer,
});
