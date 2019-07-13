import initialState from '../../initialState';
import {UsersPageActionsConstants} from "./constants";

const UsersPageReducer = (state = initialState.usersPage, action) => {
    switch (action.type) {
        case UsersPageActionsConstants.CHANGE_LAYOUT:
            return state.set('layout', action.layout);
        case UsersPageActionsConstants.ON_SORT_CHANGE:
            let set = state.set('sortOrder', action.sortOrder);
            set = state.set('sortField', action.sortField);
            return state.set('sortKey', action.sortKey);
        case UsersPageActionsConstants.GET_RESTAURANTS_SUCCESS:
            return state.set('restaurants', action.restaurants);
        case UsersPageActionsConstants.GET_RESTAURANTS_FAILURE:
            console.log(action.msg);
            return state;
        default: //otherwise state is lost!
            return state;
    }
};

export default UsersPageReducer
