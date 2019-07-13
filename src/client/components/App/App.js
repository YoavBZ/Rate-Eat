import React from 'react';
import Register from '../Register/Register';
import Login from '../Login/Login';
import {connect} from 'react-redux';
import {Menubar} from 'primereact/menubar';
import {Button} from 'primereact/button';
import AppActions from './actions';
import {AppPages} from './constants';
import Home from '../Home/Home';

class App extends React.Component {
    render() {
        const style = {
            backgroundColor: "#343a40",
            borderRadius: 0,
            border: 0,
            color: "#fbfbfb"
        };
        return (
            <div>
                <Menubar style={style} variant="dark">
                    Rate-Eat
                    {this.props.page !== AppPages.HOME &&
                    <Button label="Login" onClick={this.props.showLoginHandler} style={{marginLeft: 4}}/>}
                    {this.props.page !== AppPages.HOME &&
                    <Button label="Register" onClick={this.props.showRegisterHandler} style={{marginLeft: 8}}/>}
                    {this.props.page === AppPages.HOME &&
                    <Button label="Logout" onClick={this.props.showLoginHandler} style={{marginLeft: 4}}/>}
                </Menubar>
                {this.props.page === AppPages.LOGIN && <Login/>}
                {this.props.page === AppPages.REGISTER && <Register/>}
                {this.props.page === AppPages.HOME && <Home/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    page: state.app.get('page'),
});

const mapDispatchToProps = (dispatch) => {
    return {
        showLoginHandler: () => {
            dispatch(AppActions.showLogin());
        },
        showRegisterHandler: () => {
            dispatch(AppActions.showRegister());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

