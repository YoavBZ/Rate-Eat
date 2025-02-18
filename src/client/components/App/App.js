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

    /*
        This Component is the main app of the client side.
        Component main attributes:
        MenuBar - just for display allows a user to select Login Register or (once Logged in to Logout)
        Button - Login - opens the Login component (upon a successful login will send the user to the Home component)
        Button - Register - opens the Register component (upon a successful register will send the user to the Home component)
        Button - Logout - logs the user out of the system (upon a successful logout will send the user to the Login component)
    */

    render() {
        const menubarStyle = {
            backgroundColor: "#343a40",
            borderRadius: 0,
            border: 0,
            color: "#fbfbfb"
        };
        const formsStyle = {
            margin: 'auto',
            width: 'fit-content',
            paddingTop: '15%',
            paddingLeft: '36%',
        };
        return (
            <div>
                <Menubar style={menubarStyle} variant="dark">
                    Rate-Eat
                    {this.props.page !== AppPages.HOME &&
                    <Button label="Login" onClick={this.props.showLoginHandler} style={{marginLeft: 4}}/>}
                    {this.props.page !== AppPages.HOME &&
                    <Button label="Register" onClick={this.props.showRegisterHandler} style={{marginLeft: 8}}/>}
                    {this.props.page === AppPages.HOME &&
                    <Button label="Logout" onClick={this.props.showLoginHandler} style={{marginLeft: 4}}/>}
                </Menubar>
                {this.props.page === AppPages.LOGIN && <Login style={formsStyle}/>}
                {this.props.page === AppPages.REGISTER && <Register style={formsStyle}/>}
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

