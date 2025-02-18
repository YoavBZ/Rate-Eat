import {RestaurantsPageActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import {RestaurantsPageActions} from "./actions";

function* getRestaurants(action) {
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
        yield put(RestaurantsPageActions.getRestaurantsSuccess(json, action.userCoords));
    } catch (e) {
        yield put(RestaurantsPageActions.getRestaurantsFailure(e.message));
    }
}

function* getReviewsList(action) {
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
        yield put(RestaurantsPageActions.getReviewListSuccess(json));
    } catch (e) {
        yield put(RestaurantsPageActions.addReviewFailure(e.message));
    }
}

function* searchRestaurantRating(action) {
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
        yield put(RestaurantsPageActions.getReviewListSuccess(json));
    } catch (e) {
        yield put(RestaurantsPageActions.addReviewFailure(e.message));
    }
}

function* addReview(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {},
                body: action.review
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

function* addScore(action) {
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
        yield put(RestaurantsPageActions.addReviewSuccess(json));
    } catch (e) {
        yield put(RestaurantsPageActions.addReviewFailure(e.message));
    }
}

function* searchRestaurant(action) {
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
        yield put(RestaurantsPageActions.searchRestaurantsSuccess(json));
    } catch (e) {
        yield put(RestaurantsPageActions.getRestaurantsFailure(e.message));
    }
}

function* RestaurantsPageSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestaurantsPageActionsConstants.GET_RESTAURANTS, getRestaurants);
    yield takeEvery(RestaurantsPageActionsConstants.GET_REVIEWS_LIST, getReviewsList);
    yield takeEvery(RestaurantsPageActionsConstants.ADD_RATE, addReview);
    yield takeEvery(RestaurantsPageActionsConstants.ADD_AVG, addScore);
    yield takeEvery(RestaurantsPageActionsConstants.SEARCH_RESTAURANT, searchRestaurant);
    yield takeEvery(RestaurantsPageActionsConstants.SEARCH_RESTAURANT_RATING, searchRestaurantRating);
    yield takeEvery(RestaurantsPageActionsConstants.SEARCH_RESTAURANT_DATE, searchRestaurantRating);
}

export default RestaurantsPageSaga;
