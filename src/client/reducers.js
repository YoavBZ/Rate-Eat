import {combineReducers} from 'redux';
import AppReducer from './components/App/reducer';
import RegisterReducer from './components/Register/reducer';
import LoginReducer from './components/Login/reducer';
import HomeReducer from './components/Home/reducer';


export default combineReducers({
    app: AppReducer,
    register: RegisterReducer,
    login: LoginReducer,
    home: HomeReducer
});
