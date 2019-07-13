import {UsersPageActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import UsersPageActions from "./actions";

function* usersPageUser(action) {
    console.log('UsersPageSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(UsersPageActions.getRestaurantsSuccess(json));
    } catch (e) {
        yield put(UsersPageActions.getRestaurantsFailure(e.message));
    }
}

function* UsersPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UsersPageActionsConstants.GET_RESTAURANTS, usersPageUser);
}

export default UsersPageSaga;
