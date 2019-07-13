import {ProfileActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import ProfileActions from './actions'

function* profileUser(action) {
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
        yield put(ProfileActions.profileSuccess(json));
    } catch (e) {
        yield put(ProfileActions.profileFailure(action.callback, e.message));
    }
}

function* ProfileSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ProfileActionsConstants.UPDATE_USER, profileUser);
}

export default ProfileSaga;
