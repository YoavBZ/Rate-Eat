import {ProfileActionsConstants, EditReviewActionsConstats} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import {ProfileActions, EditReviewActions} from './actions'

function* updateUserProfile(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'PUT',
                headers: {
                },
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
    console.log(action.review)
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
        console.log("combing back from saga")
        yield put(EditReviewActions.editMyReviewSuccess(json));
    } catch (e) {
        yield put(EditReviewActions.editMyReviewFailure(e));
    }
}


function* EditReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(EditReviewActionsConstats.EDIT_MY_REVIEWS, updateUserReviews);
}

export {ProfileSaga, EditReviewSaga};
