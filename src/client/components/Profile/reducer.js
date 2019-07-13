import initialState from '../../initialState';
import {ProfileActionsConstants} from './constants.js';


const ProfileReducer = (state = initialState.profile, action) => {
    console.log('ProfileReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case ProfileActionsConstants.CHANGE_FIELD:
            return state.set(action.field, action.value);
        case ProfileActionsConstants.LOGIN_FAILURE:
            action.callback(action.msg);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};


export default ProfileReducer
