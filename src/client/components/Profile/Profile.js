import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import ProfileActions from './actions';
import {connect} from 'react-redux';
import {Growl} from 'primereact/growl'

export class Profile extends Component {

    render() {
        return (
            <div>
                <div>
                    <Button variant="Warning" onClick={()=> this.props.toggleEditHandler()} />
                    <Growl ref={(el) => this.growl = el}/>
                    <InputText placeholder="Username" value={this.props.user.username} type="text" 
                               onChange={(e) => this.props.changeFieldHandler("username", e.target.value)} />

                    <InputText placeholder="Password" value={this.props.user.password} type="password" 
                               onChange={(e) => this.props.changeFieldHandler("password", e.target.value)} />
                    
                    <InputText placeholder="Location" value={this.props.user.location} type="text" 
                               onChange={(e) => this.props.changeFieldHandler("locatoin", e.target.value)} />
                    
                    <InputText placeholder="Picture" value={this.props.user.picture} type="text" 
                               onChange={(e) => this.props.changeFieldHandler("picture", e.target.value)} />
                    
                    {this.props.edit == true && <Button variant="primary" type="submit" label="Submit"
                            onClick={() => this.props.updateUserHandler(this.props.username, this.props.password, this.props.loaction, this.props.picture,
                                (msg) => {
                                    this.growl.show({
                                        severity: 'error',
                                        summary: 'Profile Failed',
                                        life: 5000,
                                        detail: msg
                                    });
                                })}/>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.home.get('user'),
    username: state.profile.get('username'),
    password: state.profile.get('password'),
    location: state.profile.get('location'),
    picture: state.profile.get('picture'),
    edit: state.profile.get('edit')
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeFieldHandler: (field, value) => {
            dispatch(ProfileActions.changeField(field, value))
        },
        toggleEditHandler: (field, value) => {
            dispatch(ProfileActions.toggleEdit(field, value))
        },
        updateUserHandler: (username, password, loaction, picture, callback) => {
            let user = {
                username,
                password,
                location,
                picture
            }
            dispatch(ProfileActions.updateUser(user, callback));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);