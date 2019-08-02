import React from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {connect} from 'react-redux';
import RegisterActions from './actions';
import DragAndDrop from '../DragAndDrop/DragAndDrop'

class Register extends React.Component {

    /*
        This Component will allow a user to register to the system.
        Component main attributes:
        DragAndDrop - Allow a user to select a  profile picture
        InputText - Username - select the username
        InputText - Password - select the user's password
        InputText - Location - select the user's location
        Submit - submits the new data for the user
    */

    render() {
        const input = {
            display: "block",
            marginBottom: "63px",
            position: "relative",
            left: "5%"
        };

        const lastInput = {
            display: "block",
            position: "relative",
            left: "5%"
        };

        const submit = {
            float: "bottom",
            textAlign: "center",
            width: "51%",
            maxWidth: "453px"
        };

        return (
            <div style={this.props.style}>
                <DragAndDrop files={this.props.picture}/>

                <InputText placeholder="Username"
                           onChange={(e) => this.props.changeRegisterFieldHandler("username", e.target.value)}
                           type="text"
                           style={input}
                           name="username"
                />
                <InputText placeholder="Password"
                           onChange={(e) => this.props.changeRegisterFieldHandler("password", e.target.value)}
                           type="password"
                           style={input}
                           name="password"
                />
                <InputText placeholder="Location"
                           onChange={(e) => this.props.changeRegisterFieldHandler("location", e.target.value)}
                           type="text"
                           style={lastInput}
                           name="location"
                />
                <Button variant="primary" style={submit}
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
        changeRegisterFieldHandler: (field, value) => {
            dispatch(RegisterActions.changeRegisterField(field, value))
        },
        registerHandler: (username, password, location, picture) => {
            let formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('location', location);
            formData.append('picture', picture);
            dispatch(RegisterActions.register(formData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);