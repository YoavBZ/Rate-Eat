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
            state = state.set('selectedUser', action.selectedUser);
            return state.set('visibleReview', action.visible);
        case UsersPageActionsConstants.GET_USERS_SUCCESS:
            return state.set('users', action.users);
        case UsersPageActionsConstants.GET_USERS_FAILURE:
            console.log(action.msg);
            return state;
        case UsersPageActionsConstants.GET_REVIEW_SUCCESS:
            // !!!!!!!!!!!!!! TODO WE NEED TO CLOSE WINDOW AND ZERO ALL PARAMETERS!!!!!!!!!!!!!!!
            return state;
        case UsersPageActionsConstants.GET_REVIEW_FAILURE:
            // !!!!!!!!!!!!!! TODO WE NEED TO NOTIFY  AND ZERO ALL PARAMETERS!!!!!!!!!!!!!!!
            return state;
        default:
            return state;
    }
};

const RatesReducer = (state = initialState.rates, action) => {
    switch (action.type) {
        case UsersPageActionsConstants.CHANGE_RATE:
            return state.set(action.category, action.rate);
        default:
            return state;
    }
};

export {UsersPageReducer, RatesReducer}
