import {ProfileActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import ProfileActions from './actions'

function* updateUserProfile(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
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

function* ProfileSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ProfileActionsConstants.UPDATE_USER, updateUserProfile);
}

export default ProfileSaga;
