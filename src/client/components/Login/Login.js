import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import LoginActions from './actions';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import {Growl} from 'primereact/growl'

class Login extends Component {

    /*
    This Component will allow a user to login to the system.
    Component main attributes:
    InputText - Username - insert the username
    InputText - Password - insert the user's password
    FacebookLogin - login via facebook
    Submit - submits the new data for the user
    */

    render() {
        return (
            <div style={this.props.style}>
                <Growl ref={(el) => this.growl = el}/>
                <InputText placeholder="Username"
                           onChange={(e) => this.props.changeLoginFieldHandler("username", e.target.value)}
                           type="text"/>
                <InputText placeholder="Password"
                           onChange={(e) => this.props.changeLoginFieldHandler("password", e.target.value)}
                           type="password"/>
                <Button variant="primary" type="submit" label="Submit" onClick={
                    () => this.props.loginHandler(this.props.username, this.props.password,
                        (msg) => {
                            this.growl.show({severity: 'error', summary: 'Login Failed', life: 5000, detail: msg});
                        })
                }/>
                <br/>
                <div style={{transform: 'scale(0.75)', position: 'absolute', left: '40%'}}>
                    <FacebookLogin appId="618552358637643" fields="email"
                                   callback={(response) => {
                                       return this.props.fbLoginHandler(response.email,
                                           (msg) => {
                                               this.growl.show({
                                                   severity: 'error',
                                                   summary: 'Login Failed',
                                                   life: 5000,
                                                   detail: msg
                                               });
                                           });
                                   }
                                   } icon="fa-facebook"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.login.get('username'),
    password: state.login.get('password'),
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginFieldHandler: (field, value) => {
            dispatch(LoginActions.changeLoginField(field, value))
        },
        loginHandler: (username, password, callback) => {
            let user = {
                username,
                password
            };
            dispatch(LoginActions.login(user, callback));
        },
        fbLoginHandler: (username, callback) => {
            dispatch(LoginActions.fbLogin({username}, callback));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);