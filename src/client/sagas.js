import {all} from 'redux-saga/effects'
import RegisterSaga from './components/Register/saga'
import LoginSaga from './components/Login/saga'
// import HomeSaga from './components/Home/saga'
import ProfileSaga from './components/Profile/saga'



export default function* Sagas() {
    yield all([
        RegisterSaga(),
        LoginSaga(),
        // HomeSaga(),
        ProfileSaga()
    ])
}
