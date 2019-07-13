// import {HomeActionsConstants} from './constants'
// import {call, put, takeEvery} from 'redux-saga/effects'
// import HomeActions from './actions'

// function* homeUser(action) {
//     try {
//         const res = yield call(fetch, action.uri,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(action.payload)
//             });

//         const json = yield call([res, 'json']); //retrieve body of response
//         yield put(HomeActions.homeSuccess());
//     } catch (e) {
//         yield put(HomeActions.homeFailure(e.message));
//     }
// }

// function* HomeSaga() {
//     //using takeEvery, you take the action away from reducer to saga
//     yield takeEvery(HomeActionsConstants.HOME, homeUser);
// }

// export default HomeSaga;
