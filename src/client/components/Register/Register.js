import React from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {connect} from 'react-redux';
import RegisterActions from './actions';

class Register extends React.Component {
    render() {
        return (
            <div>
                <InputText placeholder="Username"
                           onChange={(e) => this.props.changeFieldHandler("username", e.target.value)} type="text"/>
                <InputText placeholder="Password"
                           onChange={(e) => this.props.changeFieldHandler("password", e.target.value)} type="password"/>
                <InputText placeholder="Location"
                           onChange={(e) => this.props.changeFieldHandler("locatoin", e.target.value)} type="text"/>
                <InputText placeholder="Picture"
                           onChange={(e) => this.props.changeFieldHandler("picture", e.target.value)} type="text"/>
                {/* <FileUpload /> */}
                <Button variant="primary"
                        onClick={() => this.props.registerHandler(this.props.username, this.props.password, this.props.location, this.props.picture)}
                        type="submit" label="Submit"/>
            </div>
        );
    }

}


const mapStateToProps = (state) => ({
    username: state.register.get('username'),
    password: state.register.get('password'),
    location: state.register.get('location'),
    picture: state.register.get('picture')
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeFieldHandler: (field, value) => {
            dispatch(RegisterActions.changeField(field, value))
        },
        registerHandler: (username, password, location, picture) => {
            let user = {
                username,
                password,
                location,
                picture
            }
            dispatch(RegisterActions.register(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);