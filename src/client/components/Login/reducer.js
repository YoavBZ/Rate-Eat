import initialState from '../../initialState';
import {LoginActionsConstants} from './constants.js';
import { List } from 'immutable';


const LoginReducer = (state = initialState.login, action) => {
    console.log('LoginReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case LoginActionsConstants.CHANGE_FIELD: 
            return state.set(action.field, action.value);
        case LoginActionsConstants.LOGIN_FAILURE:
            action.callback(action.msg);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};


export default LoginReducer
