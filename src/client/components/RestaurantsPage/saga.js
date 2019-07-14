import {RestaurantsPageActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import RestaurantsPageActions from "./actions";

function* getRestaurants(action) {
    console.log('RestaurantsPageSaga=', action);
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
        yield put(RestaurantsPageActions.getRestaurantsSuccess(json));
    } catch (e) {
        yield put(RestaurantsPageActions.getRestaurantsFailure(e.message));
    }
}

function* addReview(review) {
    console.log('addReviewSaga=', review);
    try {
        const res = yield call(fetch, review.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(RestaurantsPageActions.addReviewSuccess(json));
    } catch (e) {
        yield put(RestaurantsPageActions.addReviewFailure(e.message));
    }
}

function* RestaurantsPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestaurantsPageActionsConstants.GET_RESTAURANTS, getRestaurants);
    yield takeEvery(RestaurantsPageActionsConstants.ADD_RATE, addReview);
}

export default RestaurantsPageSaga;
