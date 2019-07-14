import initialState from '../../initialState';
import {ProfileActionsConstants} from './constants.js';


const ProfileReducer = (state = initialState.profile, action) => {
    switch (action.type) {
        case ProfileActionsConstants.CHANGE_PROFILE_FIELD:
            return state.set(action.field, action.value);
        case ProfileActionsConstants.TOGGLE_EDIT:
            return state.set('edit', true);
        case ProfileActionsConstants.UPDATE_USER_SUCCESS:
            action.callback(true, action.msg);
            state = state.set('user', action.user);
            state = state.set('edit', false);
            return state;
        case ProfileActionsConstants.UPDATE_USER_FAILURE:
            action.callback(false, action.msg);
            return state;
        case ProfileActionsConstants.UPDATE_USER_SUCCESS:
            return state.set('reviews', action.reviews)
        default: //otherwise state is lost!
            return state;
    }
};


export default ProfileReducer
