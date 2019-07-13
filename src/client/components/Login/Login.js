import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import LoginActions from './actions';
import {connect} from 'react-redux';
import {Growl} from 'primereact/growl'

export class Login extends Component {

    render() {
        return (
            <div style={this.props.style}>
                <Growl ref={(el) => this.growl = el}/>
                <InputText placeholder="Username"
                           onChange={(e) => this.props.changeFieldHandler("username", e.target.value)} type="text"/>
                <InputText placeholder="Password"
                           onChange={(e) => this.props.changeFieldHandler("password", e.target.value)}
                           type="password"/>
                <Button variant="primary" type="submit" label="Submit" onClick={
                    () => this.props.loginHandler(this.props.username, this.props.password,
                        (msg) => {
                            this.growl.show({severity: 'error', summary: 'Login Failed', life: 5000, detail: msg});
                        })
                }/>
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
        changeFieldHandler: (field, value) => {
            dispatch(LoginActions.changeField(field, value))
        },
        loginHandler: (username, password, callback) => {
            let user = {
                username,
                password
            }
            dispatch(LoginActions.login(user, callback));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);