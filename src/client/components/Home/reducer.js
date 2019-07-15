import initialState from '../../initialState';
import {HomeActionsConstants} from './constants';
import {LoginActionsConstants} from '../Login/constants';
import {RegisterActionsConstants} from '../Register/constants';

const HomeReducer = (state = initialState.home, action) => {
    switch (action.type) {
        case HomeActionsConstants.CHANGE_PAGE:
            return state.set('page', action.page);
        case LoginActionsConstants.LOGIN_SUCCESS:
        case RegisterActionsConstants.REGISTER_SUCCESS:
            return state.set('user', action.user);
        default: //otherwise state is lost!
            return state;
    }
};


export default HomeReducer
