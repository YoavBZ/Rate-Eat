import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import ProfileActions from './actions';
import {connect} from 'react-redux';
import {Growl} from 'primereact/growl'

export class Profile extends Component {

    componentDidMount() {
        this.props.getUserReviews(this.props.user._id);
    }

    render() {
        let onSubmit = (res, msg) => {
            if (res) {
                this.growl.show({
                    severity: 'success',
                    summary: 'Update Successed',
                    life: 5000,
                    detail: msg
                });
            } else {
                this.growl.show({
                    severity: 'error',
                    summary: 'Update Failed',
                    life: 5000,
                    detail: msg
                });
            }
        };
        return (
            <div>
                {console.log(this.props.reviews)}
                <Button className="p-button-warning" label="Edit" onClick={() => this.props.toggleEditHandler()}/>
                <Growl ref={(el) => this.growl = el}/>
                <InputText placeholder="Username" type="text" defaultValue={this.props.user.username}
                           disabled={!this.props.edit}
                           onChange={(e) => this.props.changeProfileFieldHandler("username", e.target.value)}/>

                <InputText placeholder="Password" type="password" defaultValue={this.props.user.password}
                           disabled={!this.props.edit}
                           onChange={(e) => this.props.changeProfileFieldHandler("password", e.target.value)}/>

                <InputText placeholder="Location" type="text" defaultValue={this.props.user.location}
                           disabled={!this.props.edit}
                           onChange={(e) => this.props.changeProfileFieldHandler("location", e.target.value)}/>

                <InputText placeholder="Picture" type="text" defaultValue={this.props.user.picture}
                           disabled={!this.props.edit}
                           onChange={(e) => this.props.changeProfileFieldHandler("picture", e.target.value)}/>

                {this.props.edit && <Button variant="primary" type="submit" label="Submit"
                                            onClick={() => this.props.updateUserHandler(this.props.user, this.props.username,
                                                this.props.password, this.props.location, this.props.picture,
                                                onSubmit)}/>}
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
    edit: state.profile.get('edit'),
    reviews: state.profile.get('reviews')
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeProfileFieldHandler: (field, value) => {
            dispatch(ProfileActions.changeProfileField(field, value))
        },

        toggleEditHandler: (field, value) => {
            dispatch(ProfileActions.toggleEdit(field, value))
        },
        getUserReviews: (userID) => {
            console.log(1)
            dispatch(ProfileActions.getUserReviews(userID))
        },
        updateUserHandler: (user, username, password, location, picture, callback) => {
            if(username == undefined) username = user.username;
            if(password == undefined) password = user.password;
            if(location == undefined) location = user.location;
            if(picture == undefined) picture = user.picture;
            let newUser = {
                username,
                password,
                location,
                picture
            };
            dispatch(ProfileActions.updateUser(newUser, callback));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);