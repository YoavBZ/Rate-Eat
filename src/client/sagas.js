import {all} from 'redux-saga/effects'
import RegisterSaga from './components/Register/saga'
import LoginSaga from './components/Login/saga'
// import HomeSaga from './components/Home/saga'


export default function* Sagas() {
    yield all([
        RegisterSaga(),
        LoginSaga(),
        // HomeSaga()
    ])
}
