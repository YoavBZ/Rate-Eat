import {RegisterActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import RegisterActions from './actions'

function* registerUser(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {},
                body: action.user
            });
        const json = yield call([res, 'json']); //retrieve body of response
        if (res.status >= 400) {
            throw json;
        }
        yield put(RegisterActions.registerSuccess(json));
    } catch (e) {
        yield put(RegisterActions.registerFailure(e.message));
    }
}

function* RegisterSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RegisterActionsConstants.REGISTER, registerUser);
}

export default RegisterSaga;
