import {LoginActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import LoginActions from './actions'

function* loginUser(action) {
    console.log('LoginSaga=', action);
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
        yield put(LoginActions.loginSuccess(user));
    } catch (e) {
        yield put(LoginActions.loginFailure(action.callback, e.message));
    }
}

function* LoginSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(LoginActionsConstants.LOGIN, loginUser);
}

export default LoginSaga;
