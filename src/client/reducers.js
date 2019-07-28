import {combineReducers} from 'redux';
import AppReducer from './components/App/reducer';
import RegisterReducer from './components/Register/reducer';
import LoginReducer from './components/Login/reducer';
import HomeReducer from './components/Home/reducer';
import {EditReviewReducer, ProfileReducer, EditPictureReducer} from './components/Profile/reducer'
import {RatesReducer, RestaurantsPageReducer, ReviewPicturesReducer} from "./components/RestaurantsPage/reducer";
import {UsersPageReducer, UsersRatesReducer } from "./components/UsersPage/reducer";
import DragAndDropReducer from './components/DragAndDrop/reducer';

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
    dragAndDrop: DragAndDropReducer,
    editPicture: EditPictureReducer,
    reviewPictures: ReviewPicturesReducer,
});
