import initialState from '../../initialState';
import {EditPictureActionsConstats, EditReviewActionsConstats, ProfileActionsConstants} from './constants.js';

const ProfileReducer = (state = initialState.profile, action) => {
    switch (action.type) {
        case ProfileActionsConstants.CHANGE_PROFILE_FIELD:
            return state.set(action.field, action.value);
        case ProfileActionsConstants.TOGGLE_EDIT:
            return state.set('edit', true);
        case ProfileActionsConstants.UPDATE_USER_SUCCESS:
            action.callback(true, action.msg);
            // state = state.set('user', action.user);
            state = state.set('edit', false);
            return state;
        case ProfileActionsConstants.UPDATE_USER_FAILURE:
            action.callback(false, action.msg);
            return state;
        case ProfileActionsConstants.GET_USER_REVIEWS_SUCCESS:
            return state.set('reviews', action.reviews);
        case ProfileActionsConstants.GET_USER_REVIEWS_FAILURE:
            return state;
        case ProfileActionsConstants.CHANGE_REVIEWS_LAYOUT:
            return state.set('layout', action.layout);
        case EditPictureActionsConstats.EDIT_PICTURE_ON_DROP:
            return state.set('picture', action.files);
        case EditReviewActionsConstats.EDIT_MY_REVIEWS_SUCCESS:
        case EditReviewActionsConstats.EDIT_MY_REVIEWS_WITH_PICTURES_SUCCESS:
            let reviews = state.get('reviews')
            return state.set('reviews', reviews.map(review => review._id == action.review._id ? action.review : review))
        case EditReviewActionsConstats.DELETE_REVIEW_SUCCESS:
            let updatedReviews = state.get('reviews')
            return state.set('reviews', updatedReviews.filter(review => review._id != action.id))
        case EditReviewActionsConstats.EDIT_MY_REVIEWS_SUCCESS:
        case EditReviewActionsConstats.EDIT_MY_REVIEWS_WITH_PICTURES_SUCCESS:
            console.log(action.msg)
            return state;
        default: //otherwise state is lost!

            return state;
    }
};

const EditReviewReducer = (state = initialState.editReview, action) => {
    switch (action.type) {
        case EditReviewActionsConstats.GET_RESTAURANT_NAME_SUCCESS:
            action.callback(action.name)
            return state;
        case EditReviewActionsConstats.GET_RESTAURANT_NAME_FAILIRE:
            console.log(action.msg)
            return state;
        default: //otherwise state is lost!
            return state;
    }
};

const EditPictureReducer = (state = initialState.editPicture, action) => {
    switch (action.type) {
        case EditPictureActionsConstats.EDIT_PICTURE_ON_DROP:
            return state.set('preview', action.preview);
        case ProfileActionsConstants.UPDATE_USER_SUCCESS:
            return state.set('preview', undefined)
        default: //otherwise state is lost!
            return state;
    }
};

export {ProfileReducer, EditReviewReducer, EditPictureReducer}
