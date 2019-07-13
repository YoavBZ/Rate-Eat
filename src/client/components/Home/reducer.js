import initialState from '../../initialState';
import {LoginActionsConstants} from '../Login/constants'
import {RegisterActionsConstants} from '../Register/constants'


const HomeReducer = (state = initialState.home, action) => {
    console.log('LoginReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case LoginActionsConstants.LOGIN_SUCCESS:
        case RegisterActionsConstants.REGISTER_SUCCESS:
            return state.set('user', action.user);
        default: //otherwise state is lost!
            return state;
    }
};


export default HomeReducer
