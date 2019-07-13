import initialState from '../../initialState';
import {HomeActionsConstants, HomePages} from './constants';


const HomeReducer = (state = initialState.home, action) => {
    switch (action.type) {
        case HomeActionsConstants.CHANGE_PAGE:
            return state.set('page', action.page);
        default: //otherwise state is lost!
            return state;
    }
};


export default HomeReducer
