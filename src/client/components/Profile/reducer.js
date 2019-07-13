import initialState from '../../initialState';
import {ProfileActionsConstants} from './constants.js';


const ProfileReducer = (state = initialState.profile, action) => {
    switch (action.type) {
        case ProfileActionsConstants.CHANGE_FIELD:
            return state.set(action.field, action.value);
        case ProfileActionsConstants.TOGGLE_EDIT:
            return state.set('edit', true);
        case ProfileActionsConstants.UPDATE_USER_SUCCESS:
            action.callback(action.msg);
            return state.set('user', action.user);
        case ProfileActionsConstants.UPDATE_USER_FAILURE:
            action.callback(action.msg);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};


export default ProfileReducer
