import initialState from '../../initialState';
import {RegisterActionsConstants} from './constants.js';

const RegisterReducer = (state = initialState.register, action) => {
    switch (action.type) {
        case RegisterActionsConstants.CHANGE_REGISTER_FIELD:
            return state.set(action.field, action.value);
        default: //otherwise state is lost!
            return state;
    }
};

export default RegisterReducer
