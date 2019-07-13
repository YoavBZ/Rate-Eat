import initialState from '../../initialState';
import {RegisterActionsConstants} from './constants.js';


const RegisterReducer = (state = initialState.register, action) => {
    console.log('RegisterReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case RegisterActionsConstants.CHANGE_FIELD:
            return state.set(action.field, action.value);
        default: //otherwise state is lost!
            return state;
    }
};


export default RegisterReducer
