import React from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {connect} from 'react-redux';
import RegisterActions from './actions';
import DragAndDrop from '../DragAndDrop/DragAndDrop'

class Register extends React.Component {
    render() {
        const input = {
            display: "block",
            marginBottom: "63px",
            position: "relative",
            left: "5%"
        }

        const lastInput = {
            display: "block",
            position: "relative",
            left: "5%"
        }

        const submit = {
            float: "bottom",
            textAlign:"center",
            width: "51%",
            maxWidth: "453px"
        }



        return (
            <div style={this.props.style}>
                <DragAndDrop files={this.props.picture}/>
                
                <InputText placeholder="Username"
                           onChange={(e) => this.props.changeRegisterFieldHandler("username", e.target.value)}
                           type="text"
                           style = {input}
                           />
                <InputText placeholder="Password"
                           onChange={(e) => this.props.changeRegisterFieldHandler("password", e.target.value)}
                           type="password"
                           style = {input}
                           />
                <InputText placeholder="Location"
                           onChange={(e) => this.props.changeRegisterFieldHandler("location", e.target.value)}
                           type="text"
                           style = {lastInput}
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
            // let user = {
            //     username,
            //     password,
            //     location,
            //     picture
            // };
            dispatch(RegisterActions.register(formData));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);