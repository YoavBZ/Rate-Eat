import { AppActionsConstants} from './constants.js';
import initialState from '../../initialState';


function showLogin(state = initialState, action){
    return{
        type: AppActionsConstants.SHOW_LOGIN
    }
}


function showRegister(){
    return{
        type: AppActionsConstants.SHOW_REGISTER
    }
}

let AppActions  = {
    showLogin,
    showRegister
};

export default AppActions