import initialState from '../../initialState';
import {RegisterActionsConstants} from './constants.js';
import DragAndDropConstants from '../DragAndDrop/constants';


const RegisterReducer = (state = initialState.register, action) => {
    switch (action.type) {
        case RegisterActionsConstants.CHANGE_REGISTER_FIELD:
            return state.set(action.field, action.value);
        case DragAndDropConstants.ON_DROP:
            return state.set('picture', action.files);
        default: //otherwise state is lost!
            return state;
    }
};

export default RegisterReducer
