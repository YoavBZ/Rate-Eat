import initialState from '../../initialState';
import {EditReviewActionsConstats, ProfileActionsConstants} from './constants.js';

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
        case ProfileActionsConstants.GET_USER_REVIEWS_SUCCESS:
            return state.set('reviews', action.reviews);
        case ProfileActionsConstants.GET_USER_REVIEWS_FAILURE:
            console.log(action.msg);
            return state;
        case ProfileActionsConstants.CHANGE_REVIEWS_LAYOUT:
            return state.set('layout', action.layout);

        default: //otherwise state is lost!
            return state;
    }
};

const EditReviewReducer = (state = initialState.editReview, action) => {
    switch (action.type) {
        case EditReviewActionsConstats.EDIT_MY_REVIEWS:
            console.log(3)
            return state.set('editReview', true)

            console.log(3);
            return state.set('editReview', true);
        default: //otherwise state is lost!
            return state;
    }
};

export {ProfileReducer, EditReviewReducer}
