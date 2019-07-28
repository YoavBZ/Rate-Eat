import {UsersPageActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import UsersPageActions from "./actions";

function* getUsers(action) {
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
        yield put(UsersPageActions.getUsersSuccess(json));
    } catch (e) {
        yield put(UsersPageActions.getUsersFailure(e.message));
    }
}

function* getReviews(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });
        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(UsersPageActions.getReviewSuccess(json));
    } catch (e) {
        yield put(UsersPageActions.getReviewFailure(e.message));
    }
}

function* searchUsers(action) {
    console.log('UsersSearchSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });
        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(UsersPageActions.getUsersSuccess(json));
    } catch (e) {
        yield put(UsersPageActions.getUsersFailure(e.message));
    }
}

function* UsersPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UsersPageActionsConstants.GET_USERS, getUsers);
    yield takeEvery(UsersPageActionsConstants.GET_REVIEWS, getReviews);
    yield takeEvery(UsersPageActionsConstants.SEARCH_USERS, searchUsers);
}

export default UsersPageSaga;
