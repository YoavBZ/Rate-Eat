import initialState from '../../initialState';
import {AppActionsConstants, AppPages} from './constants.js';
import {LoginActionsConstants} from '../Login/constants'
import {RegisterActionsConstants} from '../Register/constants'

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case AppActionsConstants.SHOW_LOGIN:
            return state.set('page', AppPages.LOGIN);
        case AppActionsConstants.SHOW_REGISTER:
            return state.set('page', AppPages.REGISTER);
        case RegisterActionsConstants.REGISTER_SUCCESS:
        case LoginActionsConstants.LOGIN_SUCCESS:
            return state.set('page', AppPages.HOME);
        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
