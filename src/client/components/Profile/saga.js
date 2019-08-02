import {EditReviewActionsConstats, ProfileActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import {EditReviewActions, ProfileActions} from './actions'

function* updateUserProfile(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'PUT',
                headers: {},
                body: action.payload
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }

        yield put(ProfileActions.updateUserSuccess(json, action.callback, "Your profile had been updated!"));
    } catch (e) {
        yield put(ProfileActions.updateUserFailure(action.callback, e.message));
    }
}

function* getUserReviews(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(ProfileActions.getUserReviewsSuccess(json));
    } catch (e) {
        yield put(ProfileActions.getUserReviewsFailure(e));
    }
}

function* ProfileSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ProfileActionsConstants.UPDATE_USER, updateUserProfile);
    yield takeEvery(ProfileActionsConstants.GET_USER_REVIEWS, getUserReviews);
}

function* updateUserReviews(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.review)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(EditReviewActions.editMyReviewSuccess(json));
    } catch (e) {
        yield put(EditReviewActions.editMyReviewFailure(e));
    }
}

function* deleteReview(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.review)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(EditReviewActions.deleteReviewSuccess(json.id));
    } catch (e) {
        yield put(EditReviewActions.editMyReviewFailure(e));
    }
}

function* getRestaurantName(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.id)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(EditReviewActions.getRestaurantNameSuccess(json.name, action.callback));
    } catch (e) {
        yield put(EditReviewActions.getRestaurantNameFailure(e));
    }
}

function* updateUserReviewsWithPictures(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'PUT',
                headers: {},
                body: action.review
            });
        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(EditReviewActions.editMyReviewWithPicturesSuccess(json));
    } catch (e) {
        yield put(EditReviewActions.editMyReviewWithPicturesFailure(e.message));
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
                body: JSON.stringify(action.body)
            });
        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(EditReviewActions.UpdateAVGSuccess(json));
    } catch (e) {
        yield put(EditReviewActions.UpdateAVGFailure(e.message));
    }
}


function* EditReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(EditReviewActionsConstats.EDIT_MY_REVIEWS, updateUserReviews);
    yield takeEvery(EditReviewActionsConstats.DELETE_REVIEW, deleteReview);
    yield takeEvery(EditReviewActionsConstats.GET_RESTAURANT_NAME, getRestaurantName);
    yield takeEvery(EditReviewActionsConstats.EDIT_MY_REVIEWS_WITH_PICTURES, updateUserReviewsWithPictures);
    yield takeEvery(EditReviewActionsConstats.UPDATE_AVG, addScore);


}

export {ProfileSaga, EditReviewSaga};
