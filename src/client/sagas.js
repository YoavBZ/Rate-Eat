import {all} from 'redux-saga/effects'
import RegisterSaga from './components/Register/saga'
import LoginSaga from './components/Login/saga'
// import HomeSaga from './components/Home/saga'
import {EditReviewSaga, ProfileSaga} from './components/Profile/saga'
import RestaurantsPageSaga from "./components/RestaurantsPage/saga";
import UsersPageSaga from "./components/UsersPage/saga";

export default function* Sagas() {
    yield all([
        RegisterSaga(),
        LoginSaga(),
        // HomeSaga(),
        ProfileSaga(),
        RestaurantsPageSaga(),
        UsersPageSaga(),
        EditReviewSaga()
    ])
}