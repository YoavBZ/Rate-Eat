import initialState from '../../initialState';
import {UsersPageActionsConstants} from "./constants";

const UsersPageReducer = (state = initialState.usersPage, action) => {
    switch (action.type) {
        case UsersPageActionsConstants.CHANGE_LAYOUT:
            return state.set('layout', action.layout);
        case UsersPageActionsConstants.CHANGE_VISIBILITY_REVIEW:
            return state.set('visibleReview', action.visible);
        case UsersPageActionsConstants.ON_SORT_CHANGE:
            state = state.set('sortOrder', action.sortOrder);
            state = state.set('sortField', action.sortField);
            return state.set('sortKey', action.sortKey);
        case UsersPageActionsConstants.SELECT_REVIEW:
            state = state.set('selectedUser', action.user);
            return state.set('visibleReview', action.visible);
        case UsersPageActionsConstants.GET_USERS_SUCCESS:
            return state.set('users', action.users);
        case UsersPageActionsConstants.GET_USERS_FAILURE:
            console.log(action.msg);
            return state;
        default:
            return state;
    }
};

<<<<<<< HEAD
const UsersRatesReducer = (state = initialState.rates, action) => {
    switch (action.type) {
        case UsersPageActionsConstants.GET_REVIEW_SUCCESS:
            return state.set('rates', action.review);
        case UsersPageActionsConstants.GET_REVIEW_FAILURE:
            console.log(action.msg);
            return state;
        case UsersPageActionsConstants.CHANGE_LAYOUT2:
            return state.set('layout', action.layout);
        case UsersPageActionsConstants.CHANGE_RATE:
            return state.set('rate', action.value);
        default:
            return state;
    }
};

export {UsersPageReducer, UsersRatesReducer}
=======
export default UsersPageReducer
>>>>>>> 276e890bdef368d0d94ef616feaf0ac7083d5d68
